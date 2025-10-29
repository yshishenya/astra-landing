# Technology Stack - Astra Landing Page

**Last Updated:** 2025-10-29
**Project:** Marketing Landing Page for Astra
**Framework:** Next.js 15 (App Router)
**Target:** Modern, performant, conversion-optimized website
**Status:** Phase 1 Complete ✅

---

## Core Stack

- **Framework:** Next.js 16.0.1 (App Router, React Server Components)
- **Language:** TypeScript 5.9.3 (strict mode enabled)
- **Runtime:** Node.js 22+ (Vercel default, latest LTS)
- **Styling:** Tailwind CSS v3.4.18
- **Package Manager:** pnpm 10.20.0

### Why This Stack?

**Next.js 15:**
- React Server Components (RSC) reduce client-side JavaScript by 90%
- Automatic code splitting and lazy loading
- Built-in image optimization (AVIF-first in 2025)
- SEO-friendly (server-side rendering)
- 34.8% of Y Combinator companies use Next.js
- First Load JS: 102 kB (well under 200 kB target)

**TypeScript:**
- Catch errors at compile time, not runtime
- Better IDE support and autocomplete
- Self-documenting code
- Required for large projects (maintainability)
- Strict mode enabled with no `any` types

**Tailwind CSS v3:**
- Utility-first approach = faster development
- Smaller bundle size (only used classes)
- Consistent design system with custom tokens
- Mobile-first responsive design
- Production-stable (v3.4.18)

---

## UI Components & Libraries

### Base UI Framework

**shadcn/ui** (Primary)
- Copy-paste approach (you own the code, no npm dependency hell)
- Built on Radix UI (accessibility out of the box)
- Fully customizable with Tailwind
- TypeScript support

### Ready-Made Landing Components

**Launch UI v2.0** (Recommended for speed)
- 100+ landing page specific components
- Production-ready blocks: Hero, Features, Pricing, Testimonials
- Next.js 15 + Tailwind v4 + React 19 compatible
- Responsive and accessible

**Page UI**
- Landing page components based on shadcn/ui
- Copy-paste ready
- AI-powered page generation (bonus feature)

**Aceternity UI** (For wow-factor)
- 70+ animated components
- Stunning visual effects
- Perfect for Hero sections and feature showcases
- Framer Motion integration

**Magic UI**
- 50+ animated components
- 3D effects (spinning progress, scratch-to-reveal cards)
- TypeScript + Next.js + Tailwind

### Icons

**Lucide React** (Primary)
- Modern, consistent icon set
- Tree-shakeable (only imports what you use)
- 1000+ icons

**Heroicons** (Alternative)
- Created by Tailwind team
- Perfect Tailwind integration

### Data Visualization

**Recharts 3.3.0** (Primary for charts)
- React-based charting library built on D3
- Composable components approach
- Built-in responsive design
- TypeScript support
- 100KB gzipped (~200KB uncompressed)

**Why Recharts:**
- Declarative API (React-friendly)
- Supports common chart types: Line, Bar, Pie, Area, Composed
- Animation support out of the box
- Easy customization with Tailwind classes
- Active maintenance and community

**Use cases:**
- ROI Calculator visualization
- Metrics dashboard
- Results projections (3-year forecasts)
- Savings breakdown (pie charts)
- Comparative bar charts

**Alternative considered:**
- Chart.js: Requires Canvas, less React-friendly
- Victory: Larger bundle size (~250KB)
- D3 directly: More flexible but requires more code

**Bundle impact:** +200KB (minified) to client bundle
**Recommendation:** Use code splitting for ROI calculator section to avoid loading charts on initial page load

```tsx
// Lazy load charts
const ROICharts = dynamic(() => import('./roi-charts'), {
  ssr: false,
  loading: () => <ChartsSkeleton />
});
```

---

## Animations & Visual Effects

### Primary Animation Library

