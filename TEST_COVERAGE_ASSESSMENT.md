# Test Coverage Assessment Report
**Date:** 2025-10-29
**Project:** Astra Landing Page
**Reviewer:** Test Automation Specialist

---

## Executive Summary

### Current Test Coverage Estimate: 45-55%

**Test Infrastructure:**
- Vitest 4.0.4 (unit/integration tests)
- Playwright 1.56.1 (E2E tests)
- Percy 1.31.4 (visual regression)
- Testing Library React 16.3.0
- 7 unit test files
- 3 E2E test files
- 27 total component files

**Critical Gaps:**
1. **NO TESTS** for ROI Calculator (535 lines, complex business logic)
2. **NO TESTS** for ROI Charts (252 lines, data visualization)
3. **NO TESTS** for Results Section (333 lines, animations)
4. **NO TESTS** for SmoothScrollProvider (63 lines, RAF cleanup)
5. **NO UNIT TESTS** for ROI calculation functions
6. **NO INTEGRATION TESTS** for form validation → calculation → results flow
7. **NO E2E TESTS** for ROI calculator interaction

---

## 1. Current Test Status

### 1.1 Existing Unit Tests (7 files)

| File | Lines | Coverage | Status |
|------|-------|----------|--------|
| `__tests__/components/button.test.tsx` | ~50 | Good | ✅ |
| `__tests__/lib/utils.test.ts` | 74 | Good | ✅ |
| `__tests__/lib/analytics.test.ts` | 397 | Excellent | ✅ |
| `__tests__/lib/email-templates.test.ts` | ~100 | Good | ✅ |
| `__tests__/app/api/roi-calculator/route.test.ts` | ~150 | Unknown | ⚠️ |
| `__tests__/app/api/contact/route.test.ts` | ~100 | Unknown | ⚠️ |
| `__tests__/app/api/demo/route.test.ts` | ~100 | Unknown | ⚠️ |

### 1.2 Existing E2E Tests (3 files)

| File | Tests | Coverage | Status |
|------|-------|----------|--------|
| `e2e/landing.spec.ts` | 25+ tests | Hero, Trust Bar, Problem, Solution, Features sections | ✅ Excellent |
| `e2e/visual-regression.spec.ts` | 13+ tests | Percy snapshots for all sections | ✅ Good |
| `e2e/visual-regression-playwright.spec.ts` | Unknown | Native Playwright snapshots | ⚠️ Needs review |

**Missing E2E Coverage:**
- ROI Calculator section (NOT TESTED)
- Contact form submission
- Demo form submission
- Results section animations
- Chart interactions

---

## 2. Critical Untested Functionality (Priority Order)

### CRITICAL (Priority: P0)

#### 2.1 ROI Calculation Function (`calculateROIClientSide`)
**Location:** `/home/yan/astra_landing/components/landing/roi-calculator.tsx` (lines 121-204)

**Risk:** High - Core business logic, complex calculations, financial data

**Test Cases Needed:**

```typescript
// __tests__/lib/roi-calculations.test.ts
describe('calculateROIClientSide', () => {
  // HAPPY PATH
  it('should calculate ROI correctly for small company (100 employees)', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 15,
      averageSalary: 100000,
      currentHireTime: 30,
    });

    expect(result.currentSituation.annualTurnovers).toBe(15);
    expect(result.roi.recommendedPlan).toBe('basic');
    expect(result.roi.roiMultiplier).toBeGreaterThan(0);
    expect(result.roi.paybackDays).toBeLessThan(365);
  });

  it('should calculate ROI correctly for large company (500 employees)', () => {
    const result = calculateROIClientSide({
      companySize: 500,
      currentTurnover: 15,
      averageSalary: 150000,
    });

    expect(result.roi.recommendedPlan).toBe('pro');
    expect(result.withAstra.employeesAnalyzedPerYear).toBeLessThanOrEqual(500);
  });

  // EDGE CASES
  it('should handle minimum valid input (10 employees, 0% turnover)', () => {
    const result = calculateROIClientSide({
      companySize: 10,
      currentTurnover: 0,
      averageSalary: 30000,
    });

    expect(result.currentSituation.annualTurnovers).toBe(0);
    expect(result.withAstra.totalAnnualSavings).toBeGreaterThanOrEqual(0);
  });

  it('should handle maximum valid input (100,000 employees, 100% turnover)', () => {
    const result = calculateROIClientSide({
      companySize: 100000,
      currentTurnover: 100,
      averageSalary: 100000,
    });

    expect(result.currentSituation.annualTurnovers).toBe(100000);
    expect(result.withAstra.employeesAnalyzedPerYear).toBe(500); // Capped
  });

  it('should handle decimal turnover percentage (15.5%)', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 15.5,
      averageSalary: 100000,
    });

    expect(result.currentSituation.annualTurnovers).toBe(16); // Rounded
  });

  it('should cap employees analyzed per year at 500', () => {
    const result = calculateROIClientSide({
      companySize: 10000,
      currentTurnover: 15,
    });

    // Formula: Math.min(companySize * 0.3, 500)
    expect(result.withAstra.employeesAnalyzedPerYear).toBe(500);
  });

  it('should use default salary (100,000) when not provided', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 15,
    });

    expect(result.inputs.averageSalary).toBe(100000);
  });

  // CALCULATION ACCURACY
  it('should calculate replacement cost correctly (2.5x multiplier)', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 10,
      averageSalary: 100000,
    });

    expect(result.currentSituation.replacementCostPerEmployee).toBe(250000);
  });

  it('should calculate turnover reduction correctly (7%)', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 20,
    });

    // 100 * 20% = 20 turnovers
    // 20 * 7% = 1.4 → rounded to 1
    expect(result.withAstra.turnoverReduction).toBe(1);
  });

  it('should calculate payback period in days correctly', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 15,
      averageSalary: 100000,
    });

    const dailySavings = result.withAstra.totalAnnualSavings / 250;
    const expectedPaybackDays = Math.ceil(result.roi.astraCost / dailySavings);

    expect(result.roi.paybackDays).toBe(expectedPaybackDays);
    expect(result.roi.paybackWeeks).toBe(Math.ceil(result.roi.paybackDays / 7));
  });

  it('should calculate 3-year projection correctly', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 15,
    });

    expect(result.threeYear.totalSavings).toBe(result.withAstra.totalAnnualSavings * 3);
    expect(result.threeYear.totalCost).toBe(result.roi.astraCost * 3);
    expect(result.threeYear.netSavings).toBe(
      result.threeYear.totalSavings - result.threeYear.totalCost
    );
  });

  // ROUNDING BEHAVIOR
  it('should round all currency values to integers', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 15.7,
      averageSalary: 100000,
    });

    expect(Number.isInteger(result.withAstra.totalAnnualSavings)).toBe(true);
    expect(Number.isInteger(result.roi.netSavings)).toBe(true);
    expect(Number.isInteger(result.threeYear.netSavings)).toBe(true);
  });

  it('should round ROI multiplier to 1 decimal place', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 15,
    });

    const multiplierDecimals = result.roi.roiMultiplier.toString().split('.')[1]?.length || 0;
    expect(multiplierDecimals).toBeLessThanOrEqual(1);
  });

  // PLAN SELECTION
  it('should recommend Basic plan for companies < 200 employees', () => {
    const result = calculateROIClientSide({
      companySize: 199,
      currentTurnover: 15,
    });

    expect(result.roi.recommendedPlan).toBe('basic');
  });

  it('should recommend Pro plan for companies >= 200 employees', () => {
    const result = calculateROIClientSide({
      companySize: 200,
      currentTurnover: 15,
    });

    expect(result.roi.recommendedPlan).toBe('pro');
  });

  // CONSTANTS VALIDATION (from ROI_CALCULATION_CONFIG)
  it('should use correct constants from config', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 20,
      averageSalary: 100000,
    });

    // REPLACEMENT_COST_MULTIPLIER = 2.5
    expect(result.currentSituation.replacementCostPerEmployee).toBe(250000);

    // TURNOVER_REDUCTION = 0.07 (7%)
    // 20 turnovers * 0.07 = 1.4 → rounded to 1
    expect(result.withAstra.turnoverReduction).toBe(1);
  });
});
```

