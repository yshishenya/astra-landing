# Performance Quick Fixes - Action Checklist

**Priority:** P0 - Implement Today (1.5 hours total)
**Expected Impact:** -29MB assets, -300KB JS, -2.5s LCP, +14 Lighthouse points

---

## Fix 1: Optimize Hero Video (30 minutes)

**Problem:** 31MB video files blocking page load
**Impact:** -29MB assets, -2.5s LCP

### Steps:

```bash
# Install FFmpeg (if not already installed)
# Ubuntu/Debian
sudo apt install ffmpeg

# macOS
brew install ffmpeg

# Navigate to project directory
cd /home/yan/astra_landing/public/videos

# Backup original files
mkdir backup
cp hero-demo-optimized.mp4 backup/
cp hero-demo-optimized.webm backup/

# Optimize MP4 (1080p, target: 1.5MB)
ffmpeg -i hero-demo-optimized.mp4 \
  -vf "scale=1920:1080:flags=lanczos" \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -profile:v high \
  -level 4.0 \
  -movflags +faststart \
  -an \
  -pix_fmt yuv420p \
  hero-demo-1080p.mp4

# Optimize WebM (1080p, target: 1.2MB)
ffmpeg -i hero-demo-optimized.mp4 \
  -vf "scale=1920:1080:flags=lanczos" \
  -c:v libvpx-vp9 \
  -crf 32 \
  -b:v 0 \
  -row-mt 1 \
  -an \
  -pix_fmt yuv420p \
  hero-demo-1080p.webm

# Verify file sizes
ls -lh hero-demo-1080p.*
# Should show: ~1.5MB MP4, ~1.2MB WebM

# Update hero-section.tsx
# Replace:
#   /videos/hero-demo-optimized.mp4  →  /videos/hero-demo-1080p.mp4
#   /videos/hero-demo-optimized.webm  →  /videos/hero-demo-1080p.webm
```

### Code Changes:

**File:** `components/landing/hero-section.tsx` (line 59-60)

```tsx
// BEFORE
<source src="/videos/hero-demo-optimized.mp4" type="video/mp4" />
<source src="/videos/hero-demo-optimized.webm" type="video/webm" />

// AFTER
<source src="/videos/hero-demo-1080p.webm" type="video/webm" />
<source src="/videos/hero-demo-1080p.mp4" type="video/mp4" />
```

### Validation:

```bash
# Check video plays correctly
pnpm dev
# Open http://localhost:3000
# Verify hero video loads and plays

# Check file sizes
du -h public/videos/hero-demo-1080p.*
# Should show: 1.5M MP4, 1.2M WebM (down from 31M)
```

**Expected Result:** -29MB assets (-94%), -2.5s LCP on 4G

---

## Fix 2: Convert Static Components to RSC (45 minutes)

**Problem:** 8 static components unnecessarily using 'use client'
**Impact:** -300KB First Load JS

### Components to Convert:

1. ✅ `trust-bar.tsx` - Just logos (static)
2. ✅ `problem-section.tsx` - Static text + icons
3. ✅ `solution-section.tsx` - Static cards
4. ✅ `testimonials-section.tsx` - Static quotes
5. ✅ `use-cases-section.tsx` - Static case studies
6. ✅ `pricing-section.tsx` - Static pricing table
7. ✅ `faq-section.tsx` - Accordion (convert to RSC + client Accordion)
8. ✅ `final-cta-section.tsx` - Static CTA button

### Step-by-Step Example (trust-bar.tsx):

**File:** `components/landing/trust-bar.tsx`

```tsx
// BEFORE (Client Component)
'use client';

import { type FC } from 'react';
// ... rest of component

export const TrustBar: FC = () => {
  return (
    <section className="...">
      {/* Static logos */}
    </section>
  );
};

// AFTER (Server Component)
// Remove 'use client' directive
import { type FC } from 'react';
// ... rest of component (unchanged)

export const TrustBar: FC = () => {
  return (
    <section className="...">
      {/* Static logos */}
    </section>
  );
};
```

### Pattern for Components with Animations:

**For components using Framer Motion:**

```tsx
// BEFORE
'use client';
import { motion } from 'framer-motion';

export const Section = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    {/* content */}
  </motion.div>
);

// AFTER - Extract animated wrapper to client component
// components/ui/animated-section.tsx (NEW FILE)
'use client';
import { motion } from 'framer-motion';
import { type FC, type ReactNode } from 'react';

export const AnimatedSection: FC<{ children: ReactNode }> = ({ children }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    {children}
  </motion.div>
);

// components/landing/section.tsx (Server Component)
import { AnimatedSection } from '@/components/ui/animated-section';

export const Section = () => (
  <AnimatedSection>
    {/* content is rendered on server */}
  </AnimatedSection>
);
```

### Files to Modify:

