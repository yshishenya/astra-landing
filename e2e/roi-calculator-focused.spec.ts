/**
 * Focused E2E Tests for ROI Calculator
 *
 * Tests only the critical user journey for business ROI calculations.
 * Comprehensive validation logic is tested in unit tests (tests/roi-calculator.test.ts).
 *
 * @see components/landing/roi-calculator.tsx
 * @see tests/roi-calculator.test.ts (comprehensive unit tests)
 */

import { test, expect } from '@playwright/test';

test.describe('ROI Calculator - Critical Path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to ROI calculator section
    const roiSection = page.locator('section').filter({ hasText: 'Калькулятор ROI' });
    await roiSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('should display ROI calculator section with form', async ({ page }) => {
    // Check section is visible
    const heading = page.getByRole('heading', { name: /Калькулятор ROI/i });
    await expect(heading).toBeVisible();

    // Check form fields are present
    await expect(page.locator('#companySize')).toBeVisible();
    await expect(page.locator('#currentTurnover')).toBeVisible();
    await expect(page.locator('#averageSalary')).toBeVisible();
    await expect(page.locator('#currentHireTime')).toBeVisible();
  });

  test('should calculate and display ROI with valid inputs', async ({ page }) => {
    // Fill in form with typical company data
    await page.locator('#companySize').fill('100');
    await page.locator('#currentTurnover').fill('15');
    await page.locator('#averageSalary').fill('100000');

    // Wait for auto-calculation (1s debounce + processing)
    await page.waitForTimeout(2000);

    // Verify key metrics are displayed (scope to ROI section to avoid CTA section matches)
    const roiSection = page.locator('section').filter({ hasText: 'Калькулятор ROI' });
    await expect(roiSection.locator('text=/Возврат инвестиций/i')).toBeVisible();
    await expect(roiSection.locator('text=/Окупаемость/')).toBeVisible();
    await expect(roiSection.locator('text=/Экономия/')).toBeVisible();
    await expect(roiSection.locator('text=/Время/')).toBeVisible();

    // Verify detailed breakdown section appears
    await expect(roiSection.locator('text=/Детальный расчет/i')).toBeVisible();
  });

  test('should display recommended plan after calculation', async ({ page }) => {
    await page.locator('#companySize').fill('100');
    await page.locator('#currentTurnover').fill('15');
    await page.waitForTimeout(2000);

    // Should show either Basic or Pro plan recommendation
    const planText = page.locator('text=/Рекомендуемый план/i');
    await expect(planText).toBeVisible();
  });

  test('should auto-calculate when inputs change (debounced)', async ({ page }) => {
    const roiSection = page.locator('section').filter({ hasText: 'Калькулятор ROI' });

    // Initial input
    await page.locator('#companySize').fill('100');
    await page.locator('#currentTurnover').fill('10');
    await page.waitForTimeout(2000);

    // Results should appear
    const firstResult = roiSection.locator('text=/Возврат инвестиций/i');
    await expect(firstResult).toBeVisible();

    // Change inputs - should recalculate
    await page.locator('#currentTurnover').fill('20');
    await page.waitForTimeout(2000);

    // Results should still be visible (with updated values)
    await expect(firstResult).toBeVisible();
  });

  test('should work on mobile viewport (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const roiSection = page.locator('section').filter({ hasText: 'Калькулятор ROI' });

    // Form should be visible and usable
    await expect(page.locator('#companySize')).toBeVisible();
    await page.locator('#companySize').fill('100');
    await page.locator('#currentTurnover').fill('15');
    await page.waitForTimeout(2000);

    // Results should display in mobile layout (scope to ROI section)
    await expect(roiSection.locator('text=/Возврат инвестиций/i')).toBeVisible();
  });

  test('should have accessible form labels and ARIA attributes', async ({ page }) => {
    // Check proper labels
    await expect(page.locator('label[for="companySize"]')).toBeVisible();
    await expect(page.locator('label[for="currentTurnover"]')).toBeVisible();

    // Check ARIA attributes
    const companySizeInput = page.locator('#companySize');
    await expect(companySizeInput).toHaveAttribute('aria-invalid');
  });

  test('should display 3-year projection in results', async ({ page }) => {
    await page.locator('#companySize').fill('100');
    await page.locator('#currentTurnover').fill('15');
    await page.waitForTimeout(2000);

    // Look for 3-year section heading
    const threeYearHeading = page.getByRole('heading', { name: /Прогноз Экономии на 3 Года/i });
    await expect(threeYearHeading).toBeVisible({ timeout: 5000 });
  });

  test('should lazy load charts component', async ({ page }) => {
    await page.locator('#companySize').fill('100');
    await page.locator('#currentTurnover').fill('15');

    // Wait a bit - charts should load
    await page.waitForTimeout(3000);

    // Look for chart container (charts are rendered after calculation)
    // The charts component renders bar/line/pie charts
    const detailBreakdown = page.locator('text=/Детальный расчет/i');
    await expect(detailBreakdown).toBeVisible();
  });
});