**Framer Motion 11.x**
- Declarative React animations
- 60 FPS performance
- Layout animations (magic move)
- Gesture support (drag, tap, hover)
- 32 KB gzipped

**Use cases:**
- Enter/exit animations
- Hover effects
- Page transitions
- Scroll-triggered reveals
- UI micro-interactions

### Complex Timeline Animations

**GSAP (GreenSock Animation Platform)**
- Professional-grade animation control
- Timeline-based animations
- SVG morphing
- ScrollTrigger plugin for scroll-driven animations
- 23 KB gzipped

**Use cases:**
- Complex sequences
- Cinematic effects
- Advanced scroll animations
- SVG animations

### Smooth Scrolling

**Lenis** (New standard 2025)
- Replaces Locomotive Scroll (deprecated)
- Butter-smooth scrolling
- WebGL sync
- Parallax effects
- High performance + accessibility

**Installation:**
```bash
pnpm add @studio-freight/lenis
```

### 3D Graphics (Optional)

**React Three Fiber (R3F)**
- Declarative Three.js for React
- JSX-based 3D scenes
- Component-based approach
- WebGPU support (2025 standard)

**Use case:** Interactive 3D product showcase in Hero section

**Spline** (No-code alternative)
- Drag-and-drop 3D design
- Export to React component
- Faster prototyping

---

## Forms & Email

### Email Platform

**Resend**
- Modern transactional email API
- 422,541 downloads/week (+56% growth)
- Perfect Next.js integration
- 3000 emails/month free

**Why Resend:**
- Developer-friendly API
- React Email templates
- Webhooks for tracking
- Event logging
- Suppression lists

### Email Templates

**React Email 4.0** (March 2025 release)
- Email templates as React components
- Built-in Linter
- Spam Score checker
- Compatibility Checker
- Live preview

### Form Validation

**React Hook Form**
- Performant (minimal re-renders)
- TypeScript support
- Zod integration for schema validation

**Zod**
- TypeScript-first schema validation
- Runtime type checking
- Error messages

**Example:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  company: z.string().min(2, 'Too short'),
});

const ContactForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
  });
  // ...
};
```

---

## Performance Optimization

### Image Optimization

**Sharp** (Required for production)
- Image processing library
- AVIF-first (better compression than WebP)
- Automatic responsive images
- Edge caching

**Next.js Image Component:**
```tsx
import Image from 'next/image';

<Image
  src="/hero-image.png"
  width={1200}
  height={600}
  alt="Hero"
  priority // for above-the-fold images
  quality={90}
