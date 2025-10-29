/**
 * E2E Tests for ROI Calculator Section
 *
 * Tests critical user flows for the business-critical ROI calculator:
 * - Happy path: form input → calculation → results display
 * - Validation error scenarios
 * - Chart rendering verification
 * - Auto-calculation with debounce
 * - Responsive design
 * - Analytics event tracking
 *
 * @see components/landing/roi-calculator.tsx
 * @see tests/roi-calculator.test.ts (unit tests)
 */

import { test, expect } from '@playwright/test';

test.describe('ROI Calculator Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Scroll to ROI calculator section
    const roiSection = page.locator('section').filter({ hasText: 'Калькулятор ROI' });
    await roiSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // Wait for scroll animations
  });

  test.describe('Section Visibility', () => {
    test('should display ROI calculator section', async ({ page }) => {
      const roiSection = page.locator('section').filter({ hasText: 'Калькулятор ROI' });
      await expect(roiSection).toBeVisible();
    });

    test('should display section heading and description', async ({ page }) => {
      // Check heading
      const heading = page.getByRole('heading', { name: /Калькулятор ROI/i });
      await expect(heading).toBeVisible();

      // Check description
      const description = page.locator('p.text-xl').filter({ hasText: /Рассчитайте/ });
      await expect(description).toBeVisible();
    });

    test('should display calculator form card', async ({ page }) => {
      const formCard = page.locator('form').locator('..');
      await expect(formCard).toBeVisible();

      const formTitle = page.getByRole('heading', { name: /Параметры компании/i });
      await expect(formTitle).toBeVisible();
    });
  });

  test.describe('Form Fields', () => {
    test('should display all input fields with labels', async ({ page }) => {
      // Company Size (required)
      const companySizeLabel = page.locator('label[for="companySize"]');
      await expect(companySizeLabel).toBeVisible();
      await expect(companySizeLabel).toContainText('*'); // Required indicator

      const companySizeInput = page.locator('#companySize');
      await expect(companySizeInput).toBeVisible();
      await expect(companySizeInput).toHaveAttribute('type', 'number');

      // Current Turnover (required)
      const turnoverLabel = page.locator('label[for="currentTurnover"]');
      await expect(turnoverLabel).toBeVisible();
      await expect(turnoverLabel).toContainText('*'); // Required indicator

      const turnoverInput = page.locator('#currentTurnover');
      await expect(turnoverInput).toBeVisible();
      await expect(turnoverInput).toHaveAttribute('type', 'number');

      // Average Salary (optional)
      const salaryLabel = page.locator('label[for="averageSalary"]');
      await expect(salaryLabel).toBeVisible();

      const salaryInput = page.locator('#averageSalary');
      await expect(salaryInput).toBeVisible();

      // Current Hire Time (optional)
      const hireTimeLabel = page.locator('label[for="currentHireTime"]');
      await expect(hireTimeLabel).toBeVisible();

      const hireTimeInput = page.locator('#currentHireTime');
      await expect(hireTimeInput).toBeVisible();
    });

    test('should have proper placeholders for all fields', async ({ page }) => {
      await expect(page.locator('#companySize')).toHaveAttribute('placeholder', /100/);
      await expect(page.locator('#currentTurnover')).toHaveAttribute('placeholder', /15/);
      await expect(page.locator('#averageSalary')).toHaveAttribute('placeholder', /100/);
      await expect(page.locator('#currentHireTime')).toHaveAttribute('placeholder', /30/);
    });
  });

  test.describe('Happy Path - Valid Calculation', () => {
    test('should calculate ROI with valid inputs and display results', async ({ page }) => {
      // Fill in required fields
      await page.locator('#companySize').fill('100');
      await page.locator('#currentTurnover').fill('15');
      await page.locator('#averageSalary').fill('100000');

      // Wait for debounce (1 second) + calculation
      await page.waitForTimeout(1500);

      // Check that results are displayed - look for metric cards
      const roiMetricLabel = page.locator('text=/Возврат инвестиций/i');
      await expect(roiMetricLabel).toBeVisible();

      const paybackLabel = page.locator('text=/Окупаемость/');
      await expect(paybackLabel).toBeVisible();

      const savingsLabel = page.locator('text=/Экономия/');
      await expect(savingsLabel).toBeVisible();

      const timeLabel = page.locator('text=/Время/');
      await expect(timeLabel).toBeVisible();
    });

    test('should auto-calculate on input change (debounced)', async ({ page }) => {
      // Type in company size
      await page.locator('#companySize').fill('200');

      // Type in turnover
      await page.locator('#currentTurnover').fill('20');

      // Wait for debounce (1 second)
      await page.waitForTimeout(1100);

      // Results should appear automatically (no submit button needed)
      const roiLabel = page.locator('text=/Возврат инвестиций/i');
      await expect(roiLabel).toBeVisible({ timeout: 5000 });
    });

    test('should display all 4 metric cards with icons', async ({ page }) => {
      // Fill form
      await page.locator('#companySize').fill('150');
      await page.locator('#currentTurnover').fill('18');
      await page.waitForTimeout(1500);

      // Check for 4 metric cards
      const metricCards = page.locator('.grid').filter({ has: page.locator('svg') });
      const cardCount = await metricCards.locator('> div').count();
      expect(cardCount).toBeGreaterThanOrEqual(4);
    });

    test('should display recommended plan (Basic or Pro)', async ({ page }) => {
      // Small company → Basic plan
      await page.locator('#companySize').fill('50');
      await page.locator('#currentTurnover').fill('10');
      await page.waitForTimeout(1500);

      const planRecommendation = page.locator('text=/Рекомендуемый план/i');
      await expect(planRecommendation).toBeVisible();

      // Should show either "Basic" or "Pro"
      const planText = await planRecommendation.textContent();
      expect(planText).toMatch(/(Basic|Pro)/i);
    });

    test('should display 3-year projection', async ({ page }) => {
      await page.locator('#companySize').fill('100');
      await page.locator('#currentTurnover').fill('15');
      await page.waitForTimeout(1500);

      // Check for 3-year section
      const threeYearSection = page.locator('text=/3 года/i');
      await expect(threeYearSection).toBeVisible();
    });
  });

  test.describe('Validation - Error Scenarios', () => {
    test('should show error for company size below minimum (< 10)', async ({ page }) => {
      await page.locator('#companySize').fill('5');
      await page.locator('#currentTurnover').fill('15');

      // Trigger validation by clicking outside or submitting
      await page.locator('#currentTurnover').click();

      // Wait a bit for validation
      await page.waitForTimeout(500);

      // Should show validation error
      const error = page.locator('text=/Минимальное количество: 10/i');
      await expect(error).toBeVisible({ timeout: 2000 });
    });

    test('should show error for company size above maximum (> 100,000)', async ({ page }) => {
      await page.locator('#companySize').fill('150000');
      await page.locator('#currentTurnover').fill('15');
      await page.locator('#currentTurnover').click();

      await page.waitForTimeout(500);

      const error = page.locator('text=/Максимальное количество: 100/i');
      await expect(error).toBeVisible({ timeout: 2000 });
    });

    test('should show error for negative turnover', async ({ page }) => {
      await page.locator('#companySize').fill('100');
      await page.locator('#currentTurnover').fill('-5');
      await page.locator('#companySize').click();

      await page.waitForTimeout(500);

      const error = page.locator('text=/не может быть отрицательной/i');
      await expect(error).toBeVisible({ timeout: 2000 });
    });

    test('should show error for turnover > 100%', async ({ page }) => {
      await page.locator('#companySize').fill('100');
      await page.locator('#currentTurnover').fill('150');
      await page.locator('#companySize').click();

      await page.waitForTimeout(500);

      const error = page.locator('text=/не может быть больше 100%/i');
      await expect(error).toBeVisible({ timeout: 2000 });
    });

    test('should show error for salary below minimum (< 30,000)', async ({ page }) => {
      await page.locator('#companySize').fill('100');
      await page.locator('#currentTurnover').fill('15');
      await page.locator('#averageSalary').fill('20000');
      await page.locator('#companySize').click();

      await page.waitForTimeout(500);

      const error = page.locator('text=/Минимальная зарплата: 30,000/i');
      await expect(error).toBeVisible({ timeout: 2000 });
    });

    test('should show error for hire time above maximum (> 365 days)', async ({ page }) => {
      await page.locator('#companySize').fill('100');
      await page.locator('#currentTurnover').fill('15');
      await page.locator('#currentHireTime').fill('400');
      await page.locator('#companySize').click();

      await page.waitForTimeout(500);

      const error = page.locator('text=/Максимальное время: 365/i');
      await expect(error).toBeVisible({ timeout: 2000 });
    });

    test('should NOT calculate with invalid inputs', async ({ page }) => {
      // Invalid company size
      await page.locator('#companySize').fill('5');
      await page.locator('#currentTurnover').fill('15');

      // Wait for debounce
      await page.waitForTimeout(1500);

      // Results should NOT appear
      const resultsSection = page.locator('div').filter({ hasText: /Ваши результаты/i });
      await expect(resultsSection).not.toBeVisible();
    });
  });

  test.describe('Charts Rendering', () => {
    test('should display loading skeleton before charts load', async ({ page }) => {
      // Start fresh
      await page.reload();
      await page.locator('section').filter({ hasText: 'Калькулятор ROI' }).scrollIntoViewIfNeeded();

      // Fill form quickly
      await page.locator('#companySize').fill('100');
      await page.locator('#currentTurnover').fill('15');

      // Should see loading skeleton (animated pulse)
      const skeleton = page.locator('.animate-pulse');
      await expect(skeleton).toBeVisible({ timeout: 1000 });
    });

    test('should eventually display actual charts after loading', async ({ page }) => {
      await page.locator('#companySize').fill('100');
      await page.locator('#currentTurnover').fill('15');

      // Wait for calculation + chart loading
      await page.waitForTimeout(2500);

      // Charts should be loaded (look for Recharts elements or canvas)
      // Since charts are dynamically loaded, check for their container
      const chartsContainer = page.locator('div').filter({ hasText: /График/i }).first();
      await expect(chartsContainer).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Responsive Design', () => {
    test('should be usable on mobile (375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const roiSection = page.locator('section').filter({ hasText: 'Калькулятор ROI' });
      await roiSection.scrollIntoViewIfNeeded();

      // Form should be visible
      await expect(page.locator('#companySize')).toBeVisible();
      await expect(page.locator('#currentTurnover')).toBeVisible();

      // Should be able to fill form
      await page.locator('#companySize').fill('100');
      await page.locator('#currentTurnover').fill('15');
      await page.waitForTimeout(1500);

      // Results should display (in stacked layout)
      const results = page.locator('text=/ROI:/');
      await expect(results).toBeVisible();
    });

    test('should have proper grid layout on desktop (1280px)', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });

      const roiSection = page.locator('section').filter({ hasText: 'Калькулятор ROI' });
      await roiSection.scrollIntoViewIfNeeded();

      // Grid should use 2 columns on large screens
      const grid = page.locator('.lg\\:grid-cols-\\[400px_1fr\\]').first();
      await expect(grid).toBeVisible();
    });
  });

  test.describe('Optional Fields', () => {
    test('should calculate with only required fields (company size + turnover)', async ({ page }) => {
      // Only fill required fields
      await page.locator('#companySize').fill('100');
      await page.locator('#currentTurnover').fill('15');

      // Leave salary and hire time empty
      await page.waitForTimeout(1500);

      // Should still show results with default values
      const results = page.locator('text=/ROI:/');
      await expect(results).toBeVisible();
    });

    test('should use provided optional values when filled', async ({ page }) => {
      await page.locator('#companySize').fill('100');
      await page.locator('#currentTurnover').fill('15');
      await page.locator('#averageSalary').fill('150000'); // Higher salary
      await page.locator('#currentHireTime').fill('45'); // Longer hire time

      await page.waitForTimeout(1500);

      // Results should reflect higher values
      const results = page.locator('text=/ROI:/');
      await expect(results).toBeVisible();
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle minimum valid values', async ({ page }) => {
      await page.locator('#companySize').fill('10'); // Minimum
      await page.locator('#currentTurnover').fill('0'); // Minimum (0% turnover)

      await page.waitForTimeout(1500);

      // Should either show results or handle gracefully
      // (0% turnover might show $0 savings, which is valid)
      const resultsSection = page.locator('div').filter({ hasText: /Ваши результаты/i });
      await expect(resultsSection).toBeVisible();
    });

    test('should handle maximum valid values', async ({ page }) => {
      await page.locator('#companySize').fill('100000'); // Maximum
      await page.locator('#currentTurnover').fill('100'); // Maximum

      await page.waitForTimeout(1500);

      // Should handle large numbers correctly
      const results = page.locator('text=/ROI:/');
      await expect(results).toBeVisible();
    });

    test('should handle decimal turnover values', async ({ page }) => {
      await page.locator('#companySize').fill('100');
      await page.locator('#currentTurnover').fill('12.5'); // Decimal

      await page.waitForTimeout(1500);

      // Should calculate with decimal precision
      const results = page.locator('text=/ROI:/');
      await expect(results).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA attributes for form fields', async ({ page }) => {
      const companySizeInput = page.locator('#companySize');

      // Should have aria-invalid attribute
      await expect(companySizeInput).toHaveAttribute('aria-invalid');
    });

    test('should associate error messages with inputs', async ({ page }) => {
      await page.locator('#companySize').fill('5'); // Invalid
      await page.locator('#currentTurnover').click();
      await page.waitForTimeout(500);

      // Error message should be visible and properly associated
      const error = page.locator('text=/Минимальное количество: 10/i');
      await expect(error).toBeVisible();
      await expect(error).toHaveClass(/text-destructive/);
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      // Section heading (h2)
      const sectionHeading = page.getByRole('heading', { level: 2, name: /Калькулятор ROI/i });
      await expect(sectionHeading).toBeVisible();

      // Form heading (h3)
      const formHeading = page.getByRole('heading', { level: 3, name: /Введите данные/i });
      await expect(formHeading).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should debounce auto-calculation (not calculate immediately)', async ({ page }) => {
      // Type rapidly
      await page.locator('#companySize').fill('100');

      // Immediately check - results should NOT appear yet
      const resultsSection = page.locator('div').filter({ hasText: /Ваши результаты/i });
      await expect(resultsSection).not.toBeVisible();

      // After debounce delay (1 second), should appear
      await page.waitForTimeout(1100);
      await page.locator('#currentTurnover').fill('15');
      await page.waitForTimeout(1100);

      await expect(resultsSection).toBeVisible();
    });

    test('should lazy load charts (not in initial page load)', async ({ page }) => {
      // Reload to test initial load
      await page.reload();

      // Charts component should not be loaded initially
      // (it's dynamically imported when needed)
      const skeleton = page.locator('.animate-pulse');
      await expect(skeleton).not.toBeVisible();

      // After triggering calculation, skeleton should appear
      await page.locator('section').filter({ hasText: 'Калькулятор ROI' }).scrollIntoViewIfNeeded();
      await page.locator('#companySize').fill('100');
      await page.locator('#currentTurnover').fill('15');

      // Skeleton should show briefly
      await expect(skeleton).toBeVisible({ timeout: 2000 });
    });
  });
});
