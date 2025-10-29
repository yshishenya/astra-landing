'use client';

import { type FC, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, Clock, DollarSign, Calendar } from 'lucide-react';
import { FORM_CONTENT, ROI_CALCULATION_CONFIG } from '@/lib/constants';
import { trackROICalculation, trackError } from '@/lib/analytics';
import { ROIChartSkeleton } from '@/components/ui/shimmer-skeleton';

// Lazy load charts to reduce initial bundle size (-684KB)
const ROICharts = dynamic(() => import('./roi-charts').then(mod => mod.ROICharts), {
  ssr: false, // Charts don't need SSR, saves server resources
  loading: () => <ROIChartSkeleton />,
});

// Validation schema (matching API validation)
// Comprehensive edge case handling to prevent calculation errors
const roiSchema = z.object({
  companySize: z.coerce
    .number()
    .finite('Некорректное число') // Prevents Infinity from scientific notation (e.g., 1e308)
    .safe('Число слишком большое') // Prevents unsafe integers beyond Number.MAX_SAFE_INTEGER
    .min(10, 'Минимальное количество: 10')
    .max(100000, 'Максимальное количество: 100000'),
  currentTurnover: z.coerce
    .number()
    .finite('Некорректное число') // Prevents Infinity and NaN edge cases
    .safe('Число слишком большое') // Prevents calculation overflow
    .transform((val) => Math.round(val * 100) / 100) // Limit to 2 decimals (prevents floating point errors)
    .refine((val) => val >= 0, 'Текучка не может быть отрицательной')
    .refine((val) => val <= 100, 'Текучка не может быть больше 100%'),
  averageSalary: z.coerce
    .number()
    .finite('Некорректное число') // Prevents Infinity values
    .safe('Число слишком большое') // Prevents integer overflow in cost calculations
    .min(30000, 'Минимальная зарплата: 30,000 руб')
    .optional(),
  currentHireTime: z.coerce
    .number()
    .finite('Некорректное число') // Prevents Infinity edge case
    .safe('Число слишком большое') // Prevents overflow
    .min(1, 'Минимальное время: 1 день')
    .max(365, 'Максимальное время: 365 дней')
    .optional(),
});

type ROIFormValues = z.infer<typeof roiSchema>;

interface ROIResult {
  inputs: {
    companySize: number;
    currentTurnover: number;
    averageSalary: number;
  };
  currentSituation: {
    annualTurnovers: number;
    currentAnnualTurnoverCost: number;
    replacementCostPerEmployee: number;
  };
  withAstra: {
    turnoverReduction: number;
    annualTurnoverSavings: number;
    employeesAnalyzedPerYear: number;
    totalTimeSavedHours: number;
    annualTimeSavings: number;
    totalAnnualSavings: number;
  };
  roi: {
    recommendedPlan: 'basic' | 'pro';
    astraCost: number;
    netSavings: number;
    roiPercentage: number;
    roiMultiplier: number;
    paybackDays: number;
    paybackWeeks: number;
  };
  threeYear: {
    totalSavings: number;
    totalCost: number;
    netSavings: number;
  };
}

/**
 * ROI Calculator Section Component.
 *
 * This component provides an interactive interface for calculating the return on investment (ROI) based on user inputs. It performs client-side calculations to derive key metrics such as annual savings, payback period, and a three-year projection. The component also tracks successful calculations and errors, updating the UI in real-time as inputs change.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered ROI Calculator Section.
 */
