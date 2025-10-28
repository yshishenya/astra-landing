import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests with Playwright (No Percy Required)
 * Uses Playwright's built-in screenshot comparison
 */
test.describe('Visual Regression Tests (Playwright)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Features Section - Color Themes', () => {
    test('should match color theme snapshots for all 6 feature cards', async ({ page }) => {
      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      // Take snapshot of features section
      await expect(featuresSection).toHaveScreenshot('features-section-all-color-themes.png');
    });

    test('should match individual feature card color themes', async ({ page }) => {
      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      const featureCards = featuresSection.locator('.grid > div');
      const colorNames = ['Green', 'Blue', 'Purple', 'Orange', 'Teal', 'Indigo'];

      // Capture each card individually
      for (let i = 0; i < 6; i++) {
        const card = featureCards.nth(i);
        await card.scrollIntoViewIfNeeded();
        await card.hover();

        await expect(card).toHaveScreenshot(`feature-card-${i + 1}-${colorNames[i]}-theme-hover.png`);

        // Reset hover
        await page.mouse.move(0, 0);
        await page.waitForTimeout(300);
      }
    });

    test('should match color contrast in light mode', async ({ page }) => {
      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await expect(featuresSection).toHaveScreenshot('features-section-color-contrast-light-mode.png');
    });
  });

  test.describe('Full Landing Page', () => {
    test('should match hero section snapshot', async ({ page }) => {
      await expect(page).toHaveScreenshot('hero-section.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });

    test('should match trust bar snapshot', async ({ page }) => {
      const trustBar = page.locator('.bg-white.py-8').first();
      await trustBar.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);

      await expect(trustBar).toHaveScreenshot('trust-bar.png');
    });

    test('should match problem section snapshot', async ({ page }) => {
      const problemSection = page.locator('section').filter({ hasText: 'Проблемы HR' });
      await problemSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await expect(problemSection).toHaveScreenshot('problem-section.png');
    });

    test('should match solution section snapshot', async ({ page }) => {
      const solutionSection = page.locator('section').filter({ hasText: 'Как работает Astra' });
      await solutionSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await expect(solutionSection).toHaveScreenshot('solution-section.png');
    });

    test('should match complete landing page', async ({ page }) => {
      // Scroll to bottom to load all lazy content
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);

      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('complete-landing-page.png', {
        fullPage: true,
        maxDiffPixels: 500,
      });
    });
  });

  test.describe('Responsive Design', () => {
    test('should match mobile viewport (375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await expect(featuresSection).toHaveScreenshot('features-section-mobile-375px.png');
    });

    test('should match tablet viewport (768px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await expect(featuresSection).toHaveScreenshot('features-section-tablet-768px.png');
    });

    test('should match desktop viewport (1280px)', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });

      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await expect(featuresSection).toHaveScreenshot('features-section-desktop-1280px.png');
    });

    test('should match wide desktop viewport (1920px)', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await expect(featuresSection).toHaveScreenshot('features-section-wide-desktop-1920px.png');
    });
  });

  test.describe('Animation States', () => {
    test('should match features before animation', async ({ page }) => {
      const featuresSection = page.locator('section#features');

      // Position section just below viewport
      await page.evaluate(() => {
        const section = document.querySelector('section#features');
        if (section) {
          window.scrollTo(0, section.getBoundingClientRect().top - window.innerHeight - 100);
        }
      });

      await expect(featuresSection).toHaveScreenshot('features-section-before-animation.png');
    });

    test('should match features after animation', async ({ page }) => {
      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(2000);

      await expect(featuresSection).toHaveScreenshot('features-section-after-animation.png');
    });
  });
});