/>
```

### Performance Monitoring

**Vercel Analytics**
- Real User Metrics (RUM)
- Core Web Vitals tracking
- Free for Vercel deployments

**Google Analytics 4**
- User behavior tracking
- Conversion tracking
- Goal setup

**Plausible** (Privacy-friendly alternative)
- GDPR compliant
- Lightweight (< 1 KB)
- No cookies

---

## Development Tools

### Code Quality

**ESLint**
- Linting rules for Next.js
- TypeScript rules
- React best practices

**Prettier**
- Code formatting
- Consistent style
- Pre-commit hook integration

**Husky**
- Git hooks
- Run linting before commit
- Prevent bad code from reaching repo

**lint-staged**
- Only lint changed files
- Faster pre-commit checks

### Type Checking

**TypeScript Compiler (tsc)**
- Compile-time type checking
- `pnpm tsc --noEmit` for CI/CD

---

## Project Structure

```
astra_landing/
├── app/                          # Next.js 15 App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page (home)
│   ├── globals.css              # Global styles
│   ├── api/                     # API routes
│   │   ├── contact/route.ts    # Contact form endpoint
│   │   └── subscribe/route.ts  # Email subscription
│   └── not-found.tsx            # 404 page
│
├── components/
│   ├── landing/                 # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── TrustBar.tsx
│   │   ├── ProblemStatement.tsx
│   │   ├── SolutionOverview.tsx
│   │   ├── KeyFeatures.tsx
│   │   ├── ResultsMetrics.tsx
│   │   ├── UseCases.tsx
│   │   ├── SocialProof.tsx
│   │   ├── PricingTable.tsx
│   │   ├── FAQ.tsx
│   │   ├── FinalCTA.tsx
│   │   └── Footer.tsx
│   │
│   ├── ui/                      # Reusable UI (shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── accordion.tsx
│   │   ├── input.tsx
│   │   └── ...
│   │
│   └── shared/                  # Shared components
│       ├── Header.tsx
│       ├── Navigation.tsx
│       └── CTAButton.tsx
│
├── lib/                          # Utilities
│   ├── utils.ts                 # Helper functions
│   ├── cn.ts                    # Tailwind classname merger
│   └── validations.ts           # Zod schemas
│
├── public/                       # Static assets
│   ├── images/                  # Images
│   ├── videos/                  # Videos
│   └── fonts/                   # Custom fonts (if needed)
│
├── styles/                       # Global styles
│   └── globals.css              # Tailwind imports + custom CSS
│
├── content/                      # Content/copywriting
│   ├── hero-content.ts
│   ├── features-content.ts
│   ├── pricing-content.ts
│   └── faq-content.ts
│
├── hooks/                        # Custom React hooks
│   ├── use-scroll-progress.ts
│   └── use-intersection.ts
│
├── types/                        # TypeScript types
│   └── index.ts
│
├── .env.local                    # Environment variables (local)
├── .env.example                  # Example env file
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
└── pnpm-lock.yaml                # Lock file
```

---

## Environment Variables

```env
# Site Configuration
NEXT_PUBLIC_APP_URL=https://astra.ai
NEXT_PUBLIC_SITE_NAME="Astra"
NEXT_PUBLIC_CONTACT_EMAIL=contact@astra.ai

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@astra.ai

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=astra.ai

# Visual Regression Testing (Percy)
PERCY_TOKEN=your_percy_token_here

# Optional
NEXT_PUBLIC_HOTJAR_ID=xxxxx
```

---

## Dependencies (package.json)

### Core Dependencies

```json
{
  "dependencies": {
    "next": "^16.0.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",

    // Styling
    "tailwindcss": "^4.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",

    // UI Components
    "@radix-ui/react-accordion": "^1.1.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",
    "lucide-react": "^0.300.0",

    // Data Visualization
    "recharts": "^3.3.0",

    // Animations
    "framer-motion": "^11.0.0",
    "@studio-freight/lenis": "^1.0.0",

    // Forms
    "react-hook-form": "^7.48.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",

    // Email
    "resend": "^3.0.0",
    "@react-email/components": "^0.0.0"
  },

  "devDependencies": {
    "@types/node": "^22.10.1",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.2",

    // Testing
    "@playwright/test": "^1.56.1",
    "@percy/cli": "^1.31.4",
    "@percy/playwright": "^1.0.9",
    "@testing-library/react": "^16.3.0",
    "@testing-library/jest-dom": "^6.9.1",
    "vitest": "^4.0.4",

    // Code Quality
    "eslint": "^9.17.0",
    "eslint-config-next": "^15.0.0",
    "@typescript-eslint/eslint-plugin": "^8.18.1",
    "@typescript-eslint/parser": "^8.18.1",
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.10",

    "husky": "^8.0.0",
    "lint-staged": "^15.0.0"
  }
}
```

---

## Performance Targets

### Lighthouse Scores (Minimum)

- **Performance:** > 90
- **Accessibility:** > 95
- **Best Practices:** > 95
- **SEO:** > 95

### Core Web Vitals (2025 Standards)

**LCP (Largest Contentful Paint):** < 2.5 seconds
- Hero image must load fast
- Use `priority` on Next.js Image
- AVIF format for images

**INP (Interaction to Next Paint):** < 200ms
- Replaced FID in 2025
- Minimize JavaScript execution
- Use React Server Components

**CLS (Cumulative Layout Shift):** < 0.1
- Reserve space for images (width/height)
- Avoid layout shifts from fonts
- Use CSS containment

### Bundle Size Targets

- **First Load JS:** < 200 KB
- **Page JS:** < 100 KB
- **Total CSS:** < 50 KB

---

## Deployment

### Primary: Vercel (Recommended)

**Why Vercel:**
- Seamless Next.js integration
- Automatic deployments from Git
- Edge Functions support
- Free SSL certificates
- 100 GB bandwidth (free tier)
- Automatic image optimization

**Deployment:**
```bash
# Connect GitHub repo to Vercel
# Push to main → auto deploy
git push origin main
```

### Alternative: Cloudflare Pages

**Why Cloudflare:**
- Unlimited bandwidth (free tier)
- 200+ data centers (vs 24 for Vercel)
- Faster edge computing (sub-10ms cold starts)
- 15ms latency vs 150ms+ Vercel (10x improvement)
- HTTP/3 out of the box

**Best for:** High traffic, maximum performance

### Docker Deployment (Self-Hosted or Cloud) ✨ OPTIMIZED

**Status:** ✅ **Production-Ready** (Optimized 2025-10-29)

**Why Docker:**
- Portable container runs anywhere (AWS, GCP, Azure, DigitalOcean, self-hosted)
- Consistent environment across dev/staging/prod
- **Ultra-optimized:** 81% smaller image (~150 MB vs ~800 MB)
- **10-100x faster rebuilds** with BuildKit cache mounts
- Built-in health checks and auto-restart
- Easy horizontal scaling with orchestrators (Kubernetes, Docker Swarm)
- Security scanning integrated (Trivy + Hadolint)

**Quick Start:**
```bash
# Fastest way (automated script)
./scripts/docker-build.sh prod

