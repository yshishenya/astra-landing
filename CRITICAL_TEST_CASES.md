# Critical Test Cases - Quick Reference

**Priority P0 Tests - Must Implement First**

These are the most critical test cases that MUST be written before production deployment.

---

## 1. ROI Calculation Function Tests

### File: `__tests__/lib/roi-calculations.test.ts`

#### Happy Path Tests

```typescript
import { calculateROIClientSide } from '@/components/landing/roi-calculator';

describe('calculateROIClientSide - Happy Path', () => {
  test('small company (100 employees, 15% turnover)', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 15,
      averageSalary: 100000,
      currentHireTime: 30,
    });

    // Verify basic calculations
    expect(result.currentSituation.annualTurnovers).toBe(15);
    expect(result.currentSituation.replacementCostPerEmployee).toBe(250000);
    expect(result.currentSituation.currentAnnualTurnoverCost).toBe(3750000);

    // Verify ROI
    expect(result.roi.recommendedPlan).toBe('basic');
    expect(result.roi.roiMultiplier).toBeGreaterThan(0);
    expect(result.roi.paybackDays).toBeLessThan(365);
  });

  test('large company (500 employees, 15% turnover)', () => {
    const result = calculateROIClientSide({
      companySize: 500,
      currentTurnover: 15,
      averageSalary: 150000,
    });

    expect(result.roi.recommendedPlan).toBe('pro');
    expect(result.withAstra.employeesAnalyzedPerYear).toBe(150);
  });
});
```

#### Edge Case Tests

```typescript
describe('calculateROIClientSide - Edge Cases', () => {
  test('minimum valid input (10 employees, 0% turnover)', () => {
    const result = calculateROIClientSide({
      companySize: 10,
      currentTurnover: 0,
      averageSalary: 30000,
    });

    expect(result.currentSituation.annualTurnovers).toBe(0);
    expect(result.withAstra.totalAnnualSavings).toBeGreaterThanOrEqual(0);
  });

  test('maximum valid input (100,000 employees, 100% turnover)', () => {
    const result = calculateROIClientSide({
      companySize: 100000,
      currentTurnover: 100,
      averageSalary: 100000,
    });

    expect(result.currentSituation.annualTurnovers).toBe(100000);
    expect(result.withAstra.employeesAnalyzedPerYear).toBe(500); // Capped
  });

  test('decimal turnover (15.5%)', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 15.5,
      averageSalary: 100000,
    });

    expect(result.currentSituation.annualTurnovers).toBe(16); // Rounded up
  });

  test('default salary (100,000) when not provided', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 15,
    });

    expect(result.inputs.averageSalary).toBe(100000);
  });

  test('employees analyzed capped at 500', () => {
    const result = calculateROIClientSide({
      companySize: 10000, // 10,000 * 0.3 = 3,000
      currentTurnover: 15,
    });

    expect(result.withAstra.employeesAnalyzedPerYear).toBe(500);
  });
});
```

#### Formula Accuracy Tests

```typescript
describe('calculateROIClientSide - Formula Accuracy', () => {
  test('replacement cost = salary * 2.5', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 10,
      averageSalary: 100000,
    });

    expect(result.currentSituation.replacementCostPerEmployee).toBe(250000);
  });

  test('turnover reduction = 7% of annual turnovers', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 20, // 20 turnovers per year
    });

    // 20 * 0.07 = 1.4 → rounded to 1
    expect(result.withAstra.turnoverReduction).toBe(1);
  });

  test('payback period calculation', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 15,
      averageSalary: 100000,
    });

    const dailySavings = result.withAstra.totalAnnualSavings / 250;
    const expectedPaybackDays = Math.ceil(result.roi.astraCost / dailySavings);

    expect(result.roi.paybackDays).toBe(expectedPaybackDays);
  });

  test('3-year projection', () => {
    const result = calculateROIClientSide({
      companySize: 100,
      currentTurnover: 15,
    });

    expect(result.threeYear.totalSavings).toBe(
      result.withAstra.totalAnnualSavings * 3
    );
    expect(result.threeYear.totalCost).toBe(result.roi.astraCost * 3);
    expect(result.threeYear.netSavings).toBe(
      result.threeYear.totalSavings - result.threeYear.totalCost
    );
  });
});
```

---

## 2. Zod Validation Schema Tests

### File: `__tests__/lib/roi-validation.test.ts`

#### Valid Input Tests

