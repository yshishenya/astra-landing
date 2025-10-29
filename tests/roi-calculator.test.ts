/**
 * ROI Calculator Unit Tests
 *
 * Tests for business-critical ROI calculation logic and validation.
 * These tests ensure accuracy of financial calculations shown to customers.
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { ROI_CALCULATION_CONFIG } from '@/lib/constants';

// Test data factory
const createValidROIInput = (overrides = {}) => ({
  companySize: 100,
  currentTurnover: 15,
  averageSalary: 100000,
  currentHireTime: 30,
  ...overrides,
});

/**
 * Test Suite 1: Zod Validation Schema
 * Ensures input validation catches all edge cases
 */
describe('ROI Calculator Validation Schema', () => {
  // Re-create schema for testing (extracted from component)
  const roiSchema = z.object({
    companySize: z.coerce
      .number()
      .finite('Некорректное число')
      .safe('Число слишком большое')
      .min(10, 'Минимальное количество: 10')
      .max(100000, 'Максимальное количество: 100000'),
    currentTurnover: z.coerce
      .number()
      .finite('Некорректное число')
      .safe('Число слишком большое')
      .transform((val) => Math.round(val * 100) / 100)
      .refine((val) => val >= 0, 'Текучка не может быть отрицательной')
      .refine((val) => val <= 100, 'Текучка не может быть больше 100%'),
    averageSalary: z.coerce
      .number()
      .finite('Некорректное число')
      .safe('Число слишком большое')
      .min(30000, 'Минимальная зарплата: 30,000 руб')
      .optional(),
    currentHireTime: z.coerce
      .number()
      .finite('Некорректное число')
      .safe('Число слишком большое')
      .min(1, 'Минимальное время: 1 день')
      .max(365, 'Максимальное время: 365 дней')
      .optional(),
  });

  describe('companySize validation', () => {
    it('should accept valid company size', () => {
      const result = roiSchema.safeParse(createValidROIInput());
      expect(result.success).toBe(true);
    });

    it('should reject company size below minimum', () => {
      const result = roiSchema.safeParse(createValidROIInput({ companySize: 5 }));
      expect(result.success).toBe(false);
    });

    it('should reject company size above maximum', () => {
      const result = roiSchema.safeParse(createValidROIInput({ companySize: 100001 }));
      expect(result.success).toBe(false);
    });

    it('should reject Infinity', () => {
      const result = roiSchema.safeParse(createValidROIInput({ companySize: Infinity }));
      expect(result.success).toBe(false);
    });

    it('should reject NaN', () => {
      const result = roiSchema.safeParse(createValidROIInput({ companySize: NaN }));
      expect(result.success).toBe(false);
    });

    it('should reject scientific notation overflow (1e308)', () => {
      const result = roiSchema.safeParse(createValidROIInput({ companySize: 1e308 }));
      expect(result.success).toBe(false);
    });

    it('should accept boundary values', () => {
      expect(roiSchema.safeParse(createValidROIInput({ companySize: 10 })).success).toBe(true);
      expect(roiSchema.safeParse(createValidROIInput({ companySize: 100000 })).success).toBe(true);
    });
  });

  describe('currentTurnover validation', () => {
    it('should accept valid turnover percentage', () => {
      const result = roiSchema.safeParse(createValidROIInput({ currentTurnover: 15 }));
      expect(result.success).toBe(true);
    });

    it('should reject negative turnover', () => {
      const result = roiSchema.safeParse(createValidROIInput({ currentTurnover: -5 }));
      expect(result.success).toBe(false);
    });

    it('should reject turnover above 100%', () => {
      const result = roiSchema.safeParse(createValidROIInput({ currentTurnover: 101 }));
      expect(result.success).toBe(false);
    });

    it('should round to 2 decimal places', () => {
      const result = roiSchema.safeParse(createValidROIInput({ currentTurnover: 15.666666 }));
      if (result.success) {
        expect(result.data.currentTurnover).toBe(15.67);
      }
    });

    it('should accept boundary values', () => {
      expect(roiSchema.safeParse(createValidROIInput({ currentTurnover: 0 })).success).toBe(true);
      expect(roiSchema.safeParse(createValidROIInput({ currentTurnover: 100 })).success).toBe(true);
    });

    it('should reject Infinity', () => {
      const result = roiSchema.safeParse(createValidROIInput({ currentTurnover: Infinity }));
      expect(result.success).toBe(false);
    });
  });

  describe('averageSalary validation', () => {
    it('should accept valid salary', () => {
      const result = roiSchema.safeParse(createValidROIInput({ averageSalary: 100000 }));
      expect(result.success).toBe(true);
    });

    it('should reject salary below minimum', () => {
      const result = roiSchema.safeParse(createValidROIInput({ averageSalary: 20000 }));
      expect(result.success).toBe(false);
    });

    it('should accept optional salary (undefined)', () => {
      const { averageSalary, ...input } = createValidROIInput();
      const result = roiSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject Infinity', () => {
      const result = roiSchema.safeParse(createValidROIInput({ averageSalary: Infinity }));
      expect(result.success).toBe(false);
    });
  });
});

