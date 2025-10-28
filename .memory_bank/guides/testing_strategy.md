# Testing Strategy - Astra Landing Page

**Last Updated:** 2025-10-29
**Status:** E2E + Visual Testing Implemented ✅
**Framework:** Playwright 1.56.1

---

## Testing Philosophy

For marketing landing pages, our testing focuses on:

1. **Visual Regression Testing (60%)** - Ensure design consistency across browsers and viewports
2. **E2E Testing (30%)** - Validate critical user flows and interactions
3. **Unit Testing (10%)** - Test complex utility functions only

This differs from traditional apps because landing pages are primarily about **visual presentation** and **user conversion**, not complex business logic.

---

## E2E Testing with Playwright

### Why Playwright?

- **Multi-browser support:** Chrome, Firefox, Safari (WebKit)
- **Fast execution:** Parallel test runs
- **Modern API:** Async/await, auto-waiting
- **Mobile testing:** Device emulation built-in
- **Debugging tools:** Trace viewer, codegen, inspector
- **TypeScript native:** Full type safety

### Test Structure

All E2E tests are in `e2e/` directory:

```
e2e/
├── landing.spec.ts                      # Main E2E tests
└── visual-regression-playwright.spec.ts # Visual tests (Playwright screenshots)
```

### Writing E2E Tests

**AAA Pattern (Arrange-Act-Assert):**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    // Arrange: Navigate to page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display hero headline and CTA buttons', async ({ page }) => {
    // Assert: Verify elements are visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('button', { name: /демо/i })).toBeVisible();

    // Act: Click CTA
    await page.getByRole('button', { name: /демо/i }).click();

    // Assert: Dialog opened
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});
```

### Testing Responsive Design

```typescript
test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 800 },
  ];

  for (const viewport of viewports) {
    test(`should render correctly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      const featuresSection = page.locator('section#features');
      await featuresSection.scrollIntoViewIfNeeded();
      await expect(featuresSection).toBeVisible();
    });
  }
});
```

### Testing Forms

```typescript
test.describe('Contact Form', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/');

    // Open contact form dialog
    await page.getByRole('button', { name: /связаться/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Fill form
    await page.getByLabel(/имя/i).fill('Иван Иванов');
    await page.getByLabel(/email/i).fill('ivan@example.com');
    await page.getByLabel(/компания/i).fill('ООО Тест');
    await page.getByLabel(/сообщение/i).fill('Хочу узнать больше об Astra');

    // Submit
    await page.getByRole('button', { name: /отправить/i }).click();

    // Verify success message
    await expect(page.getByText(/успешно отправлено/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /связаться/i }).click();

    // Try to submit empty form
    await page.getByRole('button', { name: /отправить/i }).click();

    // Verify validation errors
    await expect(page.getByText(/это поле обязательно/i)).toBeVisible();
  });
});
```

### Testing Animations

```typescript
test.describe('Scroll Animations', () => {
  test('should trigger animations on scroll', async ({ page }) => {
    await page.goto('/');

    const featuresSection = page.locator('section#features');

    // Position section just below viewport
    await page.evaluate(() => {
      const section = document.querySelector('section#features');
      if (section) {
        window.scrollTo(0, section.getBoundingClientRect().top - window.innerHeight - 100);
      }
    });

    // Verify initial state (before animation)
    await expect(featuresSection).toHaveCSS('opacity', '0');

    // Scroll into view
    await featuresSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500); // Wait for animation

    // Verify animated state
    await expect(featuresSection).toHaveCSS('opacity', '1');
  });
});
```

---

## Visual Regression Testing

### Approach 1: Playwright Built-in Screenshots (Recommended) ✅

**Pros:**
- No external service required
- Free and unlimited
- Fast execution
- Full control over baselines
- Works offline
- Part of Playwright core

**Cons:**
- Manual baseline review required
- No cloud dashboard (local diffs only)

**Implementation:**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('should match hero section snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const heroSection = page.locator('section').first();
    await expect(heroSection).toHaveScreenshot('hero-section.png', {
      maxDiffPixels: 100, // Allow 100px difference (handles anti-aliasing)
    });
  });

  test('should match features section across viewports', async ({ page }) => {
    const viewports = [375, 768, 1280, 1920];

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');

      const features = page.locator('section#features');
      await features.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      await expect(features).toHaveScreenshot(`features-${width}px.png`);
    }
  });
});
```

**Running Visual Tests:**

```bash
# Run visual tests and generate screenshots
pnpm test:e2e e2e/visual-regression-playwright.spec.ts

