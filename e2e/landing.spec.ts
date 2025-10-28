import { test, expect } from '@playwright/test';

test.describe('Astra Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Astra/);
  });

  test('should display the header with navigation', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check logo/brand is visible
    const logo = header.getByText(/Astra/i);
    await expect(logo).toBeVisible();
  });

  test('should display hero section with headline and CTAs', async ({ page }) => {
    // Check hero headline
    const heroHeading = page.getByRole('heading', { level: 1 });
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('90 секунд');

    // Check stats cards
    const statsCards = page.locator('.glass-card');
    await expect(statsCards).toHaveCount(3);
  });

  test.describe('Trust Bar Section', () => {
    test('should display trust bar with social proof', async ({ page }) => {
      const trustBar = page.locator('section').filter({ hasText: 'Доверяют лидеры российского бизнеса' });
      await expect(trustBar).toBeVisible();

      // Check heading
      const heading = trustBar.locator('#trust-bar-heading');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Доверяют лидеры российского бизнеса');

      // Check trust stats are visible (3 stats)
      const stats = trustBar.locator('[role="list"] > div');
      await expect(stats).toHaveCount(3);
    });

    test('should animate trust stats on scroll', async ({ page }) => {
      const trustBar = page.locator('section').filter({ hasText: 'Доверяют лидеры российского бизнеса' });

      // Scroll to trust bar
      await trustBar.scrollIntoViewIfNeeded();

      // Wait for animations to complete
      await page.waitForTimeout(1000);

      // Check that stats are visible after animation
      const stats = trustBar.locator('[role="list"] > div');
      for (let i = 0; i < 3; i++) {
        await expect(stats.nth(i)).toBeVisible();
      }
    });
  });

  test.describe('Problem Section', () => {
    test('should display problem section with 3 pain points', async ({ page }) => {
      const problemSection = page.locator('section').filter({ hasText: 'Почему Ваши Лучшие Люди Уходят' });
      await expect(problemSection).toBeVisible();

      // Check section heading
      const heading = problemSection.locator('#problem-heading');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Почему Ваши Лучшие Люди Уходят');

      // Check 3 pain cards
      const painCards = problemSection.locator('.grid > div');
      await expect(painCards).toHaveCount(3);
    });

    test('should display pain card content correctly', async ({ page }) => {
      const problemSection = page.locator('section').filter({ hasText: 'Почему Ваши Лучшие Люди Уходят' });
      await problemSection.scrollIntoViewIfNeeded();

      const firstCard = problemSection.locator('.grid > div').first();

      // Check stat is visible
      await expect(firstCard.locator('.text-orange-600')).toBeVisible();

      // Check title is visible
      await expect(firstCard.locator('h3')).toBeVisible();

      // Check CTA link is visible and clickable
      const ctaLink = firstCard.locator('a');
      await expect(ctaLink).toBeVisible();
      await expect(ctaLink).toHaveAttribute('href');
    });

    test('should animate pain cards on scroll', async ({ page }) => {
      const problemSection = page.locator('section').filter({ hasText: 'Почему Ваши Лучшие Люди Уходят' });

      // Scroll to section
      await problemSection.scrollIntoViewIfNeeded();

      // Wait for animations
      await page.waitForTimeout(1500);

      // All cards should be visible
      const painCards = problemSection.locator('.grid > div');
      for (let i = 0; i < 3; i++) {
        await expect(painCards.nth(i)).toBeVisible();
      }
    });
  });

  test.describe('Solution Section', () => {
    test('should display solution section with 4 steps', async ({ page }) => {
      const solutionSection = page.locator('section#solution');
      await expect(solutionSection).toBeVisible();

      // Check section heading
      const heading = solutionSection.locator('#solution-heading');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Как Астра Выявляет Потенциал');

      // Check 4 step cards
      const stepCards = solutionSection.locator('[role="listitem"]');
      await expect(stepCards).toHaveCount(4);
    });

    test('should display step cards with numbers and content', async ({ page }) => {
      const solutionSection = page.locator('section#solution');
      await solutionSection.scrollIntoViewIfNeeded();

      // Check first step
      const firstStep = solutionSection.locator('[role="listitem"]').first();

      // Check number badge
      const badge = firstStep.locator('[aria-label="Шаг 1"]');
      await expect(badge).toBeVisible();
      await expect(badge).toContainText('1');

      // Check step has title
      await expect(firstStep.locator('h3')).toBeVisible();

      // Check step has description
      await expect(firstStep.locator('p')).toBeVisible();
    });

    test('should animate solution steps on scroll', async ({ page }) => {
      const solutionSection = page.locator('section#solution');

      // Scroll to section
      await solutionSection.scrollIntoViewIfNeeded();

      // Wait for animations
      await page.waitForTimeout(1500);

      // All steps should be visible
      const stepCards = solutionSection.locator('[role="listitem"]');
      for (let i = 0; i < 4; i++) {
        await expect(stepCards.nth(i)).toBeVisible();
      }
    });

    test('should have CTA button at the bottom', async ({ page }) => {
      const solutionSection = page.locator('section#solution');
      await solutionSection.scrollIntoViewIfNeeded();

      const ctaButton = solutionSection.getByRole('link', { name: /Начать Анализ/i });
      await expect(ctaButton).toBeVisible();
      await expect(ctaButton).toHaveAttribute('href', '#contact');
    });
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Check sections are still visible
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      const trustBar = page.locator('section').filter({ hasText: 'Доверяют лидеры российского бизнеса' });
      await trustBar.scrollIntoViewIfNeeded();
      await expect(trustBar).toBeVisible();

      const problemSection = page.locator('section').filter({ hasText: 'Почему Ваши Лучшие Люди Уходят' });
      await problemSection.scrollIntoViewIfNeeded();
      await expect(problemSection).toBeVisible();

      const solutionSection = page.locator('section#solution');
      await solutionSection.scrollIntoViewIfNeeded();
      await expect(solutionSection).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA labels', async ({ page }) => {
      // Check Trust Bar ARIA
      const trustBar = page.locator('[aria-labelledby="trust-bar-heading"]');
      await expect(trustBar).toBeVisible();

      // Check Problem Section ARIA
      const problemSection = page.locator('[aria-labelledby="problem-heading"]');
      await expect(problemSection).toBeVisible();

      // Check Solution Section ARIA
      const solutionSection = page.locator('[aria-labelledby="solution-heading"]');
      await expect(solutionSection).toBeVisible();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      // H1 in hero
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toHaveCount(1);

      // H2 section headings (at least 3 sections)
      const h2Headings = page.getByRole('heading', { level: 2 });
      const h2Count = await h2Headings.count();
      expect(h2Count).toBeGreaterThanOrEqual(3);

      // H3 for cards (at least in problem cards)
      const h3Headings = page.getByRole('heading', { level: 3 });
      const h3Count = await h3Headings.count();
      expect(h3Count).toBeGreaterThanOrEqual(3);
    });
  });
});
