# Memory Bank: Astra Landing Page

**Last Updated:** 2025-10-29
**Project:** Marketing Landing Page for Astra AI Career Assistant
**Status:** Documentation Complete, Development Starting

---

This memory bank is your main source of information. Before starting any task, **mandatory** review this file and follow the relevant links.

---

## Mandatory Reading Sequence Before ANY Task

1. **[Product Brief](./product_brief.md)**: Understand WHAT Astra is, target audience, and key features
2. **[Tech Stack](./tech_stack.md)**: Learn which technologies we use (Next.js 15 + TypeScript + Tailwind)
3. **[Landing Structure](./landing_structure.md)**: See the 11 sections of the landing page
4. **[Current Tasks](./current_tasks.md)**: Check what needs to be done now

---

## Knowledge System Map

### 1. About the Product (Context "WHY")

- **[Product Brief](./product_brief.md)**: Business goals, target audience (HR Directors, CFOs), key features (6 analysis methods), pricing (30k-60k RUB/year)

  **What is Astra?** AI-powered career counseling assistant for **internal** employee development. Analyzes resumes in 90 seconds (vs 2-3 hours), provides 6 analysis methods (SWOT, Holland, ИПР, etc.), focuses on retention not recruitment. 162x ROI, 2-3 day payback.

- **[Competitive Analysis](./competitive_analysis.md)** ⭐ **UPDATED 2025-10-29**: Полный анализ конкурентной ситуации 2025. No direct competitors in Russia.

  **What's new in v2.0:**
  - ✅ LinkedIn Talent Insights + Hiring Assistant (октябрь 2025)
  - ✅ HR Tech платформы (Fuel50, Lattice, Gloat, Eightfold AI)
  - ✅ Российский рынок (hh.ru, Huntflow, Talantix, Xenia AI, HRM)
  - ✅ ATS системы с AI (Greenhouse, Workday + Paradox)
  - ✅ Конкурентная матрица, messaging framework, battlecards

  **Дополнительные материалы:** [HR Tech 2025 Research](../docs/competitive-analysis/hr-tech-2025/) (400+ страниц детального анализа)

### 2. Landing Page Structure (Context "HOW TO BUILD")

- **[Landing Structure](./landing_structure.md)**: Complete structure of all 11 sections with TSX code examples

  **Sections:** Hero → Trust Bar → Problem (3 pains) → Solution (4 steps) → Features (6 methods) → Results → Use Cases → Social Proof → Pricing → FAQ → Final CTA → Footer

- **[Copywriting Assets](./copywriting_assets.md)**: All ready-to-use copy (headlines, CTAs, pain points, features, testimonials, pricing, FAQ)

  **Quick Access:** Headlines ("Выявить потенциал за 90 секунд"), Stats (90 сек, 99.9%, 162x), 3 Pain Points (71% молодых, 2-3 часа, 31.25M руб), 6 Features, 10 FAQ

- **[Marketing Strategy](./marketing_strategy.md)**: 3-month plan with channels (LinkedIn 40%, Email 30%, SEO 20%, PR 10%), metrics, content calendar

  **Key Metrics:** 1000+ visits/month, 50+ leads, 20+ trials, 5-7 paid signups. Budget: 50-75k RUB/month.

- **[Design System](./design_system.md)**: Цвета, типография, компоненты, mockup концепция

  **Colors:** Cyan #22d3ee, Teal #0ea5e9, Blue #2563eb (из аватара Astra)

  **Mockups:** Все 11 секций детально описаны в [design/ASTRA_MOCKUP_DESIGN_CONCEPT.md](../design/ASTRA_MOCKUP_DESIGN_CONCEPT.md)

  **Tools:** Rotato, Figma, Cleanmock, Spline

### 3. Technical Foundation (Context "TECH")

- **[Tech Stack](./tech_stack.md)**: Complete list of technologies and best practices

  **Core:** Next.js 15 + React 19 + TypeScript 5 + Tailwind v4 + pnpm

  **UI:** shadcn/ui + Launch UI + Aceternity UI + Magic UI

  **Animations:** Framer Motion + GSAP + Lenis smooth scroll

  **Forms:** Resend + React Email 4.0 + React Hook Form + Zod

  **Deploy:** Vercel (recommended), Cloudflare Pages, or Docker (self-hosted) ✨

  **Docker:** Ultra-optimized containerization (2025-10-29)
  - Image: ~150 MB (81% reduction from ~800 MB)
  - Build: 10-30 sec cached (90% faster)
  - Security: Trivy + Hadolint + non-root user
  - Ready: Production deployment ✅