# Update baselines when design changes
pnpm test:e2e e2e/visual-regression-playwright.spec.ts --update-snapshots

# View diff images (on failure)
# Playwright stores diffs in test-results/ folder
```

**Baseline Management:**

```
e2e/
├── visual-regression-playwright.spec.ts
└── visual-regression-playwright.spec.ts-snapshots/
    ├── chromium/
    │   ├── hero-section.png              # Baseline
    │   ├── features-375px.png
    │   └── features-1280px.png
    ├── firefox/
    │   └── hero-section.png
    └── webkit/
        └── hero-section.png
```

### Approach 2: Percy Cloud Service (Optional)

**Pros:**
- Cloud dashboard for visual diffs
- Collaborative review (team members can approve changes)
- Multi-browser testing on Percy infrastructure
- Historical snapshots
- CI/CD integration

**Cons:**
- Requires Percy account
- 5,000 snapshots/month free tier (may be limiting)
- Depends on external service

**Implementation:**

```typescript
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('Visual Regression with Percy', () => {
  test('should match features section', async ({ page }) => {
    await page.goto('/');

    const features = page.locator('section#features');
    await features.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    // Percy snapshot (uploaded to Percy dashboard)
    await percySnapshot(page, 'Features Section - All Color Themes', {
      widths: [375, 768, 1280, 1920],
    });
  });
});
```

**Setup:**

```bash
# Install Percy
pnpm add -D @percy/cli @percy/playwright

# Set Percy token
echo "PERCY_TOKEN=your_token_here" >> .env.local

# Run visual tests with Percy
pnpm test:visual
```

---

## Test Coverage Priorities

### Must Test (Critical)

1. **Hero Section**
   - Headline visible
   - CTA buttons clickable
   - Stats displayed correctly
   - Responsive layout

2. **Forms**
   - Contact form submission
   - Demo booking flow
   - ROI calculator inputs/outputs
   - Validation errors

3. **Navigation**
   - Menu items clickable
   - Anchor links scroll to section
   - Mobile menu toggle

4. **Responsive Design**
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1280px)

5. **Visual Snapshots**
   - All major sections across 3 browsers
   - Color themes (6 feature cards)
   - Hover states
   - Animation states

### Optional (Nice to Have)

1. **Performance**
   - LCP < 2.5s
   - CLS < 0.1
   - Bundle size < 200 KB

2. **Accessibility**
   - Keyboard navigation
   - Screen reader labels
   - Color contrast

---

## Running Tests

### Development

```bash
# Run all E2E tests
pnpm test:e2e

# Run with UI (interactive mode)
pnpm test:e2e:ui

# Run with visible browser (debugging)
pnpm test:e2e:headed

# Run specific test file
pnpm test:e2e e2e/landing.spec.ts

# Debug mode (step-by-step)
pnpm test:e2e:debug

# View test report
pnpm test:e2e:report
```

### Visual Testing

```bash
# Run visual regression tests (Playwright screenshots)
pnpm test:e2e e2e/visual-regression-playwright.spec.ts

# Update visual baselines
pnpm test:e2e e2e/visual-regression-playwright.spec.ts --update-snapshots

# Run visual tests with Percy (if configured)
pnpm test:visual
```

### CI/CD

```yaml
# .github/workflows/visual-tests.yml
name: Visual Tests with Percy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - uses: pnpm/action-setup@v3
        with:
          version: 10
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec playwright install --with-deps chromium firefox webkit
      - run: pnpm build
      - run: pnpm test:visual
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

