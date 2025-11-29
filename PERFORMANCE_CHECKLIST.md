# React Performance Optimization Checklist

Quick reference для оптимизации Astra Landing Page

---

## 🔴 CRITICAL (P0) - Must Do This Week

### Server/Client Components (Impact: -600 KB, -2s TTI)

- [ ] **trust-bar.tsx** - Remove `'use client'` (no interactivity)
- [ ] **problem-section.tsx** - Remove `'use client'` (static content)
- [ ] **solution-section.tsx** - Remove `'use client'` (static cards)
- [ ] **hero-section.tsx** - Split to Server + hero-client.tsx
  - [ ] Move parallax/video to hero-client.tsx
  - [ ] Move DemoForm/ContactForm triggers to hero-client.tsx
  - [ ] Keep headline, subheadline, stats in Server Component
- [ ] **features-section.tsx** - Split to Server + features-client.tsx
  - [ ] Move parallax backgrounds to client
  - [ ] Keep grid + static content in Server
- [ ] **results-section.tsx** - Split to Server + results-client.tsx
  - [ ] Move animations to client
  - [ ] Keep static text in Server

**Verify:** `pnpm build` → First Load JS < 300 KB ✅

---

### Framer Motion Cleanup (Impact: -700 re-renders)

- [ ] **features-section.tsx**
  - [ ] Remove `whileHover={{ y: -8 }}` from FeatureCard
  - [ ] Add CSS: `.feature-card:hover { transform: translateY(-8px); }`
  - [ ] Remove icon `rotate: -180` animation
  - [ ] Change to simple `scale: 0 → 1`
  - [ ] Remove parallax backgrounds (bgParallax1, bgParallax2)

- [ ] **results-section.tsx**
  - [ ] Remove `whileHover` from MetricCard
  - [ ] Add CSS: `.metric-card:hover { transform: translateY(-8px) scale(1.02); }`
  - [ ] Replace `useInView` from Framer with Intersection Observer
  - [ ] Keep only Counter RAF loop, remove Motion wrapper

**Verify:** Hover on cards - no console re-renders ✅

---

### ROI Calculator Memoization (Impact: -590 re-renders)

- [ ] **roi-calculator.tsx**
  - [ ] Wrap `calculateROIClientSide` in `useCallback([], [])`
  - [ ] Wrap `handleCalculate` in `useCallback([calculateROIClientSide], [calculateROIClientSide])`
  - [ ] Fix useEffect deps:
    ```tsx
    // ❌ Remove:
    [watchedValues, handleCalculate]

    // ✅ Use instead:
    const companySize = watch('companySize');
    const currentTurnover = watch('currentTurnover');
    const averageSalary = watch('averageSalary');
    [companySize, currentTurnover, averageSalary, handleCalculate]
    ```
  - [ ] Wrap chartsComponent in `useMemo([roiResult], [roiResult])`

- [ ] **roi-charts.tsx**
  - [ ] Add `export const ROICharts = memo(({ ... }) => { ... });`
  - [ ] Wrap `comparisonData` in `useMemo([...deps], [...])`
  - [ ] Wrap `projectionData` in `useMemo([...deps], [...])`
  - [ ] Wrap `savingsBreakdown` in `useMemo([...deps], [...])`
  - [ ] Move `currencyFormatter` and `compactCurrencyFormatter` OUTSIDE component
  - [ ] Wrap `formatCurrency` in `useCallback([], [])`
  - [ ] Add `ROICharts.displayName = 'ROICharts';`

**Verify:** Type in calculator - only 1 recalculation per debounce ✅

---

## 🟡 HIGH PRIORITY (P1) - Next Week

### Forms Optimization (Impact: -120 re-renders)

- [ ] **contact-form.tsx**
  - [ ] Add to useForm config:
    ```tsx
    mode: 'onBlur',
    reValidateMode: 'onChange',
    ```
  - [ ] Wrap component in `memo(({ trigger, variant }) => { ... })`
  - [ ] Wrap `onSubmit` in `useCallback([], [])`
  - [ ] Add `ContactForm.displayName = 'ContactForm';`