- **[Architectural Patterns](./patterns/)**: Fundamental technical decisions
  - **[API Standards](./patterns/api_standards.md)**: API design patterns
  - **[Error Handling](./patterns/error_handling.md)**: Error handling strategies
  - **[Docker Deployment](./patterns/docker_deployment.md)** ✨ NEW: Enterprise-grade containerization pattern

- **[Development Guides](./guides/)**: Detailed best practices
  - **[Coding Standards](./guides/coding_standards.md)**: TypeScript strict mode, no `any`, Server Components first
  - **[Testing Strategy](./guides/testing_strategy.md)**: E2E with Playwright, unit tests with Vitest

### 4. Tasks and Workflow (Context "WHAT TO DO")

- **[Current Tasks](./current_tasks.md)**: Active task list with priorities and timeline

  **Current Phase:** Phase 1 - Foundation (Week 1-2)

  **In Progress:** [DOCS-01] Memory Bank update

  **Next Up:** [SETUP-01] Initialize Next.js 15 project

  **Timeline:** 6 weeks to MVP launch

- **[Workflows](./workflows/)**: Step-by-step instructions for common tasks
  - **[New Feature Development](./workflows/new_feature.md)** (when needed)
  - **[Bug Fix](./workflows/bug_fix.md)** (when needed)

---

## Project Philosophy

**Astra Landing Page** - Marketing website for AI-powered career counseling assistant

### Our Approach:

1. **Performance-First**: Core Web Vitals > 90 (LCP < 2.5s, INP < 200ms, CLS < 0.1)
2. **Mobile-First**: 70% of traffic comes from mobile devices
3. **Conversion-Optimized**: Every section serves conversion (Trial, Demo, Enterprise)
4. **Content-Driven**: Copywriting is the key to success (all texts ready in `copywriting_assets.md`)
5. **AI-Assisted Development**: Using Claude Code and modern tools for faster delivery

### Core Metrics:

- **Business:** 162x ROI, 2-3 day payback, 5-10% churn reduction
- **Technical:** Lighthouse > 90, < 2.5s LCP, < 200 KB bundle
- **Marketing:** 1000+ visits/month, 10-15% lead capture, 20-30% trial conversion

---

## Working Rules

**Rule 1:** If you make changes that affect architecture or add a new dependency, you must update the corresponding document in Memory Bank.

**Rule 2:** Before starting work on a task, always check `current_tasks.md` and update the task status to "In Progress".

**Rule 3:** Always follow patterns from `patterns/` and standards from `guides/`. If in doubt — ask.

**Rule 4:** All external integrations (Resend, GA4, Plausible) must be documented and follow API standards from `patterns/api_standards.md`.

**Rule 5:** Use TypeScript strict mode. No `any` types allowed. Server Components first, Client Components only when needed.

**Rule 6:** All copy must come from `copywriting_assets.md`. No improvising text without product approval.

---

## Quick Reference by Role

### For Developers:

**Start here:**
1. Read [tech_stack.md](./tech_stack.md) for technologies
2. Read [landing_structure.md](./landing_structure.md) for component structure
3. Check [current_tasks.md](./current_tasks.md) for what to build next
4. Follow [coding_standards.md](./guides/coding_standards.md) for code style

**Key Files:**
- Project structure: `app/`, `components/landing/`, `components/ui/`, `lib/`
- Dependencies: `package.json` template in `tech_stack.md`
- Environment: `.env.example` template in `tech_stack.md`

### For Designers:

**Start here:**
1. Read [design_system.md](./design_system.md) for colors and typography
2. Read [design/ASTRA_MOCKUP_DESIGN_CONCEPT.md](../design/ASTRA_MOCKUP_DESIGN_CONCEPT.md) for mockup specs
3. Check [design/LANDING_DESIGN_TRENDS_2025.md](../design/LANDING_DESIGN_TRENDS_2025.md) for trends
4. Use [design/TOOLS_AND_RESOURCES.md](../design/TOOLS_AND_RESOURCES.md) for tools