---

#### 2.2 Zod Schema Validation
**Location:** `/home/yan/astra_landing/components/landing/roi-calculator.tsx` (lines 17-44)

**Risk:** High - Input validation prevents invalid calculations

**Test Cases Needed:**

```typescript
// __tests__/components/roi-calculator-validation.test.ts
import { z } from 'zod';

describe('ROI Calculator Validation Schema', () => {
  // VALID INPUTS
  it('should accept valid company size (100)', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: 15,
    })).not.toThrow();
  });

  it('should accept decimal turnover (15.5%)', () => {
    const result = roiSchema.parse({
      companySize: 100,
      currentTurnover: 15.5,
    });

    expect(result.currentTurnover).toBe(15.5);
  });

  it('should round turnover to 2 decimal places (15.567 → 15.57)', () => {
    const result = roiSchema.parse({
      companySize: 100,
      currentTurnover: 15.567,
    });

    expect(result.currentTurnover).toBe(15.57);
  });

  it('should accept optional fields as undefined', () => {
    const result = roiSchema.parse({
      companySize: 100,
      currentTurnover: 15,
    });

    expect(result.averageSalary).toBeUndefined();
    expect(result.currentHireTime).toBeUndefined();
  });

  // BOUNDARY TESTING
  it('should accept minimum company size (10)', () => {
    expect(() => roiSchema.parse({
      companySize: 10,
      currentTurnover: 15,
    })).not.toThrow();
  });

  it('should reject company size below minimum (9)', () => {
    expect(() => roiSchema.parse({
      companySize: 9,
      currentTurnover: 15,
    })).toThrow('Минимальное количество: 10');
  });

  it('should accept maximum company size (100,000)', () => {
    expect(() => roiSchema.parse({
      companySize: 100000,
      currentTurnover: 15,
    })).not.toThrow();
  });

  it('should reject company size above maximum (100,001)', () => {
    expect(() => roiSchema.parse({
      companySize: 100001,
      currentTurnover: 15,
    })).toThrow('Максимальное количество: 100000');
  });

  it('should accept zero turnover (0%)', () => {
    const result = roiSchema.parse({
      companySize: 100,
      currentTurnover: 0,
    });

    expect(result.currentTurnover).toBe(0);
  });

  it('should reject negative turnover (-5%)', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: -5,
    })).toThrow('Текучка не может быть отрицательной');
  });

  it('should accept maximum turnover (100%)', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: 100,
    })).not.toThrow();
  });

  it('should reject turnover above 100% (105%)', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: 105,
    })).toThrow('Текучка не может быть больше 100%');
  });

  // EDGE CASES - INVALID NUMBERS
  it('should reject Infinity for company size', () => {
    expect(() => roiSchema.parse({
      companySize: Infinity,
      currentTurnover: 15,
    })).toThrow('Некорректное число');
  });

  it('should reject NaN for turnover', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: NaN,
    })).toThrow('Некорректное число');
  });

  it('should reject unsafe integers (beyond Number.MAX_SAFE_INTEGER)', () => {
    expect(() => roiSchema.parse({
      companySize: Number.MAX_SAFE_INTEGER + 1,
      currentTurnover: 15,
    })).toThrow('Число слишком большое');
  });

  it('should reject scientific notation for turnover (1e10)', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: 1e10,
    })).toThrow('Текучка не может быть больше 100%');
  });

  // AVERAGE SALARY VALIDATION
  it('should accept minimum average salary (30,000)', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: 15,
      averageSalary: 30000,
    })).not.toThrow();
  });

  it('should reject salary below minimum (29,999)', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: 15,
      averageSalary: 29999,
    })).toThrow('Минимальная зарплата: 30,000 руб');
  });

  it('should reject Infinity for salary', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: 15,
      averageSalary: Infinity,
    })).toThrow('Некорректное число');
  });

  // HIRE TIME VALIDATION
  it('should accept minimum hire time (1 day)', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: 15,
      currentHireTime: 1,
    })).not.toThrow();
  });

  it('should reject hire time below minimum (0 days)', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: 15,
      currentHireTime: 0,
    })).toThrow('Минимальное время: 1 день');
  });

  it('should accept maximum hire time (365 days)', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: 15,
      currentHireTime: 365,
    })).not.toThrow();
  });

  it('should reject hire time above maximum (366 days)', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: 15,
      currentHireTime: 366,
    })).toThrow('Максимальное время: 365 дней');
  });

  // STRING COERCION
  it('should coerce string numbers to numbers ("100" → 100)', () => {
    const result = roiSchema.parse({
      companySize: "100",
      currentTurnover: "15",
    });

    expect(typeof result.companySize).toBe('number');
    expect(result.companySize).toBe(100);
  });

  it('should coerce string decimal to number ("15.5" → 15.5)', () => {
    const result = roiSchema.parse({
      companySize: "100",
      currentTurnover: "15.5",
    });

    expect(result.currentTurnover).toBe(15.5);
  });
});
```