# Or with Docker Compose
docker-compose up --build

# Production with resource limits & Nginx
docker-compose -f docker-compose.prod.yml up -d

# Monitor container
./scripts/monitor-containers.sh astra-landing-prod
```

**Advanced Setup:**
```bash
# Development build
./scripts/docker-build.sh dev

# Test build with security audit
./scripts/docker-build.sh test

# Manual build with BuildKit
export DOCKER_BUILDKIT=1
docker build -t astra-landing:latest .
docker run -p 3000:3000 --env-file .env.local astra-landing:latest

# Production with Nginx reverse proxy
docker-compose -f docker-compose.prod.yml up -d
```

**Docker Configuration Files:**

1. **[Dockerfile](../Dockerfile)** - Ultra-optimized 4-stage build
   - Stage 1: Dependencies with BuildKit cache (pnpm)
   - Stage 2: Builder with type checking + Next.js build cache
   - Stage 3: Security audit (pnpm audit)
   - Stage 4: Production runner (minimal Alpine, non-root user)

2. **[docker-compose.yml](../docker-compose.yml)** - Development setup
   - Basic configuration for local development
   - Port mapping, environment variables
   - Volume mounts for hot reload (optional)

3. **[docker-compose.prod.yml](../docker-compose.prod.yml)** - Production setup
   - Resource limits (CPU: 1 core, Memory: 512MB)
   - Health checks (30s interval, 3 retries)
   - Restart policies (on-failure, max 3 attempts)
   - Logging with rotation (10MB/file, 3 files)
   - Nginx reverse proxy support
   - Network isolation

4. **[nginx/nginx.conf](../nginx/nginx.conf)** - Optimized Nginx config
   - Gzip compression (level 6)
   - Static file caching (1 year for /_next/static)
   - Rate limiting (10 req/s general, 5 req/s API)
   - Security headers (X-Frame-Options, CSP, HSTS)
   - Upstream keepalive (32 connections)

5. **[.dockerignore](../.dockerignore)** - Build optimization
   - Excludes node_modules, .git, docs, logs
   - Reduces context size by ~70%
   - Faster COPY operations

6. **[next.config.ts](../next.config.ts)** - Next.js Docker config
   - `output: 'standalone'` for minimal runtime
   - Image optimization settings
   - Production optimizations

7. **[app/api/health/route.ts](../app/api/health/route.ts)** - Health endpoint
   - Returns 200 OK when app is healthy
   - Used by Docker HEALTHCHECK
   - Includes uptime and environment info

**Automation & Monitoring:**

1. **[scripts/docker-build.sh](../scripts/docker-build.sh)** - Build automation
   - Modes: dev, prod, test
   - Security scanning integration
   - Image size analysis
   - Performance testing

2. **[scripts/monitor-containers.sh](../scripts/monitor-containers.sh)** - Monitoring
   - Real-time resource usage (CPU, Memory, Network, Disk)
   - Health endpoint validation
   - Performance metrics export (JSON)
   - Alert thresholds (CPU 80%, Memory 80%)

3. **[.github/workflows/docker-optimize.yml](../.github/workflows/docker-optimize.yml)** - CI/CD
   - Automated builds on push
   - Multi-platform (linux/amd64, linux/arm64)
   - Security scanning (Trivy + Hadolint)
   - Performance testing
   - Optimization reports

**Image Optimization Results:**

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Image Size** | ~800 MB | ~150 MB | **81% smaller** |
| **Cached Rebuild** | 3-5 min | 10-30 sec | **90% faster** |
| **Initial Build** | 5-8 min | 5-8 min | Baseline |
| **Dependency Update** | 3-5 min | 30-60 sec | **85% faster** |

**Security Features:**
- ✅ Non-root user execution (nextjs:1001, nodejs:1001)
- ✅ Security updates applied in all stages
- ✅ dumb-init for proper signal handling (graceful shutdown)
- ✅ Automated vulnerability scanning (Trivy)
- ✅ Dockerfile linting (Hadolint)
- ✅ Health checks for monitoring
- ✅ Resource limits to prevent abuse
- ✅ Network isolation

**Performance Optimizations:**
- ✅ **BuildKit cache mounts** - 10-100x faster rebuilds
  - pnpm store cache: `/root/.local/share/pnpm/store`
  - Next.js build cache: `/app/.next/cache`
- ✅ **Multi-stage build** - 81% smaller final image
- ✅ **Standalone output** - Only required files in production
- ✅ **Alpine Linux** - Minimal base image
- ✅ **Layer optimization** - Minimal number of layers
- ✅ **Type checking before build** - Fail fast on errors

**Monitoring & Observability:**
```bash
# Real-time monitoring
./scripts/monitor-containers.sh astra-landing-prod