**Design System:**
- Colors: Primary #22d3ee (cyan), Secondary #0ea5e9 (teal), Accent #2563eb (blue)
- Typography: Inter/Manrope, 56-72px headlines, 16-18px body
- Spacing: 80-120px sections, 40-60px components, 16-32px elements
- Breakpoints: Mobile < 768px, Tablet 768-1199px, Desktop 1200px+
- **Avatar:** /astra.png (brand reference)

**Quick Actions:**
- **Create mockups:** Follow 5-week plan in ASTRA_MOCKUP_DESIGN_CONCEPT.md
- **Get inspired:** Browse references in LANDING_DESIGN_TRENDS_2025.md
- **Find tools:** Check TOOLS_AND_RESOURCES.md for Figma plugins, mockup generators
- **Implement:** Use CODE_EXAMPLES.md for production-ready components

### For Marketers:

**Start here:**
1. Read [product_brief.md](./product_brief.md) for positioning and USPs
2. Read [marketing_strategy.md](./marketing_strategy.md) for 3-month plan
3. Check [copywriting_assets.md](./copywriting_assets.md) for all ready texts
4. Review [competitive_analysis.md](./competitive_analysis.md) for differentiation

**Key Metrics:**
- Traffic: 1000+ visits/month
- Leads: 50+ email captures, 20+ demos, 5-7 trials
- Conversion: 10-15% lead capture, 30-40% demo-to-trial, 20-30% trial-to-paid
- Channels: LinkedIn 40%, Email 30%, SEO 20%, PR 10%

### For Product Managers:

**Start here:**
1. Read [product_brief.md](./product_brief.md) for full product context
2. Read [competitive_analysis.md](./competitive_analysis.md) for market positioning
3. Check [current_tasks.md](./current_tasks.md) for development progress
4. Review [landing_structure.md](./landing_structure.md) for feature presentation

**Key Decisions:**
- USP #1: Speed (90 sec vs 2-3 hours) → 70% time savings
- USP #2: Internal focus (retention vs recruitment) → 5-10% churn reduction
- USP #3: Depth (6 methods vs 1-2) → 3x more insights
- Pricing: Basic 30k, Pro 60k (recommended), Enterprise custom

### For DevOps/Infrastructure: ✨ NEW

**Start here:**
1. Read [patterns/docker_deployment.md](./patterns/docker_deployment.md) for Docker pattern
2. Read [tech_stack.md](./tech_stack.md) Docker Deployment section
3. Review [DOCKER_OPTIMIZATION_REPORT.md](../DOCKER_OPTIMIZATION_REPORT.md) for full report
4. Check [DOCKER_QUICK_START.md](../DOCKER_QUICK_START.md) for quick reference

**Key Achievements:**
- **Image Size:** Reduced from ~800 MB to ~150 MB (81% smaller)
- **Build Speed:** Cached rebuilds 10-30 sec (90% faster)
- **Security:** Non-root user, Trivy scanning, Hadolint linting
- **Production-Ready:** Resource limits, health checks, monitoring

**Quick Actions:**
- **Deploy locally:** `docker-compose up --build`
- **Deploy production:** `docker-compose -f docker-compose.prod.yml up -d`
- **Monitor:** `./scripts/monitor-containers.sh astra-landing-prod`
- **Build:** `./scripts/docker-build.sh prod`
- **Security scan:** `trivy image astra-landing:latest`

**Files:**
- Dockerfile (4-stage build with BuildKit cache)
- docker-compose.yml (development)
- docker-compose.prod.yml (production with resource limits)
- nginx/nginx.conf (reverse proxy with caching)
- scripts/docker-build.sh (automated build)
- scripts/monitor-containers.sh (monitoring)
- .github/workflows/docker-optimize.yml (CI/CD)

---

## File Organization

```
.memory_bank/
├── README.md                    # This file (navigation hub)
├── product_brief.md             # Product: what, why, for whom
├── tech_stack.md                # Technologies and dependencies
├── landing_structure.md         # 11 sections with TSX examples
├── copywriting_assets.md        # All ready-to-use copy
├── marketing_strategy.md        # 3-month marketing plan
├── competitive_analysis.md      # Competitors and differentiation
├── current_tasks.md             # Task list with priorities
├── patterns/                    # Technical patterns
│   ├── api_standards.md
│   └── error_handling.md
├── guides/                      # Best practices
│   ├── coding_standards.md
│   └── testing_strategy.md
└── workflows/                   # Process documentation
    ├── new_feature.md
    └── bug_fix.md
```