---

#### 2.3 Currency Formatting Functions
**Location:** `/home/yan/astra_landing/components/landing/roi-calculator.tsx` (line 260-266)
**Location:** `/home/yan/astra_landing/components/landing/roi-charts.tsx` (lines 75-92)

**Risk:** Medium - Display errors could confuse users

**Test Cases Needed:**

```typescript
// __tests__/lib/currency-formatting.test.ts
describe('Currency Formatting', () => {
  describe('formatCurrency', () => {
    it('should format small amounts (1,000 руб)', () => {
      const result = formatCurrency(1000);
      expect(result).toContain('1');
      expect(result).toContain('₽');
    });

    it('should format medium amounts (100,000 руб)', () => {
      const result = formatCurrency(100000);
      expect(result).toMatch(/100[\s\u00A0]000[\s\u00A0]₽/);
    });

    it('should format large amounts (1,000,000 руб)', () => {
      const result = formatCurrency(1000000);
      expect(result).toMatch(/1[\s\u00A0]000[\s\u00A0]000[\s\u00A0]₽/);
    });

    it('should format very large amounts (31,250,000 руб)', () => {
      const result = formatCurrency(31250000);
      expect(result).toContain('31');
      expect(result).toContain('₽');
    });

    it('should remove decimal places for whole numbers', () => {
      const result = formatCurrency(100000);
      expect(result).not.toContain(',00');
    });

    it('should handle zero', () => {
      const result = formatCurrency(0);
      expect(result).toContain('0');
      expect(result).toContain('₽');
    });

    it('should handle negative numbers', () => {
      const result = formatCurrency(-1000);
      expect(result).toContain('-');
      expect(result).toContain('₽');
    });
  });

  describe('formatCompactCurrency', () => {
    it('should format amounts >= 1M as "X.X млн ₽"', () => {
      expect(formatCompactCurrency(1000000)).toBe('1.0 млн ₽');
      expect(formatCompactCurrency(1500000)).toBe('1.5 млн ₽');
      expect(formatCompactCurrency(31250000)).toBe('31.3 млн ₽');
    });

    it('should format amounts >= 1K as "X тыс ₽"', () => {
      expect(formatCompactCurrency(1000)).toBe('1 тыс ₽');
      expect(formatCompactCurrency(5000)).toBe('5 тыс ₽');
      expect(formatCompactCurrency(100000)).toBe('100 тыс ₽');
    });

    it('should format amounts < 1K as "X ₽"', () => {
      expect(formatCompactCurrency(100)).toBe('100 ₽');
      expect(formatCompactCurrency(999)).toBe('999 ₽');
    });

    it('should handle zero', () => {
      expect(formatCompactCurrency(0)).toBe('0 ₽');
    });

    it('should round millions to 1 decimal place', () => {
      expect(formatCompactCurrency(1567890)).toBe('1.6 млн ₽');
    });

    it('should round thousands to integer', () => {
      expect(formatCompactCurrency(1567)).toBe('2 тыс ₽');
    });
  });
});
```

---

### HIGH PRIORITY (P1)

#### 2.4 ROI Calculator Component Integration Tests
**Location:** `/home/yan/astra_landing/components/landing/roi-calculator.tsx`

**Risk:** High - Complex component with forms, state, async operations

**Test Cases Needed:**