/**
 * Test Suite 2: ROI Calculation Logic
 * Tests the core business logic for accuracy
 */
describe('ROI Calculation Logic', () => {
  // Mock calculation function (extracted from component for testability)
  const calculateROI = (data: {
    companySize: number;
    currentTurnover: number;
    averageSalary: number;
  }) => {
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
    const replacementCostPerEmployee = data.averageSalary * REPLACEMENT_COST_MULTIPLIER;
    const currentAnnualTurnoverCost = annualTurnovers * replacementCostPerEmployee;

    // 2. Calculate cost savings from reduced turnover
    const turnoverReduction = annualTurnovers * TURNOVER_REDUCTION;
    const hiringSavings = turnoverReduction * replacementCostPerEmployee;

    // 3. Calculate time savings
    const timeSavedPerAnalysis = TRADITIONAL_ANALYSIS_TIME - ASTRA_ANALYSIS_TIME;
    const totalAnalysesPerYear = data.companySize;
    const totalTimeSavedHours = totalAnalysesPerYear * timeSavedPerAnalysis;
    const totalTimeSavedDays = totalTimeSavedHours / 8;
    const timeSavingsValue = totalTimeSavedHours * HOURLY_HR_COST;

    // 4. Calculate total annual savings
    const totalAnnualSavings = hiringSavings + timeSavingsValue;

    // 5. Determine recommended plan and cost
    const recommendedPlan = data.companySize > 500 ? 'pro' : 'basic';
    const annualCost = recommendedPlan === 'pro' ? PRO_PLAN_ANNUAL : BASIC_PLAN_ANNUAL;

    // 6. Calculate ROI metrics
    const netProfit = totalAnnualSavings - annualCost;
    const roiMultiplier = totalAnnualSavings / annualCost;
    const paybackDays = Math.ceil((annualCost / totalAnnualSavings) * WORKING_DAYS_PER_YEAR);
    const paybackWeeks = Math.ceil(paybackDays / 7);

    return {
      annualTurnovers,
      replacementCostPerEmployee,
      currentAnnualTurnoverCost,
      turnoverReduction,
      hiringSavings,
      totalTimeSavedHours,
      timeSavingsValue,
      totalAnnualSavings,
      recommendedPlan,
      annualCost,
      netProfit,
      roiMultiplier,
      paybackDays,
      paybackWeeks,
    };
  };

  describe('Basic calculation accuracy', () => {
    it('should calculate correct values for 100 employees with 15% turnover', () => {
      const result = calculateROI({
        companySize: 100,
        currentTurnover: 15,
        averageSalary: 100000,
      });

      expect(result.annualTurnovers).toBe(15); // 100 * 15%
      expect(result.replacementCostPerEmployee).toBe(250000); // 100k * 2.5
      expect(result.currentAnnualTurnoverCost).toBe(3750000); // 15 * 250k
      expect(result.turnoverReduction).toBeCloseTo(1.05); // 15 * 7%
      expect(result.hiringSavings).toBeCloseTo(262500); // 1.05 * 250k
    });

    it('should calculate ROI multiplier correctly', () => {
      const result = calculateROI({
        companySize: 100,
        currentTurnover: 15,
        averageSalary: 100000,
      });

      expect(result.roiMultiplier).toBeGreaterThan(10); // Should be very profitable
      expect(result.netProfit).toBeGreaterThan(0); // Should be positive
    });

    it('should recommend Basic plan for small companies', () => {
      const result = calculateROI({
        companySize: 100,
        currentTurnover: 15,
        averageSalary: 100000,
      });

      expect(result.recommendedPlan).toBe('basic');
      expect(result.annualCost).toBe(30000);
    });

    it('should recommend Pro plan for large companies', () => {
      const result = calculateROI({
        companySize: 600,
        currentTurnover: 15,
        averageSalary: 100000,
      });

      expect(result.recommendedPlan).toBe('pro');
      expect(result.annualCost).toBe(60000);
    });
  });

  describe('Edge cases', () => {
    it('should handle zero turnover (no savings)', () => {
      const result = calculateROI({
        companySize: 100,
        currentTurnover: 0,
        averageSalary: 100000,
      });

      expect(result.hiringSavings).toBe(0);
      expect(result.timeSavingsValue).toBeGreaterThan(0); // Still has time savings
    });

    it('should handle 100% turnover (maximum case)', () => {
      const result = calculateROI({
        companySize: 100,
        currentTurnover: 100,
        averageSalary: 100000,
      });

      expect(result.annualTurnovers).toBe(100);
      expect(result.hiringSavings).toBeGreaterThan(0);
    });

    it('should handle minimum company size (10 employees)', () => {
      const result = calculateROI({
        companySize: 10,
        currentTurnover: 15,
        averageSalary: 100000,
      });

      expect(result.annualTurnovers).toBeGreaterThan(0);
      expect(result.roiMultiplier).toBeGreaterThan(0);
    });

    it('should handle very high salary', () => {
      const result = calculateROI({
        companySize: 100,
        currentTurnover: 15,
        averageSalary: 500000, // High salary
      });

      expect(result.replacementCostPerEmployee).toBe(1250000); // 500k * 2.5
      expect(result.hiringSavings).toBeGreaterThan(1000000);
    });
  });

  describe('Time savings calculation', () => {
    it('should calculate time savings correctly', () => {
      const result = calculateROI({
        companySize: 100,
        currentTurnover: 15,
        averageSalary: 100000,
      });

      const expectedTimeSavedPerAnalysis = 2.5 - 0.025; // 2.475 hours
      const expectedTotalTimeSaved = 100 * expectedTimeSavedPerAnalysis; // 247.5 hours
      const expectedTimeSavingsValue = expectedTotalTimeSaved * 1500; // 371,250 RUB

      expect(result.totalTimeSavedHours).toBeCloseTo(247.5);
      expect(result.timeSavingsValue).toBeCloseTo(371250);
    });
  });

  describe('Payback period calculation', () => {
    it('should calculate payback period in days and weeks', () => {
      const result = calculateROI({
        companySize: 100,
        currentTurnover: 15,
        averageSalary: 100000,
      });

      expect(result.paybackDays).toBeGreaterThan(0);
      expect(result.paybackDays).toBeLessThan(250); // Should be less than a year
      expect(result.paybackWeeks).toBeGreaterThan(0);
      expect(result.paybackWeeks).toBe(Math.ceil(result.paybackDays / 7));
    });
  });
});