---

## Test Data Management

### Use Constants for Test Data

```typescript
// e2e/test-data.ts
export const TEST_USER = {
  name: 'Иван Тестов',
  email: 'test@example.com',
  company: 'ООО Тест',
  phone: '+7 (999) 123-45-67',
} as const;

export const TEST_ROI_INPUT = {
  companySize: 100,
  currentTurnover: 15,
  averageSalary: 100000,
  currentHireTime: 30,
} as const;
```

### Never Use Production Data

```typescript
// ❌ Bad - using production data
test('should submit form', async ({ page }) => {
  await page.getByLabel(/email/i).fill('real.user@company.com'); // NO!
});

// ✅ Good - using test data
test('should submit form', async ({ page }) => {
  await page.getByLabel(/email/i).fill(TEST_USER.email); // YES!
});
```

---

## Debugging Failed Tests

### Playwright Trace Viewer

```bash
# Run tests with trace
pnpm test:e2e --trace on

# View trace for failed test
npx playwright show-trace test-results/landing-Hero-Sec-e0c3a/trace.zip
```

### Screenshots on Failure

Playwright automatically takes screenshots on failure:

```
test-results/
└── landing-Hero-Section-should-display-hero-headline-chromium/
    ├── test-failed-1.png
    └── trace.zip
```

### Debug Mode

```bash
# Run tests in debug mode
pnpm test:e2e:debug

# Or set breakpoint in test
test('should work', async ({ page }) => {
  await page.pause(); // Pauses execution
  await page.goto('/');
});
```

### Verbose Logging

```bash
# Show console logs from browser
pnpm test:e2e --debug

# Show Playwright debug logs
DEBUG=pw:api pnpm test:e2e
```

---

## Test Quality Checklist

Before committing tests, ensure:

- [ ] Tests are independent (no shared state)
- [ ] Tests have descriptive names (`test('should display contact form when CTA is clicked')`)
- [ ] Tests use `data-testid` for complex selectors
- [ ] Tests wait for async operations (`waitForLoadState`, `waitForSelector`)
- [ ] Tests handle animations (wait for animation completion)
- [ ] Visual tests use appropriate `maxDiffPixels` tolerance
- [ ] Tests clean up after themselves (close dialogs, reset state)
- [ ] Tests pass on all browsers (chromium, firefox, webkit)
- [ ] Tests are documented with comments for complex flows

---

## Performance Testing (Optional)

### Lighthouse CI

```bash
# Install Lighthouse CI
pnpm add -D @lhci/cli

# Run Lighthouse
pnpm lhci autorun
```

### Performance Assertions

```typescript
test('should meet performance budgets', async ({ page }) => {
  await page.goto('/');

  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return {
      lcp: navigation.domContentLoadedEventEnd,
      fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
    };
  });

  expect(metrics.lcp).toBeLessThan(2500); // LCP < 2.5s
  expect(metrics.fcp).toBeLessThan(1800); // FCP < 1.8s
});
```

---

## Summary

**For Astra Landing Page:**

1. **Primary:** Visual regression testing with Playwright screenshots (free, unlimited)
2. **Secondary:** E2E tests for critical user flows (forms, navigation, CTAs)
3. **Optional:** Percy cloud service for collaborative visual reviews
4. **Skip:** Unit tests (unless complex utility functions)

**Total Test Time:** ~2-5 minutes for full suite (all browsers)
**Coverage:** 95% of critical user-facing features
**Maintenance:** Update visual baselines when design changes intentionally

---

## Related Documents

- **[tech_stack.md](..tech_stack.md)** - Playwright and Percy versions
- **[current_tasks.md](../current_tasks.md)** - Testing tasks status
- **GitHub Workflow:** `.github/workflows/visual-tests.yml`
- **Test Files:** `e2e/landing.spec.ts`, `e2e/visual-regression-playwright.spec.ts`

---

**Last Updated:** 2025-10-29
**Next Review:** 2025-11-05