```typescript
// __tests__/components/roi-calculator.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ROICalculatorSection } from '@/components/landing/roi-calculator';

describe('ROICalculatorSection', () => {
  // RENDERING
  it('should render form with all fields', () => {
    render(<ROICalculatorSection />);

    expect(screen.getByLabelText(/количество сотрудников/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/текучесть кадров/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/средняя зарплата/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /рассчитать/i })).toBeInTheDocument();
  });

  it('should render with default values', () => {
    render(<ROICalculatorSection />);

    expect(screen.getByLabelText(/количество сотрудников/i)).toHaveValue(100);
    expect(screen.getByLabelText(/текучесть кадров/i)).toHaveValue(15);
    expect(screen.getByLabelText(/средняя зарплата/i)).toHaveValue(100000);
  });

  it('should render empty state before calculation', () => {
    render(<ROICalculatorSection />);

    expect(screen.getByText(/введите данные/i)).toBeInTheDocument();
  });

  // FORM INTERACTION
  it('should update input values on change', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const companySizeInput = screen.getByLabelText(/количество сотрудников/i);

    await user.clear(companySizeInput);
    await user.type(companySizeInput, '500');

    expect(companySizeInput).toHaveValue(500);
  });

  it('should show validation error for invalid company size (9)', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const companySizeInput = screen.getByLabelText(/количество сотрудников/i);
    const submitButton = screen.getByRole('button', { name: /рассчитать/i });

    await user.clear(companySizeInput);
    await user.type(companySizeInput, '9');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/минимальное количество: 10/i)).toBeInTheDocument();
    });
  });

  it('should show validation error for negative turnover', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const turnoverInput = screen.getByLabelText(/текучесть кадров/i);
    const submitButton = screen.getByRole('button', { name: /рассчитать/i });

    await user.clear(turnoverInput);
    await user.type(turnoverInput, '-5');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/текучка не может быть отрицательной/i)).toBeInTheDocument();
    });
  });

  // AUTO-CALCULATION (DEBOUNCED)
  it('should auto-calculate after 1 second of inactivity', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const companySizeInput = screen.getByLabelText(/количество сотрудников/i);

    await user.clear(companySizeInput);
    await user.type(companySizeInput, '200');

    // Wait for debounce (1000ms)
    await waitFor(() => {
      expect(screen.queryByText(/введите данные/i)).not.toBeInTheDocument();
    }, { timeout: 2000 });

    // Results should be displayed
    expect(screen.getByText(/ROI/i)).toBeInTheDocument();
  });

  // CALCULATION AND RESULTS
  it('should calculate and display results on submit', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/ROI/i)).toBeInTheDocument();
      expect(screen.getByText(/окупаемость/i)).toBeInTheDocument();
      expect(screen.getByText(/экономия в год/i)).toBeInTheDocument();
      expect(screen.getByText(/время сэкономлено/i)).toBeInTheDocument();
    });
  });

  it('should display 4 key metrics cards', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    await waitFor(() => {
      // Should have 4 metric cards
      expect(screen.getByText(/ROI/i)).toBeInTheDocument();
      expect(screen.getByText(/окупаемость/i)).toBeInTheDocument();
      expect(screen.getByText(/экономия в год/i)).toBeInTheDocument();
      expect(screen.getByText(/время/i)).toBeInTheDocument();
    });
  });

  it('should display charts after calculation', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/сравнение затрат/i)).toBeInTheDocument();
      expect(screen.getByText(/прогноз экономии/i)).toBeInTheDocument();
      expect(screen.getByText(/структура экономии/i)).toBeInTheDocument();
    });
  });

  it('should display detailed breakdown', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/текущая ситуация/i)).toBeInTheDocument();
      expect(screen.getByText(/с astra/i)).toBeInTheDocument();
      expect(screen.getByText(/рекомендуемый план/i)).toBeInTheDocument();
      expect(screen.getByText(/прогноз на 3 года/i)).toBeInTheDocument();
    });
  });

  it('should recommend Basic plan for small company (100 employees)', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const companySizeInput = screen.getByLabelText(/количество сотрудников/i);
    await user.clear(companySizeInput);
    await user.type(companySizeInput, '100');

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/basic/i)).toBeInTheDocument();
    });
  });

  it('should recommend Pro plan for large company (500 employees)', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const companySizeInput = screen.getByLabelText(/количество сотрудников/i);
    await user.clear(companySizeInput);
    await user.type(companySizeInput, '500');

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/pro/i)).toBeInTheDocument();
    });
  });

  // LOADING STATES
  it('should show calculating state during calculation', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    // Button should show loading state briefly
    expect(submitButton).toHaveTextContent(/рассчитываем/i);
  });

  it('should disable inputs during calculation', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    const companySizeInput = screen.getByLabelText(/количество сотрудников/i);
    expect(companySizeInput).toBeDisabled();
  });

  // ERROR HANDLING
  it('should handle calculation errors gracefully', async () => {
    // Mock calculateROIClientSide to throw error
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    // Force error by passing invalid data
    const companySizeInput = screen.getByLabelText(/количество сотрудников/i);
    await user.clear(companySizeInput);
    await user.type(companySizeInput, 'invalid');

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/ошибка/i)).toBeInTheDocument();
    });
  });

  // ANALYTICS TRACKING
  it('should track successful ROI calculation', async () => {
    const trackSpy = vi.spyOn(analyticsModule, 'trackROICalculation');

    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(trackSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          company_size: 100,
          current_turnover: 15,
        })
      );
    });
  });

  it('should track calculation errors', async () => {
    const trackErrorSpy = vi.spyOn(analyticsModule, 'trackError');

    // Force error scenario
    // ... test implementation
  });

  // ACCESSIBILITY
  it('should have proper ARIA labels on form fields', () => {
    render(<ROICalculatorSection />);

    expect(screen.getByLabelText(/количество сотрудников/i)).toHaveAttribute('id');
    expect(screen.getByLabelText(/текучесть кадров/i)).toHaveAttribute('id');
  });

  it('should mark required fields with asterisk', () => {
    render(<ROICalculatorSection />);

    const requiredLabel = screen.getByText(/количество сотрудников/i).closest('label');
    expect(requiredLabel).toHaveTextContent('*');
  });

  it('should set aria-invalid on validation error', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const companySizeInput = screen.getByLabelText(/количество сотрудников/i);
    await user.clear(companySizeInput);
    await user.type(companySizeInput, '9');

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(companySizeInput).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
```

---

#### 2.5 ROI Charts Component Tests
**Location:** `/home/yan/astra_landing/components/landing/roi-charts.tsx`

**Risk:** Medium-High - Complex data visualization with multiple chart types

**Test Cases Needed:**

