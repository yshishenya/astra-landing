import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

/**
 * Visual Regression Tests
 * Uses Percy to capture and compare visual snapshots across browsers
 */
test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for fonts and animations to load
    await page.waitForLoadState('networkidle');
  });

  test.describe('Features Section - Color Themes', () => {
    test('should match color theme snapshots for all 6 feature cards', async ({ page }) => {
      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();

      // Wait for scroll animations to complete
      await page.waitForTimeout(1500);

      // Take full page snapshot including Features section
      await percySnapshot(page, 'Features Section - All Color Themes', {
        widths: [375, 768, 1280, 1920], // Mobile, Tablet, Desktop, Wide Desktop
        minHeight: 1024,
      });
    });

    test('should match individual feature card color themes', async ({ page }) => {
      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      const featureCards = featuresSection.locator('.grid > div');
      const colorNames = ['Green', 'Blue', 'Purple', 'Orange', 'Teal', 'Indigo'];

      // Capture each card individually to ensure color accuracy
      for (let i = 0; i < 6; i++) {
        const card = featureCards.nth(i);
        await card.scrollIntoViewIfNeeded();

        // Hover to capture hover state as well
        await card.hover();
        await percySnapshot(page, `Feature Card ${i + 1} - ${colorNames[i]} Theme (Hover)`, {
          scope: '#features',
          widths: [768, 1280],
        });

        // Reset hover state
        await page.mouse.move(0, 0);
        await page.waitForTimeout(300);
      }
    });

    test('should match color contrast in light mode', async ({ page }) => {
      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await percySnapshot(page, 'Features Section - Color Contrast Light Mode', {
        scope: '#features',
        widths: [1280],
      });
    });
  });

  test.describe('Full Landing Page', () => {
    test('should match hero section snapshot', async ({ page }) => {
      await percySnapshot(page, 'Hero Section', {
        widths: [375, 768, 1280, 1920],
        minHeight: 900,
      });
    });

    test('should match trust bar snapshot', async ({ page }) => {
      const trustBar = page.locator('.bg-white.py-8').first();
      await trustBar.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);

      await percySnapshot(page, 'Trust Bar', {
        scope: '.bg-white.py-8',
        widths: [375, 768, 1280],
      });
    });

    test('should match problem section snapshot', async ({ page }) => {
      const problemSection = page.locator('section').filter({ hasText: 'Проблемы HR' });
      await problemSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await percySnapshot(page, 'Problem Section', {
        widths: [375, 768, 1280],
      });
    });

    test('should match solution section snapshot', async ({ page }) => {
      const solutionSection = page.locator('section').filter({ hasText: 'Как работает Astra' });
      await solutionSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await percySnapshot(page, 'Solution Section', {
        widths: [375, 768, 1280],
      });
    });

    test('should match complete landing page', async ({ page }) => {
      // Scroll to bottom to load all lazy content
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);

      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      await percySnapshot(page, 'Complete Landing Page', {
        widths: [375, 768, 1280, 1920],
        minHeight: 2000,
        enableJavaScript: true,
      });
    });
  });

  test.describe('Responsive Design', () => {
    test('should match mobile viewport (375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await percySnapshot(page, 'Features Section - Mobile 375px', {
        widths: [375],
      });
    });

    test('should match tablet viewport (768px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await percySnapshot(page, 'Features Section - Tablet 768px', {
        widths: [768],
      });
    });

    test('should match desktop viewport (1280px)', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });

      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await percySnapshot(page, 'Features Section - Desktop 1280px', {
        widths: [1280],
      });
    });

    test('should match wide desktop viewport (1920px)', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await percySnapshot(page, 'Features Section - Wide Desktop 1920px', {
        widths: [1920],
      });
    });
  });

  test.describe('Animation States', () => {
    test('should match features before animation', async ({ page }) => {
      const featuresSection = page.locator('section#features');

      // Navigate to section but don't scroll into view yet
      await page.evaluate(() => {
        const section = document.querySelector('section#features');
        if (section) {
          // Position section just below viewport
          window.scrollTo(0, section.getBoundingClientRect().top - window.innerHeight - 100);
        }
      });

      await percySnapshot(page, 'Features Section - Before Animation', {
        scope: '#features',
        widths: [1280],
      });
    });

    test('should match features after animation', async ({ page }) => {
      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();

      // Wait for all animations to complete
      await page.waitForTimeout(2000);

      await percySnapshot(page, 'Features Section - After Animation', {
        scope: '#features',
        widths: [1280],
      });
    });
  });
});