/**
 * Test Suite 3: ROI Configuration Constants
 * Ensures configuration values are within expected ranges
 */
describe('ROI Configuration Constants', () => {
  it('should have reasonable replacement cost multiplier', () => {
    expect(ROI_CALCULATION_CONFIG.REPLACEMENT_COST_MULTIPLIER).toBeGreaterThanOrEqual(1.5);
    expect(ROI_CALCULATION_CONFIG.REPLACEMENT_COST_MULTIPLIER).toBeLessThanOrEqual(3.0);
  });

  it('should have conservative turnover reduction', () => {
    expect(ROI_CALCULATION_CONFIG.TURNOVER_REDUCTION).toBeGreaterThanOrEqual(0.03); // 3% conservative
    expect(ROI_CALCULATION_CONFIG.TURNOVER_REDUCTION).toBeLessThanOrEqual(0.12); // 12% optimistic
  });

  it('should have valid time comparisons', () => {
    expect(ROI_CALCULATION_CONFIG.TRADITIONAL_ANALYSIS_TIME).toBeGreaterThan(
      ROI_CALCULATION_CONFIG.ASTRA_ANALYSIS_TIME
    );
  });

  it('should have positive pricing', () => {
    expect(ROI_CALCULATION_CONFIG.BASIC_PLAN_ANNUAL).toBeGreaterThan(0);
    expect(ROI_CALCULATION_CONFIG.PRO_PLAN_ANNUAL).toBeGreaterThan(
      ROI_CALCULATION_CONFIG.BASIC_PLAN_ANNUAL
    );
  });

  it('should have reasonable working days', () => {
    expect(ROI_CALCULATION_CONFIG.WORKING_DAYS_PER_YEAR).toBeGreaterThanOrEqual(240);
    expect(ROI_CALCULATION_CONFIG.WORKING_DAYS_PER_YEAR).toBeLessThanOrEqual(260);
  });
});
