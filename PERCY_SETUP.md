# Percy Visual Regression Testing Setup

## What is Percy?

Percy is an all-in-one visual review platform that captures screenshots, compares them against baseline images, and highlights visual changes. It helps catch visual bugs before they reach production.

## Why Percy for Astra Landing Page?

- **Color Theme Testing**: Automatically detect unintended color changes in the 6 feature cards
- **Cross-Browser**: Test visual consistency across Chrome, Firefox, Safari
- **Responsive Design**: Verify layouts at 375px, 768px, 1280px, 1920px viewports
- **Animation States**: Capture before/after animation states
- **Hover States**: Test hover effects on interactive elements

## Setup Instructions

### 1. Create Percy Account

1. Visit [https://percy.io](https://percy.io)
2. Sign up with GitHub (recommended for team projects)
3. Create a new project: "Astra Landing Page"
4. Copy your Percy token from Project Settings

### 2. Configure Environment

Add to your `.env.local` file:

```bash
# Percy Visual Regression Testing
PERCY_TOKEN=your_percy_token_here
```

**IMPORTANT**: Never commit `.env.local` to git!

### 3. Run Visual Tests

```bash
# Run all visual regression tests
pnpm test:visual

# Update visual baselines after intentional changes
pnpm test:visual:update
```

### 4. Review Changes

After running tests:
1. Visit your Percy dashboard: https://percy.io
2. Review visual diffs highlighted in yellow
3. Approve or reject changes
4. New baselines are created after approval

## Test Coverage

### Features Section Color Themes
- ✅ All 6 color-coded cards (green, blue, purple, orange, teal, indigo)
- ✅ Individual card snapshots with hover states
- ✅ Color contrast validation

### Full Landing Page
- ✅ Hero Section
- ✅ Trust Bar
- ✅ Problem Section
- ✅ Solution Section
- ✅ Complete page scroll

### Responsive Design
- ✅ Mobile (375px)
- ✅ Tablet (768px)
- ✅ Desktop (1280px)
- ✅ Wide Desktop (1920px)

### Animation States
- ✅ Before animation (elements hidden)
- ✅ After animation (elements visible)

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Visual Tests

on: [push, pull_request]

jobs:
  percy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install

      - name: Build application
        run: pnpm build

      - name: Run Percy tests
        run: pnpm test:visual
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

### Add PERCY_TOKEN to GitHub Secrets
1. Go to Repository Settings → Secrets → Actions
2. Click "New repository secret"
3. Name: `PERCY_TOKEN`
4. Value: Your Percy token
5. Click "Add secret"

## Percy Configuration

Configuration is in `.percy.yml`:

```yaml
version: 2
snapshot:
  widths: [375, 768, 1280, 1920]
  minHeight: 1024
  percyCSS: |
    /* Disable animations for consistent snapshots */
    *, *::before, *::after {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
    }
```

## Best Practices

### 1. Review Changes Regularly
- Check Percy dashboard after every PR
- Never auto-approve changes without review
- Look for unintended visual regressions

### 2. Update Baselines After Intentional Changes
```bash
# After changing colors, layouts, or styles
pnpm test:visual:update
```

### 3. Keep Snapshots Focused
- Use `scope` parameter for specific sections
- Avoid full-page snapshots when testing one component
- This reduces noise and speeds up reviews

### 4. Handle Dynamic Content
- Hide timestamps and dynamic data with `percyCSS`
- Use stable test data
- Disable animations in Percy config

## Troubleshooting

### "Percy token not found"
```bash
# Check if PERCY_TOKEN is set
echo $PERCY_TOKEN

# If empty, add to .env.local and restart terminal
export PERCY_TOKEN=your_token_here
```

### Flaky Snapshots
- Increase `networkIdleTimeout` in `.percy.yml`
- Add `await page.waitForTimeout()` before snapshots
- Use `percyCSS` to hide dynamic content

### Different Results Locally vs CI
- Ensure same Node.js version
- Check font rendering differences
- Use Percy's cross-browser testing

## Resources

- **Percy Documentation**: https://docs.percy.io
- **Playwright Integration**: https://docs.percy.io/docs/playwright
- **Percy Dashboard**: https://percy.io
- **Support**: https://percy.io/support

## Monthly Limits

**Free Tier**:
- 5,000 snapshots/month
- Unlimited projects
- Unlimited team members

**Current Usage**:
- ~15 snapshots per test run
- ~300 snapshots/month (estimated 20 runs)
- **Well within free tier limits** ✅

## Example Output

```
[percy] Percy has started!
[percy] Created build #123: https://percy.io/astra/astra-landing/builds/123
[percy] Snapshot taken: Features Section - All Color Themes
[percy] Snapshot taken: Feature Card 1 - Green Theme (Hover)
[percy] Snapshot taken: Feature Card 2 - Blue Theme (Hover)
...
[percy] Finalized build #123
[percy] Build comparison: https://percy.io/astra/astra-landing/builds/123
```

## Workflow

1. **Make visual changes** to components
2. **Run tests**: `pnpm test:visual`
3. **Review in Percy**: Check dashboard for diffs
4. **Approve or reject**: Accept intentional changes, fix bugs
5. **Update baselines**: Percy auto-updates after approval
6. **Repeat**: Continue development with confidence

---

**Need Help?** Check Percy docs or ask the team in #engineering-frontend