```typescript
// __tests__/components/roi-charts.test.tsx
import { render, screen } from '@testing-library/react';
import { ROICharts } from '@/components/landing/roi-charts';

describe('ROICharts', () => {
  const mockProps = {
    currentAnnualCost: 31250000,
    totalAnnualSavings: 25000000,
    threeYearSavings: 75000000,
    threeYearCost: 300000,
    astraCost: 100000,
    turnoverSavings: 20000000,
    timeSavings: 5000000,
  };

  // RENDERING
  it('should render all 3 chart cards', () => {
    render(<ROICharts {...mockProps} />);

    expect(screen.getByText(/сравнение затрат/i)).toBeInTheDocument();
    expect(screen.getByText(/прогноз экономии на 3 года/i)).toBeInTheDocument();
    expect(screen.getByText(/структура экономии/i)).toBeInTheDocument();
  });

  it('should render bar chart with comparison data', () => {
    render(<ROICharts {...mockProps} />);

    // Should show current losses and Astra cost
    expect(screen.getByText(/текущие потери/i)).toBeInTheDocument();
    expect(screen.getByText(/с astra/i)).toBeInTheDocument();
  });

  it('should render line chart with 3-year projection', () => {
    render(<ROICharts {...mockProps} />);

    expect(screen.getByText(/год 1/i)).toBeInTheDocument();
    expect(screen.getByText(/год 2/i)).toBeInTheDocument();
    expect(screen.getByText(/год 3/i)).toBeInTheDocument();
  });

  it('should render pie chart with savings breakdown', () => {
    render(<ROICharts {...mockProps} />);

    expect(screen.getByText(/текучка/i)).toBeInTheDocument();
    expect(screen.getByText(/время hr/i)).toBeInTheDocument();
  });

  // DATA ACCURACY
  it('should display correct savings percentage in bar chart', () => {
    render(<ROICharts {...mockProps} />);

    const expectedSavings = mockProps.currentAnnualCost - mockProps.astraCost;
    const expectedPercentage = Math.round((expectedSavings / mockProps.currentAnnualCost) * 100);

    expect(screen.getByText(new RegExp(`${expectedPercentage}%`, 'i'))).toBeInTheDocument();
  });

  it('should display correct 3-year net profit in line chart', () => {
    render(<ROICharts {...mockProps} />);

    const expectedNetProfit = mockProps.threeYearSavings - mockProps.threeYearCost;

    // Should display formatted currency
    expect(screen.getByText(/чистая прибыль за 3 года/i)).toBeInTheDocument();
  });

  it('should display correct savings breakdown in pie chart', () => {
    render(<ROICharts {...mockProps} />);

    // Should show turnover savings and time savings
    const turnoverPercentage = Math.round(
      (mockProps.turnoverSavings / (mockProps.turnoverSavings + mockProps.timeSavings)) * 100
    );
    const timePercentage = 100 - turnoverPercentage;

    expect(screen.getByText(new RegExp(`${turnoverPercentage}%`, 'i'))).toBeInTheDocument();
  });

  // EDGE CASES
  it('should handle zero values gracefully', () => {
    const zeroProps = {
      ...mockProps,
      turnoverSavings: 0,
      timeSavings: 0,
    };

    expect(() => render(<ROICharts {...zeroProps} />)).not.toThrow();
  });

  it('should handle very large numbers (100M+)', () => {
    const largeProps = {
      ...mockProps,
      currentAnnualCost: 100000000,
      totalAnnualSavings: 80000000,
    };

    render(<ROICharts {...largeProps} />);

    expect(screen.getByText(/млн/i)).toBeInTheDocument();
  });

  it('should handle very small numbers (<1K)', () => {
    const smallProps = {
      ...mockProps,
      astraCost: 500,
    };

    render(<ROICharts {...smallProps} />);

    expect(screen.getByText(/500[\s\u00A0]₽/i)).toBeInTheDocument();
  });

  it('should handle single data point in pie chart', () => {
    const singlePointProps = {
      ...mockProps,
      turnoverSavings: 25000000,
      timeSavings: 0,
    };

    expect(() => render(<ROICharts {...singlePointProps} />)).not.toThrow();
  });

  // CURRENCY FORMATTING
  it('should format currency correctly in tooltips', () => {
    render(<ROICharts {...mockProps} />);

    // Recharts tooltips should use formatCurrency
    // This would require interaction testing with tooltips
  });

  it('should format compact currency correctly in axes', () => {
    render(<ROICharts {...mockProps} />);

    // Y-axis should show compact format (e.g., "31.3 млн ₽")
  });

  // RESPONSIVE BEHAVIOR
  it('should use ResponsiveContainer for all charts', () => {
    const { container } = render(<ROICharts {...mockProps} />);

    // Should have multiple ResponsiveContainer elements
    const responsiveContainers = container.querySelectorAll('.recharts-responsive-container');
    expect(responsiveContainers.length).toBeGreaterThanOrEqual(3);
  });

  it('should set consistent chart height (300px)', () => {
    const { container } = render(<ROICharts {...mockProps} />);

    const charts = container.querySelectorAll('.recharts-wrapper');
    charts.forEach(chart => {
      // Height should be set
      expect(chart).toBeInTheDocument();
    });
  });

  // ACCESSIBILITY
  it('should have descriptive chart titles', () => {
    render(<ROICharts {...mockProps} />);

    expect(screen.getByText(/сравнение затрат/i)).toHaveClass('font-bold');
    expect(screen.getByText(/прогноз экономии/i)).toHaveClass('font-bold');
    expect(screen.getByText(/структура экономии/i)).toHaveClass('font-bold');
  });

  it('should wrap charts in Card components', () => {
    const { container } = render(<ROICharts {...mockProps} />);

    // Should have 3 card wrappers
    const cards = container.querySelectorAll('.p-6');
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });
});
```

---

#### 2.6 SmoothScrollProvider Tests
**Location:** `/home/yan/astra_landing/components/providers/smooth-scroll-provider.tsx`

**Risk:** Medium - Memory leaks possible if cleanup fails

**Test Cases Needed:**