export const ROICalculatorSection: FC = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [roiResult, setRoiResult] = useState<ROIResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ROIFormValues>({
    resolver: zodResolver(roiSchema),
    defaultValues: {
      companySize: 100,
      currentTurnover: 15,
      averageSalary: 100000,
      currentHireTime: 30,
    },
  });

  const watchedValues = watch();

  // Client-side ROI calculation (no API calls needed)
  const calculateROIClientSide = useCallback((data: ROIFormValues): ROIResult => {
    const avgSalary = data.averageSalary || 100000;
    // All calculation constants sourced from lib/constants.ts
    const {
      REPLACEMENT_COST_MULTIPLIER,
      TURNOVER_REDUCTION,
      TRADITIONAL_ANALYSIS_TIME,
      ASTRA_ANALYSIS_TIME,
      HOURLY_HR_COST,
      BASIC_PLAN_ANNUAL,
      PRO_PLAN_ANNUAL,
      WORKING_DAYS_PER_YEAR,
    } = ROI_CALCULATION_CONFIG;

    // 1. Calculate current turnover costs
    const annualTurnovers = Math.round((data.companySize * data.currentTurnover) / 100);
    const replacementCostPerEmployee = avgSalary * REPLACEMENT_COST_MULTIPLIER;
    const currentAnnualTurnoverCost = annualTurnovers * replacementCostPerEmployee;

    // 2. Calculate cost savings from reduced turnover
    const turnoverReduction = annualTurnovers * TURNOVER_REDUCTION;
    const annualTurnoverSavings = turnoverReduction * replacementCostPerEmployee;

    // 3. Calculate time savings for HR team
    const employeesAnalyzedPerYear = Math.min(data.companySize * 0.3, 500);
    const timeSavedPerEmployee = TRADITIONAL_ANALYSIS_TIME - ASTRA_ANALYSIS_TIME;
    const totalTimeSavedHours = employeesAnalyzedPerYear * timeSavedPerEmployee;
    const annualTimeSavings = totalTimeSavedHours * HOURLY_HR_COST;

    // 4. Total annual savings
    const totalAnnualSavings = annualTurnoverSavings + annualTimeSavings;

    // 5. Determine recommended plan
    const recommendedPlan: 'basic' | 'pro' = data.companySize < 200 ? 'basic' : 'pro';
    const astraCost = recommendedPlan === 'basic' ? BASIC_PLAN_ANNUAL : PRO_PLAN_ANNUAL;

    // 6. Calculate ROI
    const netSavings = totalAnnualSavings - astraCost;
    const roiMultiplier = totalAnnualSavings / astraCost;

    // 7. Calculate payback period (in days)
    const dailySavings = totalAnnualSavings / WORKING_DAYS_PER_YEAR;
    const paybackDays = Math.ceil(astraCost / dailySavings);

    // 8. Three-year projection
    const threeYearSavings = totalAnnualSavings * 3;
    const threeYearCost = astraCost * 3;
    const threeYearNetSavings = threeYearSavings - threeYearCost;

    return {
      inputs: {
        companySize: data.companySize,
        currentTurnover: data.currentTurnover,
        averageSalary: avgSalary,
      },
      currentSituation: {
        annualTurnovers,
        currentAnnualTurnoverCost,
        replacementCostPerEmployee,
      },
      withAstra: {
        turnoverReduction: Math.round(turnoverReduction),
        annualTurnoverSavings: Math.round(annualTurnoverSavings),
        employeesAnalyzedPerYear: Math.round(employeesAnalyzedPerYear),
        totalTimeSavedHours: Math.round(totalTimeSavedHours),
        annualTimeSavings: Math.round(annualTimeSavings),
        totalAnnualSavings: Math.round(totalAnnualSavings),
      },
      roi: {
        recommendedPlan,
        astraCost,
        netSavings: Math.round(netSavings),
        roiPercentage: Math.round((netSavings / astraCost) * 100),
        roiMultiplier: Math.round(roiMultiplier * 10) / 10,
        paybackDays,
        paybackWeeks: Math.ceil(paybackDays / 7),
      },
      threeYear: {
        totalSavings: Math.round(threeYearSavings),
        totalCost: threeYearCost,
        netSavings: Math.round(threeYearNetSavings),
      },
    };
  }, []);

  const handleCalculate = useCallback((data: ROIFormValues) => {
    setIsCalculating(true);
    setError(null);

    try {
      const result = calculateROIClientSide(data);
      setRoiResult(result);

      // Track successful ROI calculation
      trackROICalculation({
        company_size: data.companySize,
        current_turnover: data.currentTurnover,
        average_salary: data.averageSalary || 100000,
        roi_multiplier: result.roi.roiMultiplier,
        payback_days: result.roi.paybackDays,
        annual_savings: result.withAstra.totalAnnualSavings,
        recommended_plan: result.roi.recommendedPlan,
        turnover_reduction: result.withAstra.turnoverReduction,
      });
    } catch (error) {
      setError('Произошла ошибка при расчете. Попробуйте позже.');

      // Track exception
      trackError('ROI calculation exception', {
        company_size: data.companySize,
        error_type: 'calculation_error',
        error_message: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsCalculating(false);
    }
  }, [calculateROIClientSide]);

  // Auto-calculate on input change (with debounce)
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Only auto-calculate if all required fields are valid
      if (
        watchedValues.companySize &&
        watchedValues.currentTurnover !== undefined &&
        watchedValues.companySize >= 10 &&
        watchedValues.currentTurnover >= 0
      ) {
        handleCalculate(watchedValues);
      }
    }, 1000); // 1 second debounce for smoother UX

    return () => clearTimeout(timeout);
  }, [watchedValues.companySize, watchedValues.currentTurnover, watchedValues.averageSalary, watchedValues, handleCalculate]);

  const onSubmit = (data: ROIFormValues) => {
    handleCalculate(data);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="section-spacing bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            {FORM_CONTENT.roiCalculator.title}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            {FORM_CONTENT.roiCalculator.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
          {/* Calculator Form */}
          <Card className="h-fit p-6 md:p-8 lg:sticky lg:top-8">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              {FORM_CONTENT.roiCalculator.sectionTitle}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Company Size */}
              <div className="space-y-2">
                <Label htmlFor="companySize">
                  {FORM_CONTENT.roiCalculator.fields.companySize.label}{' '}
                  {FORM_CONTENT.roiCalculator.fields.companySize.required && (
                    <span className="text-destructive">*</span>
                  )}
                </Label>
                <Input
                  id="companySize"
                  type="number"
                  {...register('companySize')}
                  placeholder={FORM_CONTENT.roiCalculator.fields.companySize.placeholder}
                  disabled={isCalculating}
                  aria-invalid={errors.companySize ? 'true' : 'false'}
                />
                {errors.companySize && (
                  <p className="text-sm text-destructive">{errors.companySize.message}</p>
                )}
              </div>

              {/* Current Turnover */}
              <div className="space-y-2">
                <Label htmlFor="currentTurnover">
                  {FORM_CONTENT.roiCalculator.fields.currentTurnover.label}{' '}
                  {FORM_CONTENT.roiCalculator.fields.currentTurnover.required && (
                    <span className="text-destructive">*</span>
                  )}
                </Label>
                <Input
                  id="currentTurnover"
                  type="number"
                  step="0.1"
                  {...register('currentTurnover')}
                  placeholder={FORM_CONTENT.roiCalculator.fields.currentTurnover.placeholder}
                  disabled={isCalculating}
                  aria-invalid={errors.currentTurnover ? 'true' : 'false'}
                />
                {errors.currentTurnover && (
                  <p className="text-sm text-destructive">{errors.currentTurnover.message}</p>
                )}
                {FORM_CONTENT.roiCalculator.fields.currentTurnover.hint && (
                  <p className="text-sm text-gray-500">
                    {FORM_CONTENT.roiCalculator.fields.currentTurnover.hint}
                  </p>
                )}
              </div>

              {/* Average Salary */}
              <div className="space-y-2">
                <Label htmlFor="averageSalary">
                  {FORM_CONTENT.roiCalculator.fields.averageSalary.label}
                </Label>
                <Input
                  id="averageSalary"
                  type="number"
                  {...register('averageSalary')}
                  placeholder={FORM_CONTENT.roiCalculator.fields.averageSalary.placeholder}
                  disabled={isCalculating}
                  aria-invalid={errors.averageSalary ? 'true' : 'false'}
                />
                {errors.averageSalary && (
                  <p className="text-sm text-destructive">{errors.averageSalary.message}</p>
                )}
              </div>

              {/* Current Hire Time (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="currentHireTime">
                  {FORM_CONTENT.roiCalculator.fields.currentHireTime.label}
                </Label>
                <Input
                  id="currentHireTime"
                  type="number"
                  {...register('currentHireTime')}
                  placeholder={FORM_CONTENT.roiCalculator.fields.currentHireTime.placeholder}
                  disabled={isCalculating}
                  aria-invalid={errors.currentHireTime ? 'true' : 'false'}
                />
                {errors.currentHireTime && (
                  <p className="text-sm text-destructive">{errors.currentHireTime.message}</p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isCalculating}
              >
                {isCalculating ? FORM_CONTENT.roiCalculator.buttons.calculating : FORM_CONTENT.roiCalculator.buttons.calculate}
              </Button>
            </form>
          </Card>

          {/* Results Display */}
          <div className="space-y-6">
            {roiResult ? (
              <>
                {/* Key Metrics */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* ROI Multiplier */}
                  <Card className="p-6">
                    <div className="mb-2 flex items-center gap-2 text-primary">
                      <TrendingUp className="h-5 w-5" aria-hidden="true" />
                      <span className="text-sm font-medium">{FORM_CONTENT.roiCalculator.results.metrics.roi}</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {roiResult.roi.roiMultiplier}x
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {FORM_CONTENT.roiCalculator.results.metrics.roiDescription}
                    </p>
                  </Card>

                  {/* Payback Period */}
                  <Card className="p-6">
                    <div className="mb-2 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <Calendar className="h-5 w-5" aria-hidden="true" />
                      <span className="text-sm font-medium">{FORM_CONTENT.roiCalculator.results.metrics.payback}</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {roiResult.roi.paybackDays} {FORM_CONTENT.roiCalculator.results.metrics.paybackUnit}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {roiResult.roi.paybackWeeks} {FORM_CONTENT.roiCalculator.results.metrics.paybackWeeks}
                    </p>
                  </Card>

                  {/* Annual Savings */}
                  <Card className="p-6">
                    <div className="mb-2 flex items-center gap-2 text-green-600 dark:text-green-400">
                      <DollarSign className="h-5 w-5" aria-hidden="true" />
                      <span className="text-sm font-medium">{FORM_CONTENT.roiCalculator.results.metrics.savings}</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(roiResult.withAstra.totalAnnualSavings)}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {FORM_CONTENT.roiCalculator.results.metrics.savingsDescription}
                    </p>
                  </Card>

                  {/* Time Saved */}
                  <Card className="p-6">
                    <div className="mb-2 flex items-center gap-2 text-purple-600 dark:text-purple-400">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                      <span className="text-sm font-medium">{FORM_CONTENT.roiCalculator.results.metrics.timeSaved}</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {roiResult.withAstra.totalTimeSavedHours}{FORM_CONTENT.roiCalculator.results.metrics.timeSavedUnit}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {FORM_CONTENT.roiCalculator.results.metrics.timeSavedDescription}
                    </p>
                  </Card>
                </div>

                {/* Charts Visualization */}
                <ROICharts
                  currentAnnualCost={roiResult.currentSituation.currentAnnualTurnoverCost}
                  totalAnnualSavings={roiResult.withAstra.totalAnnualSavings}
                  threeYearSavings={roiResult.threeYear.totalSavings}
                  threeYearCost={roiResult.threeYear.totalCost}
                  astraCost={roiResult.roi.astraCost}
                  turnoverSavings={roiResult.withAstra.annualTurnoverSavings}
                  timeSavings={roiResult.withAstra.annualTimeSavings}
                />

                {/* Detailed Breakdown */}
                <Card className="p-6">
                  <h4 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    {FORM_CONTENT.roiCalculator.results.title}
                  </h4>

                  <div className="space-y-4">
                    {/* Current Situation */}
                    <div>
                      <h5 className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                        {FORM_CONTENT.roiCalculator.results.breakdown.currentSituation}
                      </h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• {FORM_CONTENT.roiCalculator.results.breakdown.turnovers}: {roiResult.currentSituation.annualTurnovers}</li>
                        <li>
                          • {FORM_CONTENT.roiCalculator.results.breakdown.replacementCost}: {formatCurrency(roiResult.currentSituation.replacementCostPerEmployee)}
                        </li>
                        <li>
                          • {FORM_CONTENT.roiCalculator.results.breakdown.annualLoss}: {formatCurrency(roiResult.currentSituation.currentAnnualTurnoverCost)}
                        </li>
                      </ul>
                    </div>

                    {/* With Astra */}
                    <div>
                      <h5 className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                        {FORM_CONTENT.roiCalculator.results.breakdown.withAstra}
                      </h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• {FORM_CONTENT.roiCalculator.results.breakdown.turnoverReduction}: {roiResult.withAstra.turnoverReduction} сотрудников</li>
                        <li>
                          • {FORM_CONTENT.roiCalculator.results.breakdown.hiringSavings}: {formatCurrency(roiResult.withAstra.annualTurnoverSavings)}
                        </li>
                        <li>
                          • {FORM_CONTENT.roiCalculator.results.breakdown.timeSavings}: {formatCurrency(roiResult.withAstra.annualTimeSavings)}
                        </li>
                      </ul>
                    </div>

                    {/* Recommended Plan */}
                    <div className="rounded-lg bg-primary/10 p-4">
                      <p className="font-semibold text-primary">
                        {FORM_CONTENT.roiCalculator.results.breakdown.recommendedPlan}:{' '}
                        {roiResult.roi.recommendedPlan === 'basic' ? 'Basic' : 'Pro'}
                      </p>
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        {FORM_CONTENT.roiCalculator.results.breakdown.cost}: {formatCurrency(roiResult.roi.astraCost)} в год
                      </p>
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        {FORM_CONTENT.roiCalculator.results.breakdown.netProfit}: {formatCurrency(roiResult.roi.netSavings)} в год
                      </p>
                    </div>

                    {/* 3-Year Projection */}
                    <div>
                      <h5 className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                        {FORM_CONTENT.roiCalculator.results.breakdown.threeYearTitle}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {FORM_CONTENT.roiCalculator.results.breakdown.threeYearSavings}: {formatCurrency(roiResult.threeYear.netSavings)}
                      </p>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="flex h-full items-center justify-center p-12">
                <div className="text-center">
                  <TrendingUp className="mx-auto mb-4 h-12 w-12 text-gray-400" aria-hidden="true" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {FORM_CONTENT.roiCalculator.results.emptyState}
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