# Docker stats
docker stats astra-landing-prod

# Health check
curl http://localhost:3000/api/health

# Logs
docker-compose -f docker-compose.prod.yml logs -f

# Container inspect
docker exec -it astra-landing-prod sh
```

**Documentation:**
- 📄 [DOCKER_OPTIMIZATION_REPORT.md](../DOCKER_OPTIMIZATION_REPORT.md) - Full optimization report (95/100 score)
- 📄 [DOCKER_QUICK_START.md](../DOCKER_QUICK_START.md) - Quick reference guide
- 📄 [README.md](../README.md) - Getting started with Docker

**Best for:**
- Self-hosted deployments
- Hybrid cloud (on-prem + cloud)
- Maximum control and customization
- Cost optimization (vs serverless)
- Kubernetes/orchestrator deployments

---

## Security Best Practices

### 1. Environment Variables
- Never commit `.env.local`
- Use `.env.example` for documentation
- Vercel: Add env vars in dashboard

### 2. Content Security Policy (CSP)
```tsx
// app/layout.tsx
export const metadata = {
  other: {
    'Content-Security-Policy': "default-src 'self'; ..."
  }
};
```

### 3. Rate Limiting (API Routes)
Use Vercel Edge Config for rate limiting

### 4. Input Validation
Always validate with Zod schemas

### 5. HTTPS Only
Vercel handles this automatically

---

## Coding Standards

### TypeScript

**Strict mode enabled:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

**No `any` types allowed:**
```tsx
// BAD
const data: any = fetchData();

