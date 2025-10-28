'use client';

import { type FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, Clock, DollarSign, Calendar } from 'lucide-react';

// Validation schema (matching API validation)
const roiSchema = z.object({
  companySize: z.coerce
    .number()
    .min(10, 'Минимальное количество: 10')
    .max(100000, 'Максимальное количество: 100000'),
  currentTurnover: z.coerce
    .number()
    .min(0, 'Текучка не может быть отрицательной')
    .max(100, 'Текучка не может быть больше 100%'),
  averageSalary: z.coerce
    .number()
    .min(30000, 'Минимальная зарплата: 30,000 руб')
    .optional(),
  currentHireTime: z.coerce
    .number()
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
 * ROI Calculator Section Component
 *
 * Features:
 * - Interactive ROI calculation
 * - Real-time results display
 * - 4 key metrics visualization
 * - 3-year projection
 * - Recommended plan suggestion
 *
 * @example
 * ```tsx
 * <ROICalculatorSection />
 * ```
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
    }, 500); // 500ms debounce

    return () => clearTimeout(timeout);
  }, [watchedValues.companySize, watchedValues.currentTurnover, watchedValues.averageSalary]);

  const handleCalculate = async (data: ROIFormValues) => {
    setIsCalculating(true);
    setError(null);

    try {
      const response = await fetch('/api/roi-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setRoiResult(result.data);
      } else {
        setError(result.message || 'Произошла ошибка при расчете');
      }
    } catch (err) {
      setError('Произошла ошибка при расчете. Попробуйте позже.');
    } finally {
      setIsCalculating(false);
    }
  };

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
            Калькулятор ROI
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Рассчитайте экономическую выгоду от внедрения Astra в вашей компании
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Calculator Form */}
          <Card className="p-6 md:p-8">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Параметры компании
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Company Size */}
              <div className="space-y-2">
                <Label htmlFor="companySize">
                  Количество сотрудников <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="companySize"
                  type="number"
                  {...register('companySize')}
                  placeholder="100"
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
                  Текущая текучесть кадров (%) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="currentTurnover"
                  type="number"
                  step="0.1"
                  {...register('currentTurnover')}
                  placeholder="15"
                  disabled={isCalculating}
                  aria-invalid={errors.currentTurnover ? 'true' : 'false'}
                />
                {errors.currentTurnover && (
                  <p className="text-sm text-destructive">{errors.currentTurnover.message}</p>
                )}
                <p className="text-sm text-gray-500">
                  Средняя по России: 15-20%
                </p>
              </div>

              {/* Average Salary */}
              <div className="space-y-2">
                <Label htmlFor="averageSalary">
                  Средняя зарплата (руб/месяц)
                </Label>
                <Input
                  id="averageSalary"
                  type="number"
                  {...register('averageSalary')}
                  placeholder="100000"
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
                  Время найма (дней)
                </Label>
                <Input
                  id="currentHireTime"
                  type="number"
                  {...register('currentHireTime')}
                  placeholder="30"
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
                {isCalculating ? 'Расчет...' : 'Рассчитать ROI'}
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
                      <span className="text-sm font-medium">ROI</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {roiResult.roi.roiMultiplier}x
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Возврат инвестиций
                    </p>
                  </Card>

                  {/* Payback Period */}
                  <Card className="p-6">
                    <div className="mb-2 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <Calendar className="h-5 w-5" aria-hidden="true" />
                      <span className="text-sm font-medium">Окупаемость</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {roiResult.roi.paybackDays} дн.
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {roiResult.roi.paybackWeeks} недель
                    </p>
                  </Card>

                  {/* Annual Savings */}
                  <Card className="p-6">
                    <div className="mb-2 flex items-center gap-2 text-green-600 dark:text-green-400">
                      <DollarSign className="h-5 w-5" aria-hidden="true" />
                      <span className="text-sm font-medium">Экономия</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(roiResult.withAstra.totalAnnualSavings)}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      В год
                    </p>
                  </Card>

                  {/* Time Saved */}
                  <Card className="p-6">
                    <div className="mb-2 flex items-center gap-2 text-purple-600 dark:text-purple-400">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                      <span className="text-sm font-medium">Время</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {roiResult.withAstra.totalTimeSavedHours}ч
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Сэкономлено HR
                    </p>
                  </Card>
                </div>

                {/* Detailed Breakdown */}
                <Card className="p-6">
                  <h4 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Детальный расчет
                  </h4>

                  <div className="space-y-4">
                    {/* Current Situation */}
                    <div>
                      <h5 className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                        Текущая ситуация:
                      </h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Увольнений в год: {roiResult.currentSituation.annualTurnovers}</li>
                        <li>
                          • Стоимость найма: {formatCurrency(roiResult.currentSituation.replacementCostPerEmployee)}
                        </li>
                        <li>
                          • Потери в год: {formatCurrency(roiResult.currentSituation.currentAnnualTurnoverCost)}
                        </li>
                      </ul>
                    </div>

                    {/* With Astra */}
                    <div>
                      <h5 className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                        С Astra:
                      </h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Снижение текучести: {roiResult.withAstra.turnoverReduction} сотрудников</li>
                        <li>
                          • Экономия на найме: {formatCurrency(roiResult.withAstra.annualTurnoverSavings)}
                        </li>
                        <li>
                          • Экономия времени HR: {formatCurrency(roiResult.withAstra.annualTimeSavings)}
                        </li>
                      </ul>
                    </div>

                    {/* Recommended Plan */}
                    <div className="rounded-lg bg-primary/10 p-4">
                      <p className="font-semibold text-primary">
                        Рекомендуемый план:{' '}
                        {roiResult.roi.recommendedPlan === 'basic' ? 'Basic' : 'Pro'}
                      </p>
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        Стоимость: {formatCurrency(roiResult.roi.astraCost)} в год
                      </p>
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        Чистая прибыль: {formatCurrency(roiResult.roi.netSavings)} в год
                      </p>
                    </div>

                    {/* 3-Year Projection */}
                    <div>
                      <h5 className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                        Прогноз на 3 года:
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Общая экономия: {formatCurrency(roiResult.threeYear.netSavings)}
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
                    Заполните форму, чтобы увидеть расчет ROI
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