```typescript
import { roiSchema } from '@/components/landing/roi-calculator';

describe('roiSchema - Valid Inputs', () => {
  test('accepts minimum company size (10)', () => {
    expect(() => roiSchema.parse({
      companySize: 10,
      currentTurnover: 15,
    })).not.toThrow();
  });

  test('accepts maximum company size (100,000)', () => {
    expect(() => roiSchema.parse({
      companySize: 100000,
      currentTurnover: 15,
    })).not.toThrow();
  });

  test('accepts decimal turnover (15.5%)', () => {
    const result = roiSchema.parse({
      companySize: 100,
      currentTurnover: 15.5,
    });

    expect(result.currentTurnover).toBe(15.5);
  });

  test('rounds turnover to 2 decimals (15.567 → 15.57)', () => {
    const result = roiSchema.parse({
      companySize: 100,
      currentTurnover: 15.567,
    });

    expect(result.currentTurnover).toBe(15.57);
  });

  test('coerces string to number ("100" → 100)', () => {
    const result = roiSchema.parse({
      companySize: "100",
      currentTurnover: "15",
    });

    expect(typeof result.companySize).toBe('number');
    expect(result.companySize).toBe(100);
  });
});
```

#### Invalid Input Tests (CRITICAL)

```typescript
describe('roiSchema - Invalid Inputs', () => {
  test('rejects Infinity for company size', () => {
    expect(() => roiSchema.parse({
      companySize: Infinity,
      currentTurnover: 15,
    })).toThrow('Некорректное число');
  });

  test('rejects NaN for turnover', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: NaN,
    })).toThrow('Некорректное число');
  });

  test('rejects unsafe integers', () => {
    expect(() => roiSchema.parse({
      companySize: Number.MAX_SAFE_INTEGER + 1,
      currentTurnover: 15,
    })).toThrow('Число слишком большое');
  });

  test('rejects negative turnover', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: -5,
    })).toThrow('Текучка не может быть отрицательной');
  });

  test('rejects turnover > 100%', () => {
    expect(() => roiSchema.parse({
      companySize: 100,
      currentTurnover: 105,
    })).toThrow('Текучка не может быть больше 100%');
  });

  test('rejects company size < 10', () => {
    expect(() => roiSchema.parse({
      companySize: 9,
      currentTurnover: 15,
    })).toThrow('Минимальное количество: 10');
  });

  test('rejects company size > 100,000', () => {
    expect(() => roiSchema.parse({
      companySize: 100001,
      currentTurnover: 15,
    })).toThrow('Максимальное количество: 100000');
  });
});
```

---

## 3. Currency Formatting Tests

### File: `__tests__/lib/currency-formatting.test.ts`

```typescript
import { formatCurrency, formatCompactCurrency } from '@/components/landing/roi-calculator';

describe('formatCurrency', () => {
  test('formats 1,000 rubles', () => {
    const result = formatCurrency(1000);
    expect(result).toContain('1');
    expect(result).toContain('₽');
  });

  test('formats 100,000 rubles with spaces', () => {
    const result = formatCurrency(100000);
    expect(result).toMatch(/100[\s\u00A0]000/);
    expect(result).toContain('₽');
  });

  test('formats 1,000,000 rubles', () => {
    const result = formatCurrency(1000000);
    expect(result).toMatch(/1[\s\u00A0]000[\s\u00A0]000/);
  });

  test('removes decimal places for whole numbers', () => {
    const result = formatCurrency(100000);
    expect(result).not.toContain(',00');
  });

  test('handles zero', () => {
    const result = formatCurrency(0);
    expect(result).toContain('0');
    expect(result).toContain('₽');
  });
});

describe('formatCompactCurrency', () => {
  test('formats millions as "X.X млн ₽"', () => {
    expect(formatCompactCurrency(1000000)).toBe('1.0 млн ₽');
    expect(formatCompactCurrency(31250000)).toBe('31.3 млн ₽');
  });

  test('formats thousands as "X тыс ₽"', () => {
    expect(formatCompactCurrency(1000)).toBe('1 тыс ₽');
    expect(formatCompactCurrency(100000)).toBe('100 тыс ₽');
  });

  test('formats small amounts as "X ₽"', () => {
    expect(formatCompactCurrency(100)).toBe('100 ₽');
    expect(formatCompactCurrency(999)).toBe('999 ₽');
  });
});
```

---

## 4. E2E Critical Flow