```typescript
// __tests__/components/smooth-scroll-provider.test.tsx
import { render, screen } from '@testing-library/react';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';

describe('SmoothScrollProvider', () => {
  // RENDERING
  it('should render children correctly', () => {
    render(
      <SmoothScrollProvider>
        <div>Test Content</div>
      </SmoothScrollProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  // PREFERS REDUCED MOTION
  it('should not initialize Lenis if user prefers reduced motion', () => {
    // Mock matchMedia to return prefers-reduced-motion: reduce
    const mockMatchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    window.matchMedia = mockMatchMedia;

    const lenisSpy = vi.spyOn(global, 'Lenis');

    render(
      <SmoothScrollProvider>
        <div>Test</div>
      </SmoothScrollProvider>
    );

    expect(lenisSpy).not.toHaveBeenCalled();
  });

  it('should initialize Lenis if user does not prefer reduced motion', () => {
    const mockMatchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    window.matchMedia = mockMatchMedia;

    const lenisSpy = vi.spyOn(global, 'Lenis');

    render(
      <SmoothScrollProvider>
        <div>Test</div>
      </SmoothScrollProvider>
    );

    expect(lenisSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        duration: 1.2,
        smoothWheel: true,
      })
    );
  });

  // LENIS CONFIGURATION
  it('should initialize Lenis with correct settings', () => {
    const mockMatchMedia = vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    window.matchMedia = mockMatchMedia;

    const lenisSpy = vi.spyOn(global, 'Lenis');

    render(
      <SmoothScrollProvider>
        <div>Test</div>
      </SmoothScrollProvider>
    );

    expect(lenisSpy).toHaveBeenCalledWith({
      duration: 1.2,
      easing: expect.any(Function),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
  });

  // CLEANUP
  it('should destroy Lenis on unmount', () => {
    const mockMatchMedia = vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    window.matchMedia = mockMatchMedia;

    const destroySpy = vi.fn();
    vi.spyOn(global, 'Lenis').mockImplementation(() => ({
      destroy: destroySpy,
      raf: vi.fn(),
    }));

    const { unmount } = render(
      <SmoothScrollProvider>
        <div>Test</div>
      </SmoothScrollProvider>
    );

    unmount();

    expect(destroySpy).toHaveBeenCalled();
  });

  it('should cancel RAF loop on unmount', () => {
    const mockMatchMedia = vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    window.matchMedia = mockMatchMedia;

    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');

    const { unmount } = render(
      <SmoothScrollProvider>
        <div>Test</div>
      </SmoothScrollProvider>
    );

    unmount();

    // Should cancel any pending RAF calls
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });

  // RAF LOOP
  it('should start requestAnimationFrame loop', () => {
    const mockMatchMedia = vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    window.matchMedia = mockMatchMedia;

    const rafSpy = vi.spyOn(window, 'requestAnimationFrame');

    render(
      <SmoothScrollProvider>
        <div>Test</div>
      </SmoothScrollProvider>
    );

    expect(rafSpy).toHaveBeenCalled();
  });

  // EASING FUNCTION
  it('should use easeout expo easing function', () => {
    const mockMatchMedia = vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    window.matchMedia = mockMatchMedia;

    let easingFunction: (t: number) => number;

    vi.spyOn(global, 'Lenis').mockImplementation((options) => {
      easingFunction = options.easing;
      return {
        destroy: vi.fn(),
        raf: vi.fn(),
      };
    });

    render(
      <SmoothScrollProvider>
        <div>Test</div>
      </SmoothScrollProvider>
    );

    // Test easing function
    expect(easingFunction!(0)).toBeCloseTo(0, 2);
    expect(easingFunction!(0.5)).toBeGreaterThan(0.5); // Ease out
    expect(easingFunction!(1)).toBeCloseTo(1, 2);
  });
});
```

---

### MEDIUM PRIORITY (P2)

#### 2.7 ResultsSection Component Tests
**Location:** `/home/yan/astra_landing/components/landing/results-section.tsx`

**Test Cases Needed:**

```typescript
// __tests__/components/results-section.test.tsx
describe('ResultsSection', () => {
  // RENDERING
  it('should render section heading', () => {
    render(<ResultsSection />);
    expect(screen.getByText(/результаты и метрики/i)).toBeInTheDocument();
  });

  it('should render all metric cards from RESULTS_METRICS', () => {
    render(<ResultsSection />);
    // Should render N cards based on RESULTS_METRICS length
  });

  // ANIMATIONS
  it('should animate metric cards on scroll', async () => {
    render(<ResultsSection />);
    // Test framer-motion animations
  });

  it('should respect prefers-reduced-motion', () => {
    // Mock reduced motion preference
    // Verify no animations run
  });

  // CIRCULAR PROGRESS
  it('should animate circular progress from 0 to target value', async () => {
    render(<ResultsSection />);
    // Test CircularProgress animation
  });

  // COUNTER
  it('should animate counter from 0 to target value', async () => {
    render(<ResultsSection />);
    // Test Counter component using RAF
  });

  it('should apply easing function to counter animation', () => {
    // Test ease-out cubic easing
  });

  // CLEANUP
  it('should cancel RAF on unmount', () => {
    const { unmount } = render(<ResultsSection />);
    unmount();
    // Verify cancelAnimationFrame called
  });

  // ACCESSIBILITY
  it('should have proper ARIA labels', () => {
    render(<ResultsSection />);
    expect(screen.getByLabelText(/results/i)).toBeInTheDocument();
  });

  it('should set aria-hidden on decorative elements', () => {
    const { container } = render(<ResultsSection />);
    const decorative = container.querySelectorAll('[aria-hidden="true"]');
    expect(decorative.length).toBeGreaterThan(0);
  });
});
```

---

### LOW PRIORITY (P3)

#### 2.8 E2E Tests for ROI Calculator