- [ ] **demo-form.tsx**
  - [ ] Same changes as ContactForm

**Verify:** Type in form - no re-renders until blur ✅

---

### Smooth Scroll Optimization (Impact: -3600 RAF/min on idle)

- [ ] **smooth-scroll-provider.tsx**
  - [ ] Add `isScrolling` state flag
  - [ ] Add scroll event listener
  - [ ] RAF only when `isScrolling === true`
  - [ ] setTimeout to stop RAF 150ms after scroll stops
  - [ ] OR: Remove Lenis entirely, use CSS `scroll-behavior: smooth`

**Verify:** Open DevTools → Performance → Record idle page → No RAF calls ✅

---

## 🟢 LOW PRIORITY (P2) - Week 3

### Parallax Throttle (Impact: -240 re-renders/sec)

- [ ] **hooks/use-parallax.ts**
  - [ ] Add `rafId` and `ticking` refs
  - [ ] Wrap calculations in `requestAnimationFrame`
  - [ ] handleScroll only sets `ticking = true` if not already ticking

**Verify:** Scroll page → RAF capped at 60fps ✅

---

## 📊 Testing Checklist

### Before Optimizations:
- [ ] Run `pnpm build` - note First Load JS size: _______ KB
- [ ] Run Lighthouse - note Performance score: _______
- [ ] Open React DevTools Profiler
- [ ] Record user flow: Hero → Features → Results → ROI Calculator
- [ ] Note total render count: _______

### After Each Optimization:
- [ ] Run `pnpm build` - verify size decreased ✅
- [ ] Run Lighthouse - verify score increased ✅
- [ ] Re-run Profiler recording
- [ ] Compare render counts ✅

### Final Targets:
- [ ] First Load JS < 300 KB ✅
- [ ] Lighthouse Performance > 90 ✅
- [ ] INP < 200ms ✅
- [ ] TTI < 3s ✅
- [ ] Re-renders per page load < 2,000 ✅

---

## 🚀 Quick Commands

```bash
# Build and check bundle size
pnpm build

# Run dev server
pnpm dev

# Type check
pnpm type-check

# Run tests
pnpm test

# E2E tests
pnpm test:e2e

# Lighthouse audit
# (After build, run on http://localhost:3000)
```

---

## 🐛 Common Mistakes to Avoid

### ❌ DON'T:
- [ ] Add `'use client'` unless component needs hooks/interactivity
- [ ] Use Framer Motion for simple hover effects (use CSS)
- [ ] Include whole objects in useEffect deps (destructure specific values)
- [ ] Forget to memoize expensive components (Recharts, complex forms)
- [ ] Run RAF loops continuously (only when animating)
- [ ] Recreate formatters/functions inside render (move outside or useCallback)

### ✅ DO:
- [ ] Server Components first, Client only when needed
- [ ] CSS for simple animations, Framer Motion for complex
- [ ] useCallback on all functions in useEffect deps
- [ ] React.memo + useMemo for expensive renders
- [ ] Stop RAF/listeners when not needed
- [ ] Create singleton instances (formatters, etc.) outside component

---

## 📈 Progress Tracking

### Week 1 (P0):
- [ ] Day 1-2: Server/Client split (8 files)
- [ ] Day 3: Framer Motion cleanup (2 files)
- [ ] Day 4-5: ROI memoization (2 files)
- [ ] Target: -1,500 re-renders, -600 KB bundle

### Week 2 (P1):
- [ ] Day 1-2: Forms optimization (2 files)
- [ ] Day 3: Smooth scroll (1 file)
- [ ] Target: -200 re-renders, CPU idle 0%

### Week 3 (P2):
- [ ] Day 1: Parallax throttle (1 file)
- [ ] Day 2-5: Testing, final tweaks
- [ ] Target: Lighthouse > 90

---

**Total Files to Modify:** 12
**Estimated Effort:** 3 weeks
**Expected Improvement:** -60% re-renders, -70% bundle size

**Detailed Reports:**
- `REACT_PERFORMANCE_SUMMARY.md` - Executive summary
- `REACT_PERFORMANCE_AUDIT.md` - Full detailed analysis

---

Generated: 2025-10-29