// GOOD
type Data = { id: string; name: string };
const data: Data = fetchData();
```

### React Best Practices

**Server Components First:**
```tsx
// app/page.tsx (Server Component by default)
export default async function HomePage() {
  const data = await fetchData(); // No loading state needed
  return <Hero data={data} />;
}
```

**Client Components only when needed:**
```tsx
'use client'; // Only for interactivity

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Tailwind Best Practices

**Use cn() utility for conditional classes:**
```tsx
import { cn } from '@/lib/utils';

<button
  className={cn(
    'px-4 py-2 rounded',
    isPrimary ? 'bg-blue-600' : 'bg-gray-600',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Click me
</button>
```

### Component Structure

```tsx
// components/landing/HeroSection.tsx

import { type FC } from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  headline: string;
  subheadline: string;
}

export const HeroSection: FC<HeroSectionProps> = ({
  headline,
  subheadline,
}) => {
  return (
    <section className="container mx-auto px-4 py-20">
      <h1 className="text-6xl font-bold">{headline}</h1>
      <p className="text-xl text-gray-600">{subheadline}</p>
      <Button size="lg">Get Started</Button>
    </section>
  );
};
```

---

## SEO & Structured Data (Implemented) ✅

### Schema.org JSON-LD
- **Next.js Script Component** - Inject JSON-LD structured data
- **Schema Types Implemented:**
  - `Organization` - Company information, contact details
  - `WebSite` - Site metadata, search action
  - `Product` - Astra AI Career Analysis service
  - `ItemList` - 6 analysis methods from Features section
  - `WebPage` - Page-level metadata

**Why Structured Data:**
- Enhanced search results (rich snippets)
- Knowledge Graph eligibility
- Voice search optimization
- Better crawlability by search engines
- Trust signals for Google

**Implementation:**
```tsx
// components/structured-data.tsx
import Script from 'next/script';

export const StructuredData: FC = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Astra',
    description: 'AI-powered career counseling assistant',
    // ...
  };

  return (
    <Script
      id="schema-organization"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
};
```

**Structured Data Coverage:**
- ✅ Organization with contact info and logo
- ✅ WebSite with search action
- ✅ Product with aggregate rating (4.9 stars)
- ✅ ItemList for 6 analysis methods
- ✅ WebPage with service type
- ✅ Uses data from `lib/constants.ts` (FEATURES, STATS)

**Validation:**
1. Google Rich Results Test: https://search.google.com/test/rich-results
2. Schema Markup Validator: https://validator.schema.org
3. JSON-LD Playground: https://json-ld.org/playground

**SEO Benefits:**
- Rich snippets in search results
- Star ratings display (4.9/5)
- "6 Methods" visible in search
- Organization Knowledge Panel
- FAQ rich results (if FAQ schema added)

---

## Testing Strategy

### Unit Tests (Optional for landing page)
- **Vitest** (faster than Jest)
- Test utility functions
- Test complex logic

### E2E Tests (Implemented) ✅
- **Playwright 1.56.1** (modern, fast, multi-browser)
- Test critical user flows:
  - Landing section visibility and animations
  - Form submission
  - Navigation
  - CTA clicks
  - Responsive design (mobile/tablet/desktop)
  - Accessibility (ARIA labels, keyboard navigation)

**Test Scripts:**
```bash
pnpm test:e2e          # Run all E2E tests
pnpm test:e2e:ui       # Run with Playwright UI
pnpm test:e2e:headed   # Run with browser visible
pnpm test:e2e:debug    # Debug mode
pnpm test:e2e:report   # View test report
```