### File: `e2e/roi-calculator.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('ROI Calculator E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#roi-calculator');
  });

  test('CRITICAL: calculates ROI for small company', async ({ page }) => {
    await page.getByLabel(/количество сотрудников/i).fill('100');
    await page.getByLabel(/текучесть кадров/i).fill('15');
    await page.getByLabel(/средняя зарплата/i).fill('100000');

    await page.getByRole('button', { name: /рассчитать/i }).click();

    // Verify results appear
    await expect(page.getByText(/ROI/i)).toBeVisible();
    await expect(page.getByText(/окупаемость/i)).toBeVisible();
    await expect(page.getByText(/Basic/i)).toBeVisible();

    // Verify charts render
    await expect(page.getByText(/сравнение затрат/i)).toBeVisible();
    await expect(page.getByText(/прогноз экономии/i)).toBeVisible();
    await expect(page.getByText(/структура экономии/i)).toBeVisible();
  });

  test('CRITICAL: shows validation error for invalid input', async ({ page }) => {
    await page.getByLabel(/количество сотрудников/i).fill('5');
    await page.getByRole('button', { name: /рассчитать/i }).click();

    await expect(page.getByText(/минимальное количество: 10/i)).toBeVisible();
  });

  test('CRITICAL: auto-calculates after debounce', async ({ page }) => {
    await page.getByLabel(/количество сотрудников/i).fill('200');

    // Wait for 1 second debounce
    await page.waitForTimeout(1500);

    // Results should appear automatically
    await expect(page.getByText(/ROI/i)).toBeVisible();
  });

  test('CRITICAL: recommends Pro plan for large company', async ({ page }) => {
    await page.getByLabel(/количество сотрудников/i).fill('500');
    await page.getByRole('button', { name: /рассчитать/i }).click();

    await expect(page.getByText(/Pro/i)).toBeVisible();
  });
});
```

---

## 5. Component Integration Tests

### File: `__tests__/components/roi-calculator.test.tsx`

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ROICalculatorSection } from '@/components/landing/roi-calculator';

describe('ROICalculatorSection - Critical Integration', () => {
  test('CRITICAL: renders form with default values', () => {
    render(<ROICalculatorSection />);

    expect(screen.getByLabelText(/количество сотрудников/i)).toHaveValue(100);
    expect(screen.getByLabelText(/текучесть кадров/i)).toHaveValue(15);
    expect(screen.getByLabelText(/средняя зарплата/i)).toHaveValue(100000);
  });

  test('CRITICAL: calculates and displays results', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/ROI/i)).toBeInTheDocument();
      expect(screen.getByText(/окупаемость/i)).toBeInTheDocument();
      expect(screen.getByText(/экономия в год/i)).toBeInTheDocument();
    });
  });

  test('CRITICAL: shows validation error for invalid company size', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const input = screen.getByLabelText(/количество сотрудников/i);
    await user.clear(input);
    await user.type(input, '9');

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/минимальное количество: 10/i)).toBeInTheDocument();
    });
  });

  test('CRITICAL: displays all 4 key metrics', async () => {
    const user = userEvent.setup();
    render(<ROICalculatorSection />);

    const submitButton = screen.getByRole('button', { name: /рассчитать/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/ROI/i)).toBeInTheDocument();
      expect(screen.getByText(/окупаемость/i)).toBeInTheDocument();
      expect(screen.getByText(/экономия/i)).toBeInTheDocument();
      expect(screen.getByText(/время/i)).toBeInTheDocument();
    });
  });
});
```

---

## Test Execution Commands

```bash
# Run all critical tests
pnpm test __tests__/lib/roi-calculations.test.ts
pnpm test __tests__/lib/roi-validation.test.ts
pnpm test __tests__/lib/currency-formatting.test.ts
pnpm test __tests__/components/roi-calculator.test.tsx

# Run E2E critical flow
pnpm test:e2e e2e/roi-calculator.spec.ts

# Run with coverage
pnpm test:coverage

# Watch mode during development
pnpm test --watch
```

---

## Definition of Done

A test is considered "done" when:

✅ Test passes consistently (no flakiness)
✅ Test covers both happy path and edge cases
✅ Test has clear, descriptive name
✅ Test uses proper assertions (expect statements)
✅ Test follows AAA pattern (Arrange, Act, Assert)
✅ Test is deterministic (no random data)
✅ Test runs in < 100ms (unit) or < 5s (E2E)
✅ Test is documented in this file

---

## Coverage Requirements

- **ROI Calculation Function:** 95% coverage (all formulas tested)
- **Zod Validation Schema:** 100% coverage (all edge cases)
- **Currency Formatting:** 90% coverage (all formats)
- **E2E Critical Flow:** 100% success rate (no failures)

---

**Priority:** CRITICAL (P0)
**Timeline:** Week 1
**Estimated Effort:** 7-11 hours
**Owner:** To be assigned

**Next:** After completing these critical tests, proceed to High Priority (P1) tests in the full assessment document.