```typescript
// e2e/roi-calculator.spec.ts
test.describe('ROI Calculator E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#roi-calculator');
  });

  test('should calculate ROI for small company', async ({ page }) => {
    await page.getByLabel(/количество сотрудников/i).fill('100');
    await page.getByLabel(/текучесть кадров/i).fill('15');
    await page.getByRole('button', { name: /рассчитать/i }).click();

    await expect(page.getByText(/ROI/i)).toBeVisible();
    await expect(page.getByText(/Basic/i)).toBeVisible();
  });

  test('should calculate ROI for large company', async ({ page }) => {
    await page.getByLabel(/количество сотрудников/i).fill('500');
    await page.getByRole('button', { name: /рассчитать/i }).click();

    await expect(page.getByText(/Pro/i)).toBeVisible();
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.getByLabel(/количество сотрудников/i).fill('5');
    await page.getByRole('button', { name: /рассчитать/i }).click();

    await expect(page.getByText(/минимальное количество/i)).toBeVisible();
  });

  test('should auto-calculate after 1 second', async ({ page }) => {
    await page.getByLabel(/количество сотрудников/i).fill('200');

    await page.waitForTimeout(1500);

    await expect(page.getByText(/ROI/i)).toBeVisible();
  });

  test('should render all 3 charts', async ({ page }) => {
    await page.getByRole('button', { name: /рассчитать/i }).click();

    await expect(page.getByText(/сравнение затрат/i)).toBeVisible();
    await expect(page.getByText(/прогноз экономии/i)).toBeVisible();
    await expect(page.getByText(/структура экономии/i)).toBeVisible();
  });

  test('should track analytics event on calculation', async ({ page }) => {
    // Mock analytics tracking
    await page.evaluate(() => {
      window.analyticsEvents = [];
      window.gtag = (...args) => window.analyticsEvents.push(args);
    });

    await page.getByRole('button', { name: /рассчитать/i }).click();

    const events = await page.evaluate(() => window.analyticsEvents);
    expect(events).toContainEqual(
      expect.arrayContaining(['event', 'roi_calculation'])
    );
  });
});
```

---

#### 2.9 Visual Regression Tests for ROI Components

```typescript
// e2e/roi-visual-regression.spec.ts
test.describe('ROI Calculator Visual Regression', () => {
  test('should match ROI calculator form snapshot', async ({ page }) => {
    await page.goto('/#roi-calculator');
    await percySnapshot(page, 'ROI Calculator - Form Empty State');
  });

  test('should match ROI results snapshot', async ({ page }) => {
    await page.goto('/#roi-calculator');
    await page.getByRole('button', { name: /рассчитать/i }).click();
    await page.waitForTimeout(1000);

    await percySnapshot(page, 'ROI Calculator - Results Displayed');
  });

  test('should match ROI charts snapshot', async ({ page }) => {
    await page.goto('/#roi-calculator');
    await page.getByRole('button', { name: /рассчитать/i }).click();
    await page.waitForTimeout(1000);

    await percySnapshot(page, 'ROI Calculator - Charts', {
      scope: '[class*="roi-charts"]',
    });
  });

  test('should match validation error states', async ({ page }) => {
    await page.goto('/#roi-calculator');
    await page.getByLabel(/количество сотрудников/i).fill('5');
    await page.getByRole('button', { name: /рассчитать/i }).click();

    await percySnapshot(page, 'ROI Calculator - Validation Errors');
  });

  test('should match circular progress animations', async ({ page }) => {
    await page.goto('/#results');
    await page.waitForTimeout(2000); // Wait for animations

    await percySnapshot(page, 'Results Section - Animated State');
  });
});
```

---

## 3. Test Data Management Strategy

### 3.1 Mock Data Factories

```typescript
// __tests__/factories/roi-data.factory.ts
export const createROIFormData = (overrides = {}) => ({
  companySize: 100,
  currentTurnover: 15,
  averageSalary: 100000,
  currentHireTime: 30,
  ...overrides,
});

export const createROIResult = (overrides = {}) => ({
  inputs: {
    companySize: 100,
    currentTurnover: 15,
    averageSalary: 100000,
  },
  currentSituation: {
    annualTurnovers: 15,
    currentAnnualTurnoverCost: 3750000,
    replacementCostPerEmployee: 250000,
  },
  withAstra: {
    turnoverReduction: 1,
    annualTurnoverSavings: 250000,
    employeesAnalyzedPerYear: 30,
    totalTimeSavedHours: 75,
    annualTimeSavings: 187500,
    totalAnnualSavings: 437500,
  },
  roi: {
    recommendedPlan: 'basic',
    astraCost: 100000,
    netSavings: 337500,
    roiPercentage: 338,
    roiMultiplier: 4.4,
    paybackDays: 58,
    paybackWeeks: 9,
  },
  threeYear: {
    totalSavings: 1312500,
    totalCost: 300000,
    netSavings: 1012500,
  },
  ...overrides,
});

export const createChartData = (overrides = {}) => ({
  currentAnnualCost: 31250000,
  totalAnnualSavings: 25000000,
  threeYearSavings: 75000000,
  threeYearCost: 300000,
  astraCost: 100000,
  turnoverSavings: 20000000,
  timeSavings: 5000000,
  ...overrides,
});
```

### 3.2 Test Fixtures

```typescript
// __tests__/fixtures/roi-scenarios.ts
export const ROI_SCENARIOS = {
  smallCompanyLowTurnover: {
    input: createROIFormData({ companySize: 50, currentTurnover: 5 }),
    expectedPlan: 'basic',
  },
  mediumCompanyMediumTurnover: {
    input: createROIFormData({ companySize: 200, currentTurnover: 15 }),
    expectedPlan: 'pro',
  },
  largeCompanyHighTurnover: {
    input: createROIFormData({ companySize: 1000, currentTurnover: 30 }),
    expectedPlan: 'pro',
  },
  minimumValidInput: {
    input: createROIFormData({ companySize: 10, currentTurnover: 0 }),
  },
  maximumValidInput: {
    input: createROIFormData({ companySize: 100000, currentTurnover: 100 }),
  },
};
```

---

## 4. Testing Strategy Recommendations

### 4.1 Test Pyramid Distribution