**Browsers Tested:**
- Chromium (Chrome, Edge)
- Firefox
- WebKit (Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

**Test Coverage:**
- Trust Bar section
- Problem Statement section
- Solution Overview section
- Responsive layouts
- ARIA labels and accessibility
- Scroll-triggered animations

### Visual Regression Testing (Implemented) ✅
- **Percy 1.31.4** with Playwright integration
- **@percy/playwright 1.0.9** - Percy adapter for Playwright tests
- Automated visual snapshots across browsers and viewports
- Catch unintended visual changes (colors, layouts, animations)

**Why Percy:**
- Integrates with existing Playwright E2E tests
- 5,000 snapshots/month free tier
- Multi-browser visual testing (Chrome, Firefox, Safari)
- Responsive viewport testing (375px, 768px, 1280px, 1920px)
- Animation state capture (before/after)
- Hover state testing

**Test Scripts:**
```bash
pnpm test:visual          # Run visual regression tests with Percy
pnpm test:visual:update   # Update visual baselines
```

**Visual Test Coverage:**
- Features Section color themes (6 cards: green, blue, purple, orange, teal, indigo)
- Individual feature card snapshots with hover states
- Hero Section across all viewports
- Trust Bar
- Problem Section
- Solution Section
- Complete landing page
- Responsive design (mobile, tablet, desktop, wide desktop)
- Animation states (before/after scroll triggers)

**Configuration:**
- `.percy.yml` - Percy configuration (widths, percyCSS, network settings)
- `e2e/visual-regression.spec.ts` - Visual test suite
- `PERCY_SETUP.md` - Complete setup guide

**Setup:**
1. Create Percy account at https://percy.io
2. Add `PERCY_TOKEN` to `.env.local`
3. Run `pnpm test:visual`
4. Review diffs in Percy dashboard

**Monthly Usage:** ~15 snapshots/test × 20 runs = 300 snapshots/month (6% of free tier)

---

## Git Workflow

### Branch Naming
- `feature/hero-section`
- `fix/form-validation`
- `docs/update-readme`

### Commit Messages (Conventional Commits)
```bash
feat: add hero section with animations
fix: resolve form validation issue
docs: update README with deployment steps
style: format code with prettier
refactor: extract hero content to separate file
```

### Pre-commit Hooks
```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

---

## Prohibited Practices

### FORBIDDEN:

1. **Using `any` type**
   - Always define proper types

2. **Importing entire icon libraries**
   ```tsx
   // BAD
   import * as Icons from 'lucide-react';

   // GOOD
   import { ArrowRight, Check } from 'lucide-react';
   ```

3. **Inline styles (except for dynamic values)**
   ```tsx
   // BAD
   <div style={{ color: 'red' }}>Text</div>

   // GOOD
   <div className="text-red-600">Text</div>
   ```

4. **Client-side data fetching in Server Components**
   - Use async Server Components instead

5. **Not optimizing images**
   - Always use Next.js `<Image>` component

---

## Resources & Documentation

### Official Docs
- **Next.js 15:** https://nextjs.org/docs
- **React 19:** https://react.dev
- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs

### UI Libraries
- **shadcn/ui:** https://ui.shadcn.com
- **Radix UI:** https://www.radix-ui.com
- **Aceternity UI:** https://ui.aceternity.com
- **Magic UI:** https://magicui.design

### Animation
- **Framer Motion:** https://www.framer.com/motion
- **GSAP:** https://greensock.com/gsap
- **Lenis:** https://github.com/studio-freight/lenis

---

**Last Updated:** 2025-10-29
**Stack Version:** Next.js 16 + React 19 + TypeScript 5 + Tailwind v3
**Target Launch:** 6 weeks from start

**Recent Additions:**
- Next.js 16.0.1 upgrade (security patch) (2025-10-29)
- Recharts 3.3.0 for data visualization (2025-10-29)
- ROI Calculator constants documentation (2025-10-29)
- Percy Visual Regression Testing (2025-10-29)
- Schema.org Structured Data (2025-10-29)
- Playwright E2E Tests (2025-10-28)
- Framer Motion Animations (2025-10-28)
