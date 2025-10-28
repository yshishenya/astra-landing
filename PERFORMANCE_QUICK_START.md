# Performance Optimization Quick Start Guide

**TL;DR:** 5 quick fixes to boost Astra Landing Page performance by 30-40%

---

## 🚨 Critical: Fix Build Issue First

The Resend package is incompatible with Next.js 15. You have 3 options:

### Option 1: Use Resend API Directly (Fastest)
Remove Resend SDK, use fetch instead:

```typescript
// lib/send-email.ts
export async function sendEmail(to: string, subject: string, html: string) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'noreply@astra.ai',
      to,
      subject,
      html,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to send email');
  }
  
  return response.json();
}
```

### Option 2: Switch to Nodemailer (Recommended)
```bash
pnpm remove resend react-email
pnpm add nodemailer
pnpm add -D @types/nodemailer
```

### Option 3: Downgrade to Next.js 14
```bash
pnpm add next@14 react@18 react-dom@18
```

---

## ⚡ Quick Wins (30 minutes)

### 1. Add Image Priority (5 min)

Find your hero image and add `priority`:

```tsx
// components/landing/hero-section.tsx or wherever your hero image is
import Image from 'next/image';

<Image
  src="/hero.png"
  alt="Astra"
  width={1200}
  height={600}
  priority  // ← ADD THIS LINE
  quality={90}
/>
```

**Impact:** -1.0s LCP

### 2. Add next/font (10 min)

```bash
# No install needed, built into Next.js
```

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

**Impact:** -0.3s LCP, -0.2s FCP

### 3. Dynamic Import Heavy Sections (10 min)

```tsx
// app/page.tsx
import dynamic from 'next/dynamic';

// Keep these as regular imports (above the fold)
import { HeroSection } from '@/components/landing/hero-section';
import { TrustBar } from '@/components/landing/trust-bar';
import { ProblemSection } from '@/components/landing/problem-section';

// Lazy load these (below the fold)
const TestimonialsSection = dynamic(() => 
  import('@/components/landing/testimonials-section').then(mod => ({ default: mod.TestimonialsSection }))
);

const FAQSection = dynamic(() => 
  import('@/components/landing/faq-section').then(mod => ({ default: mod.FAQSection }))
);

const FinalCTASection = dynamic(() => 
  import('@/components/landing/final-cta-section').then(mod => ({ default: mod.FinalCTASection }))
);

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <ProblemSection />
      {/* ... other sections ... */}
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
}
```

**Impact:** -50KB bundle, -0.5s TTI

### 4. Check for Icon Imports (3 min)

Search your code for this pattern:

```bash
grep -r "import \* as.*lucide-react" components/
```

If found, fix it:

```tsx
// ❌ BAD
import * as Icons from 'lucide-react';
const ArrowIcon = Icons.ArrowRight;

// ✅ GOOD
import { ArrowRight } from 'lucide-react';
```

**Impact:** -30KB bundle

### 5. Re-enable standalone output (2 min)

Once Resend is fixed, re-enable this for Docker:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: 'standalone', // ← UNCOMMENT THIS
  // ...
};
```

**Impact:** Smaller Docker images

---

## 🎯 Medium Priority (1-2 hours)

### 6. Generate AVIF Images

```bash
# Install sharp CLI
pnpm add -D sharp-cli

# Convert all PNG/JPG to AVIF (90% smaller)
npx sharp -i public/images/*.png -o public/images/ -f avif --quality 85
npx sharp -i public/images/*.jpg -o public/images/ -f avif --quality 85
```

Then update imports:

```tsx
// Change .png to .avif
<Image src="/hero.avif" alt="Hero" />
```

**Impact:** -200KB+ page weight

### 7. Add Bundle Analyzer

```bash
pnpm add -D @next/bundle-analyzer
```

```ts
// next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
```

```bash
# Run analysis
ANALYZE=true pnpm build
```

**Impact:** Identify optimization opportunities

### 8. Add Web Vitals Reporting

```bash
pnpm add web-vitals
```

```tsx
// app/layout.tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
    // Send to analytics
  });
  
  return null;
}

// In your layout
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
```

**Impact:** Real-time performance monitoring

---

## 🔬 Advanced (2-4 hours)

### 9. Replace Framer Motion with CSS Animations

Find simple Framer Motion animations:

```tsx
// ❌ BEFORE (Framer Motion - 32KB)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// ✅ AFTER (CSS animation - 0KB)
// Add to globals.css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

// Component
<div className="animate-fade-in-up">
  Content
</div>
```

**Impact:** -20KB bundle, better FPS

### 10. Add Service Worker for Caching

```bash
pnpm add next-pwa
```

```ts
// next.config.ts
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA(nextConfig);
```

**Impact:** Instant repeat visits

---

## 📊 Measure & Monitor

### Before Any Optimization
```bash
# Baseline
pnpm build
pnpm start
# Open http://localhost:3000
# Run Lighthouse in Chrome DevTools (F12 → Lighthouse)
```

### After Each Optimization
```bash
# Re-build and re-test
rm -rf .next
pnpm build
pnpm start
# Run Lighthouse again
```

### In Production
1. Deploy to Vercel
2. Check Vercel Analytics dashboard
3. Monitor Core Web Vitals
4. Set up alerts for regressions

---

## ✅ Checklist

- [ ] Fix Resend build issue (Option 1, 2, or 3)
- [ ] Add `priority` to hero image
- [ ] Implement `next/font/google`
- [ ] Dynamic import below-fold sections
- [ ] Tree-shake Lucide icons
- [ ] Generate AVIF images
- [ ] Add bundle analyzer
- [ ] Add Web Vitals reporting
- [ ] Replace simple Framer Motion with CSS
- [ ] Run baseline Lighthouse audit
- [ ] Achieve Performance >90
- [ ] Deploy to production
- [ ] Monitor real user metrics

---

## 🎯 Target Scores

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| Performance | ? | 92-95 | >90 |
| Accessibility | 95 | 98-100 | >95 |
| Best Practices | 90 | 95-98 | >95 |
| SEO | 95 | 98-100 | >95 |
| LCP | ? | 1.5-2.0s | <2.5s |
| INP | <100ms | 50-100ms | <200ms |
| CLS | <0.05 | <0.05 | <0.1 |
| First Load JS | ? | 120-150KB | <200KB |

---

## 🆘 Need Help?

1. **Build still failing?**
   - Check: Are Resend imports completely removed?
   - Try: Clean build (`rm -rf .next && pnpm build`)

2. **Images not loading?**
   - Check: File paths are correct
   - Check: Sharp is installed (`pnpm list sharp`)

3. **Bundle too large?**
   - Run: `ANALYZE=true pnpm build`
   - Look for: Large dependencies in report

4. **Performance score still low?**
   - Check: All images use `next/image`
   - Check: No layout shifts (CLS)
   - Check: Fonts are optimized

---

**Estimated Time:** 2-4 hours total  
**Expected Improvement:** 30-40% faster load times  
**Difficulty:** Medium  

**Remember:** Measure before and after each change!
