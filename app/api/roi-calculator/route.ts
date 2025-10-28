import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, getClientIdentifier, RateLimitPresets } from '@/lib/rate-limit';

// Validation schema for ROI calculator
const roiSchema = z.object({
  companySize: z.number().min(10, 'Минимальное количество сотрудников: 10').max(100000, 'Максимальное количество сотрудников: 100000'),
  currentTurnover: z.number().min(0, 'Текучка не может быть отрицательной').max(100, 'Текучка не может быть больше 100%'),
  averageSalary: z.number().min(30000, 'Минимальная средняя зарплата: 30,000 руб').optional(),
  currentHireTime: z.number().min(1, 'Минимальное время: 1 день').max(365, 'Максимальное время: 365 дней').optional(),
});

// Constants for calculation
const CONSTANTS = {
  // Average replacement cost per employee (in RUB)
  REPLACEMENT_COST_MULTIPLIER: 2.5, // 2.5x monthly salary
  DEFAULT_AVG_SALARY: 100000, // 100k RUB/month

  // Astra impact metrics
  TURNOVER_REDUCTION: 0.07, // 7% reduction (conservative, can be 5-10%)
  TIME_SAVINGS_PER_ANALYSIS: 2, // hours saved per employee analysis
  HOURLY_HR_COST: 1500, // RUB per hour for HR specialist

  // Pricing (from constants.ts)
  BASIC_PLAN_ANNUAL: 30000,
  PRO_PLAN_ANNUAL: 60000,

  // Time metrics
  TRADITIONAL_ANALYSIS_TIME: 2.5, // hours per employee
  ASTRA_ANALYSIS_TIME: 0.025, // hours (90 seconds)

  // Payback calculation
  WORKING_DAYS_PER_YEAR: 250,
} as const;

/**
 * Calculate ROI for Astra implementation
 */
function calculateROI(input: z.infer<typeof roiSchema>) {
  const avgSalary = input.averageSalary || CONSTANTS.DEFAULT_AVG_SALARY;

  // 1. Calculate current turnover costs
  const annualTurnovers = Math.round((input.companySize * input.currentTurnover) / 100);
  const replacementCostPerEmployee = avgSalary * CONSTANTS.REPLACEMENT_COST_MULTIPLIER;
  const currentAnnualTurnoverCost = annualTurnovers * replacementCostPerEmployee;

  // 2. Calculate cost savings from reduced turnover
  const turnoverReduction = annualTurnovers * CONSTANTS.TURNOVER_REDUCTION;
  const annualTurnoverSavings = turnoverReduction * replacementCostPerEmployee;

  // 3. Calculate time savings for HR team
  const employeesAnalyzedPerYear = Math.min(input.companySize * 0.3, 500); // Assume 30% get career analysis, cap at 500
  const timeSavedPerEmployee = CONSTANTS.TRADITIONAL_ANALYSIS_TIME - CONSTANTS.ASTRA_ANALYSIS_TIME;
  const totalTimeSavedHours = employeesAnalyzedPerYear * timeSavedPerEmployee;
  const annualTimeSavings = totalTimeSavedHours * CONSTANTS.HOURLY_HR_COST;

  // 4. Total annual savings
  const totalAnnualSavings = annualTurnoverSavings + annualTimeSavings;

  // 5. Determine recommended plan
  const recommendedPlan = input.companySize < 200 ? 'basic' : 'pro';
  const astraCost = recommendedPlan === 'basic'
    ? CONSTANTS.BASIC_PLAN_ANNUAL
    : CONSTANTS.PRO_PLAN_ANNUAL;

  // 6. Calculate ROI
  const netSavings = totalAnnualSavings - astraCost;
  const roi = (netSavings / astraCost) * 100;
  const roiMultiplier = totalAnnualSavings / astraCost;

  // 7. Calculate payback period (in days)
  const dailySavings = totalAnnualSavings / CONSTANTS.WORKING_DAYS_PER_YEAR;
  const paybackDays = Math.ceil(astraCost / dailySavings);

  // 8. Three-year projection
  const threeYearSavings = totalAnnualSavings * 3;
  const threeYearCost = astraCost * 3;
  const threeYearNetSavings = threeYearSavings - threeYearCost;

  return {
    // Inputs
    inputs: {
      companySize: input.companySize,
      currentTurnover: input.currentTurnover,
      averageSalary: avgSalary,
    },

    // Current situation
    currentSituation: {
      annualTurnovers,
      currentAnnualTurnoverCost,
      replacementCostPerEmployee,
    },

    // With Astra
    withAstra: {
      turnoverReduction: Math.round(turnoverReduction),
      annualTurnoverSavings: Math.round(annualTurnoverSavings),
      employeesAnalyzedPerYear: Math.round(employeesAnalyzedPerYear),
      totalTimeSavedHours: Math.round(totalTimeSavedHours),
      annualTimeSavings: Math.round(annualTimeSavings),
      totalAnnualSavings: Math.round(totalAnnualSavings),
    },

    // ROI metrics
    roi: {
      recommendedPlan,
      astraCost,
      netSavings: Math.round(netSavings),
      roiPercentage: Math.round(roi),
      roiMultiplier: Math.round(roiMultiplier * 10) / 10, // e.g., 162.5x
      paybackDays,
      paybackWeeks: Math.ceil(paybackDays / 7),
    },

    // Three-year projection
    threeYear: {
      totalSavings: Math.round(threeYearSavings),
      totalCost: threeYearCost,
      netSavings: Math.round(threeYearNetSavings),
    },
  };
}

export async function POST(request: Request) {
  try {
    // Rate limiting: 100 requests per 15 minutes (lenient for calculator)
    const identifier = getClientIdentifier(request);
    const rateLimitResult = rateLimit(identifier, RateLimitPresets.LENIENT);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: `Слишком много запросов. Попробуйте снова через ${rateLimitResult.retryAfter} секунд.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter),
            'X-RateLimit-Limit': String(RateLimitPresets.LENIENT.maxRequests),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.resetAt),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate data
    const validatedData = roiSchema.parse(body);

    // Calculate ROI
    const result = calculateROI(validatedData);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Ошибка валидации данных',
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error('ROI calculation error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Произошла ошибка при расчете ROI. Попробуйте позже.',
      },
      { status: 500 }
    );
  }
}