```bash
# 1. Remove 'use client' from static components
components/landing/trust-bar.tsx         # Remove line 1
components/landing/problem-section.tsx   # Remove line 1
components/landing/solution-section.tsx  # Remove line 1
components/landing/testimonials-section.tsx  # Remove line 1
components/landing/use-cases-section.tsx # Remove line 1
components/landing/pricing-section.tsx   # Remove line 1
components/landing/final-cta-section.tsx # Remove line 1

# 2. FAQ Section needs accordion client component
# Keep 'use client' OR extract accordion to client component
components/landing/faq-section.tsx       # Extract Accordion to client
```

### Validation:

```bash
# Type check
pnpm tsc --noEmit

# Build to verify bundle size reduction
pnpm build

# Check First Load JS decreased
# Look for "First Load JS" in build output
# Should drop from ~620KB to ~320KB (-300KB)

# Test in browser
pnpm dev
# Verify all sections still render correctly
```

**Expected Result:** -300KB First Load JS (-48%)

---

## Fix 3: Verify Recharts Dynamic Import (15 minutes)

**Problem:** Confirm 200KB Recharts is NOT in First Load JS
**Impact:** Already done, just verify

### Verification Steps:

**File:** `components/landing/roi-calculator.tsx` (lines 17-21)

```tsx
// Check dynamic import is present
const ROICharts = dynamic(() => import('./roi-charts').then(mod => mod.ROICharts), {
  ssr: false, // Charts don't need SSR, saves server resources
  loading: () => <ROIChartSkeleton />,
});
```

✅ **Already implemented correctly!**

### Validation:

```bash
# Build and check bundle
pnpm build | grep "First Load JS"

# Recharts should NOT appear in First Load JS
# Should appear in separate chunk: _XYZ.js (lazy loaded)

# Check in browser
pnpm dev
# Open browser DevTools → Network tab
# Scroll to ROI Calculator section
# Verify recharts chunk loads ONLY when scrolled into view
```

**Expected Result:** 200KB Recharts loads on-demand (not blocking initial load)

---

## Success Metrics

### Before Quick Fixes:
- First Load JS: ~620KB
- LCP: ~4.5s
- Video Assets: 31MB
- Lighthouse: ~68/100

### After Quick Fixes (1.5 hours):
- First Load JS: ~320KB ✅ (-48%)
- LCP: ~2.0s ✅ (-56%)
- Video Assets: 2.7MB ✅ (-91%)
- Lighthouse: ~82/100 ✅ (+14 points)

---

## Commands Cheatsheet

```bash
# Full workflow
cd /home/yan/astra_landing

# Step 1: Optimize videos (30min)
cd public/videos
ffmpeg -i hero-demo-optimized.mp4 -vf "scale=1920:1080" -c:v libx264 -crf 28 -preset slow -movflags +faststart -an hero-demo-1080p.mp4
ffmpeg -i hero-demo-optimized.mp4 -vf "scale=1920:1080" -c:v libvpx-vp9 -crf 32 -b:v 0 -an hero-demo-1080p.webm
cd ../..

# Step 2: Update hero video paths
# Edit: components/landing/hero-section.tsx (lines 59-60)

# Step 3: Remove 'use client' from static components (45min)
# Edit 8 files in components/landing/

# Step 4: Validate
pnpm tsc --noEmit  # Type check
pnpm build         # Build and measure
pnpm dev           # Manual testing
```

---

## Troubleshooting

### FFmpeg Not Found
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install -y ffmpeg

# macOS
brew install ffmpeg
```

### Video Not Playing After Optimization
```bash
# Check codec compatibility
ffmpeg -i hero-demo-1080p.mp4

# Re-encode with safer settings
ffmpeg -i hero-demo-optimized.mp4 \
  -vf "scale=1920:1080" \
  -c:v libx264 \
  -profile:v baseline \
  -level 3.0 \
  -pix_fmt yuv420p \
  hero-demo-compatible.mp4
```

### TypeScript Errors After Removing 'use client'
```bash
# If component uses hooks (useState, useEffect), it MUST stay client
# Only remove 'use client' from truly static components
# Example: trust-bar, testimonials, pricing (no hooks)
```

### Build Still Shows High Bundle Size
```bash
# Check for remaining client components
grep -r "use client" components/landing/*.tsx

# Expected results after fixes:
# - roi-calculator.tsx (has hooks - keep client)
# - roi-charts.tsx (has hooks - keep client)
# - hero-section.tsx (has hooks - keep client)
# - features-section.tsx (has motion - keep client for now)
# - results-section.tsx (has counters - keep client for now)
# - header.tsx (has navigation - keep client)
# - demo-form.tsx (has form - keep client)
# - contact-form.tsx (has form - keep client)
```

---

## Next Steps (After Quick Fixes)

After completing these 3 quick fixes (1.5 hours), move to **Week 2 optimizations** (P1):

1. Replace Framer Motion with CSS animations (-350KB)
2. Optimize RAF loops (-15% CPU)
3. Lazy load analytics (-350ms INP)
4. Code split below-fold sections (-150KB)

See `PERFORMANCE_AUDIT_REPORT.md` for full details.

---

**Start Now:** Fix 1 (video optimization) takes 30 minutes and has the BIGGEST impact (-2.5s LCP).