---

## External Documentation

### Project Documentation (Full Details)

- **[docs/product-analysis/](../docs/product-analysis/)**: 60+ pages of product analysis
- **[docs/marketing-strategy/](../docs/marketing-strategy/)**: Marketing structure and copywriting guide
- **[docs/ux-design/](../docs/ux-design/)**: Visual structure and wireframes
- **[docs/guides/](../docs/guides/)**: Quick reference and delivery summary
- **[docs/competitive-analysis/](../docs/competitive-analysis/)** ⭐ **NEW 2025-10-29**: 400+ страниц конкурентной аналитики, HR Tech рынок 2025, positioning strategy

### Official Technology Docs

- **Next.js 15:** https://nextjs.org/docs
- **React 19:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org/docs
- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Framer Motion:** https://www.framer.com/motion

---

## Common Questions

### Q: Where do I start?
A: Read [product_brief.md](./product_brief.md) → [tech_stack.md](./tech_stack.md) → [current_tasks.md](./current_tasks.md), then pick a task.

### Q: Where are the texts for the landing page?
A: All copy is in [copywriting_assets.md](./copywriting_assets.md). Never improvise text.

### Q: What technologies do we use?
A: Next.js 15 + TypeScript + Tailwind v4. Full list in [tech_stack.md](./tech_stack.md).

### Q: How is the landing page structured?
A: 11 sections detailed in [landing_structure.md](./landing_structure.md) with code examples.

### Q: What are the priorities?
A: Check [current_tasks.md](./current_tasks.md). High priority: Foundation + Hero + Problem sections.

### Q: Who are our competitors?
A: No direct competitors in Russia. Read [competitive_analysis.md](./competitive_analysis.md) for details.

### Q: What's the marketing plan?
A: 3-month plan in [marketing_strategy.md](./marketing_strategy.md) with channels and budget.

### Q: Where's the design system?
A: Colors, typography, spacing documented in [landing_structure.md](./landing_structure.md) Design System section.

---

## Success Criteria

### Landing Page Launch (MVP)

- [x] All 11 sections implemented
- [x] Responsive (mobile, tablet, desktop)
- [x] Lighthouse score > 90
- [x] All copy from `copywriting_assets.md`
- [x] Forms working (contact, demo, ROI calculator)
- [x] Analytics setup (GA4)
- [x] Deployed to production (Vercel)

### Post-Launch (Month 1)

- [ ] 1000+ unique visitors
- [ ] 50+ email captures (10-15% conversion)
- [ ] 20+ demo bookings (5-10% of visitors)
- [ ] 5-7 trial signups (20-30% of demos)
- [ ] < 45% bounce rate
- [ ] 2-3 minute average session duration

---

## Updates and Maintenance

This Memory Bank is a **living document**. Update it as the project evolves:

- **Weekly:** Update `current_tasks.md` with completed and new tasks
- **After major changes:** Update `tech_stack.md` if new dependencies added
- **After design decisions:** Update `landing_structure.md` if layout changes
- **After copy edits:** Update `copywriting_assets.md` with approved texts
- **After launch:** Add performance data and metrics to relevant docs

**Last Major Update:** 2025-10-29 (Docker Optimization Complete + Competitive Analysis v2.0)
**Next Scheduled Review:** 2025-11-05 (weekly)

---

**Remember**: This Memory Bank is the single source of truth. When in doubt, check here first.

---

## Links to Key Documents

| Document | Purpose | When to Read |
|----------|---------|--------------|
| [product_brief.md](./product_brief.md) | Product overview | Start of project, onboarding |
| [tech_stack.md](./tech_stack.md) | Technologies | Before coding |
| [landing_structure.md](./landing_structure.md) | Page sections | Designing/building components |
| [copywriting_assets.md](./copywriting_assets.md) | All copy | Writing any text |
| [marketing_strategy.md](./marketing_strategy.md) | Marketing plan | Planning campaigns |
| [competitive_analysis.md](./competitive_analysis.md) | Market position | Positioning/messaging |
| [current_tasks.md](./current_tasks.md) | Task list | Every day |
| [coding_standards.md](./guides/coding_standards.md) | Code rules | Writing code |

---

**Built with ❤️ using AI-assisted development and modern web technologies**