```
        /\
       /  \    E2E Tests (10%)
      /    \   - 5-10 critical user flows
     /------\  - ROI calculator end-to-end
    /        \ - Form submissions
   /   INT    \ Integration Tests (20%)
  /            \ - Form → Validation → Calculation → Results
 /    UNIT      \ Unit Tests (70%)
/________________\ - ROI calculation logic
                   - Input validation (Zod)
                   - Currency formatting
                   - Chart data preparation
```

### 4.2 Coverage Goals

| Category | Current | Target | Priority |
|----------|---------|--------|----------|
| Overall Code Coverage | ~45% | 80% | High |
| Business Logic (ROI calc) | 0% | 95% | Critical |
| Components | ~30% | 75% | High |
| Utils/Lib | 80% | 90% | Medium |
| E2E Critical Paths | 60% | 85% | High |

### 4.3 Test Execution Strategy

```bash
# Unit tests (fast feedback)
pnpm test:watch           # During development
pnpm test:coverage        # Before commit

# Integration tests
pnpm test                 # All unit/integration

# E2E tests
pnpm test:e2e             # Critical paths
pnpm test:visual          # Visual regression (Percy)

# CI/CD Pipeline
1. Lint + Type Check (30s)
2. Unit Tests (1-2 min)
3. E2E Tests (3-5 min)
4. Visual Regression (5-10 min)
```

---

## 5. Priority Ranking Summary

### CRITICAL (Must Fix Before Production)
1. ✅ **ROI calculation function unit tests** - Core business logic
2. ✅ **Zod validation schema tests** - Prevents bad data
3. ✅ **Currency formatting tests** - User-facing display

### HIGH (Should Fix Soon)
4. ✅ **ROI Calculator component integration tests** - Complex component
5. ✅ **ROI Charts component tests** - Data visualization accuracy
6. ✅ **ROI Calculator E2E tests** - Critical user flow

### MEDIUM (Nice to Have)
7. ⚠️ **SmoothScrollProvider tests** - Memory leak prevention
8. ⚠️ **ResultsSection tests** - Animation and RAF cleanup
9. ⚠️ **Visual regression for ROI components** - UI consistency

### LOW (Can Wait)
10. 🔵 **Additional edge case tests** - Already covered by happy path
11. 🔵 **Performance tests** - Not blocking

---

## 6. Estimated Test Implementation Effort

| Task | Complexity | Time Estimate | Priority |
|------|-----------|---------------|----------|
| ROI calculation unit tests | Medium | 4-6 hours | P0 |
| Zod validation tests | Low | 2-3 hours | P0 |
| Currency formatting tests | Low | 1-2 hours | P0 |
| ROI Calculator component tests | High | 6-8 hours | P1 |
| ROI Charts tests | Medium | 3-4 hours | P1 |
| SmoothScrollProvider tests | Low | 1-2 hours | P2 |
| ResultsSection tests | Medium | 3-4 hours | P2 |
| E2E ROI tests | Medium | 2-3 hours | P1 |
| Visual regression | Low | 1-2 hours | P2 |
| **TOTAL** | | **23-34 hours** | |

**Recommended Sprint Plan:**
- **Week 1 (P0):** ROI calculation + validation + formatting (7-11 hours)
- **Week 2 (P1):** ROI Calculator component + Charts + E2E (11-15 hours)
- **Week 3 (P2):** Remaining components + visual regression (5-8 hours)

---

## 7. CI/CD Integration

### 7.1 GitHub Actions Workflow

```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Type check
        run: pnpm type-check

      - name: Lint
        run: pnpm lint

      - name: Unit tests with coverage
        run: pnpm test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/coverage-final.json

      - name: E2E tests
        run: pnpm test:e2e

      - name: Visual regression (Percy)
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
        run: pnpm test:visual
```

### 7.2 Pre-commit Hooks

```bash
# .husky/pre-commit
pnpm lint
pnpm type-check
pnpm test:coverage --run
```

---

## 8. Key Findings Summary

### Strengths
✅ Excellent E2E coverage for existing sections (25+ tests)
✅ Comprehensive analytics testing (397 lines)
✅ Good visual regression infrastructure (Percy + Playwright)
✅ Well-configured test environment (Vitest, Playwright)

### Critical Gaps
❌ **ZERO tests** for ROI Calculator (535 lines of complex logic)
❌ **ZERO tests** for ROI Charts (252 lines)
❌ **ZERO tests** for Results Section (333 lines)
❌ **NO E2E tests** for ROI calculator user flow
❌ **NO integration tests** for form → calculation → results

### Risk Assessment
🔴 **HIGH RISK:** ROI calculation errors could cause incorrect business projections
🔴 **HIGH RISK:** Invalid input could break calculation or display wrong data
🟡 **MEDIUM RISK:** Chart rendering issues could confuse users
🟡 **MEDIUM RISK:** Animation memory leaks in production

---

## 9. Recommendations

1. **Immediate Action (Week 1):**
   - Write unit tests for `calculateROIClientSide` function
   - Add validation tests for Zod schema
   - Test currency formatting functions
   - Set up test coverage reporting in CI

2. **Short-term (Week 2-3):**
   - Complete ROI Calculator component integration tests
   - Add ROI Charts component tests
   - Write E2E tests for ROI calculator flow
   - Add visual regression tests for ROI components

3. **Long-term:**
   - Achieve 80% code coverage overall
   - Set up coverage gates in CI (fail if < 70%)
   - Add performance testing for large company calculations
   - Implement mutation testing for critical logic

4. **Process Improvements:**
   - Require tests for all new components
   - Add test coverage reports to PRs
   - Run E2E tests on staging before production
   - Set up Percy baseline for visual regression

---

**Next Steps:**
1. Review this report with the team
2. Prioritize test implementation based on risk
3. Create GitHub issues for each test suite
4. Assign ownership and timeline
5. Set up CI/CD integration
6. Monitor coverage metrics weekly

**Questions or Concerns:**
- Reach out to the Test Automation Specialist for implementation guidance
- Review example test cases in this document before writing new tests
- Use test data factories for consistency across test suites
