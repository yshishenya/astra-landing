# Astra Landing Page

> Marketing website для AI-ассистента внутрикорпоративного карьерного консультирования

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/) [![Tailwind](https://img.shields.io/badge/Tailwind-v3.4.18-38B6FF)](https://tailwindcss.com/) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![Status](https://img.shields.io/badge/Phase_1-Complete-brightgreen)]()

---

## 🎯 Что такое Astra?

**Astra** — AI-ассистент, который анализирует резюме сотрудников и генерирует персонализированные рекомендации по карьерному развитию **ВНУТРИ компании** за 90 секунд.

### Ключевые УТП
- ⚡ **90 секунд** вместо 2-3 часов ручного анализа
- 🎯 **6 методов анализа** одновременно (SWOT, Holland, ИПР, Soft Skills, etc.)
- 🏢 **Внутреннее развитие**, не поиск работы вовне
- 💰 **162x ROI** в первый год, окупается за 2-3 дня

---

## 🚀 Этот репозиторий

Marketing landing page для Astra, разработанный с использованием современного стека:

### Tech Stack
- **Framework:** Next.js 15.5.6 (App Router, React Server Components)
- **Language:** TypeScript 5.9.3 (strict mode, no `any` types)
- **Styling:** Tailwind CSS v3.4.18 с кастомными design tokens
- **UI Components:** shadcn/ui (Button, Card, Input, Label)
- **Animations:** Framer Motion 11.18.2 + Lenis 1.3.13
- **Email:** Resend 4.8.0 + React Email 3.0.7
- **Package Manager:** pnpm 10.20.0
- **Deployment:** Vercel (или Cloudflare Pages)

### Build Performance ✅
- **First Load JS:** 102 kB (48% under target)
- **Build Status:** ✓ Passing
- **Type Safety:** ✓ Strict mode enabled
- **Bundle Size:** Optimized

### Landing Page Structure
11 секций, оптимизированных для B2B SaaS конверсии:
1. Hero Section (Above the fold)
2. Trust Bar
3. Problem Statement (Pain Points)
4. Solution Overview (How It Works)
5. Key Features (6 методов анализа)
6. Results & Metrics
7. Use Cases
8. Social Proof (Testimonials)
9. Pricing Table
10. FAQ
11. Final CTA

---

## 📚 Документация

### Для разработчиков
- **[Memory Bank](./.memory_bank/README.md)** - Единый источник правды
- **[Tech Stack](./.memory_bank/tech_stack.md)** - Технологии и best practices
- **[Landing Structure](./.memory_bank/landing_structure.md)** - Детальная структура
- **[Current Tasks](./.memory_bank/current_tasks.md)** - Актуальные задачи

### Для маркетологов
- **[Product Brief](./.memory_bank/product_brief.md)** - О продукте Astra
- **[Copywriting Assets](./.memory_bank/copywriting_assets.md)** - Готовые тексты
- **[Marketing Strategy](./.memory_bank/marketing_strategy.md)** - Каналы и метрики

### Для дизайнеров
- **[Design System](./.memory_bank/design_system.md)** - Цвета, типография, компоненты
- **[Mockup Concept](./design/ASTRA_MOCKUP_DESIGN_CONCEPT.md)** - Детальная концепция мокапов
- **[Design Trends 2025](./design/LANDING_DESIGN_TRENDS_2025.md)** - Исследование трендов
- **[Tools & Resources](./design/TOOLS_AND_RESOURCES.md)** - Инструменты для дизайна

---

## 🛠️ Быстрый старт

### Prerequisites
- **Option 1 (Local):** Node.js 22+ (LTS) + pnpm 9+
- **Option 2 (Docker):** Docker 20+ + Docker Compose 2+

---

### 🐳 Option 1: Docker (Рекомендуется)

**Самый простой способ запустить проект:**

```bash
# 1. Clone repository
git clone https://github.com/your-org/astra_landing.git
cd astra_landing

# 2. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# 3. Build and run with Docker Compose
docker-compose up --build

# 4. Open http://localhost:3000
```

**Преимущества Docker:**
- ✅ Не нужно устанавливать Node.js/pnpm локально
- ✅ Изолированная среда
- ✅ Одинаковое окружение на всех машинах
- ✅ Production-ready сборка
- ✅ Автоматический health check

**Дополнительные команды:**
```bash
# Запустить в фоне
docker-compose up -d

# Production режим (с resource limits)
docker-compose -f docker-compose.prod.yml up -d

# Остановить
docker-compose down

# Пересобрать образ
docker-compose up --build --force-recreate

# Просмотр логов
docker-compose logs -f

# Проверить health
curl http://localhost:3000/api/health

# Мониторинг контейнера
./scripts/monitor-containers.sh astra-landing-prod
```

**Автоматизированная сборка:**
```bash
# Быстрая сборка с оптимизациями
./scripts/docker-build.sh prod

# Development сборка
./scripts/docker-build.sh dev

# Test сборка с security audit
./scripts/docker-build.sh test
```

---

### 💻 Option 2: Local Development

```bash
# 1. Clone repository
git clone https://github.com/your-org/astra_landing.git
cd astra_landing

# 2. Install dependencies
pnpm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# 4. Run development server
pnpm dev

# 5. Open http://localhost:3000
```

**Build for production:**

```bash
pnpm build
pnpm start
```

---

## 📁 Project Structure

```
astra_landing/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── api/               # API routes
├── components/
│   ├── landing/           # Landing-specific (11 sections)
│   ├── ui/                # Reusable UI (shadcn)
│   └── shared/            # Shared components
├── lib/                   # Utilities
├── public/                # Static assets
├── styles/                # Global styles
├── design/                # 🎨 Design documentation
│   ├── README.md          # Design docs index
│   ├── ASTRA_MOCKUP_DESIGN_CONCEPT.md
│   ├── LANDING_DESIGN_TRENDS_2025.md
│   ├── TOOLS_AND_RESOURCES.md
│   └── CODE_EXAMPLES.md
├── .memory_bank/          # AI-assisted development context
└── docs/                  # Full documentation
```

---

## 🎨 Design System

### Colors (извлечены из astra.png)
- **Primary (Cyan):** #22d3ee
- **Secondary (Teal):** #0ea5e9
- **Accent (Blue):** #2563eb
- **Gradient:** 135deg от Cyan через Teal к Blue

### Typography
- **Body:** Inter (Latin + Cyrillic)
- **Display/Headlines:** Manrope (Latin + Cyrillic)
- **Headline:** 48-72px (32-48px mobile), Bold/ExtraBold
- **Body:** 16-18px, Regular

### Responsive Breakpoints
- **Desktop:** 1024px+ (lg)
- **Tablet:** 768px - 1023px (md)
- **Mobile:** < 768px (sm)

### Spacing Scale
- **Section:** 120px desktop / 80px mobile
- **Component:** 60px desktop / 40px mobile

---

## 🐳 Docker Optimization

**Ultra-Optimized Container Setup:**

### Key Features
- ✅ **Multi-stage build** - 4 stages for minimal footprint (~150 MB)
- ✅ **BuildKit cache mounts** - 10-100x faster rebuilds
- ✅ **Security scanning** - Trivy + Hadolint integration
- ✅ **Type checking** - Fail fast on TypeScript errors
- ✅ **Non-root user** - Enhanced security (nextjs:1001)
- ✅ **Health checks** - Proactive monitoring
- ✅ **Resource limits** - CPU/Memory constraints
- ✅ **CI/CD ready** - GitHub Actions workflow

### Image Optimization Results
- **Before:** ~800 MB (full Node.js + dev dependencies)
- **After:** ~150 MB (standalone Alpine-based image)
- **Reduction:** 81% smaller

### Build Performance
- **Initial build:** 5-8 minutes
- **Cached rebuild:** 10-30 seconds (90% faster!)
- **Dependency update:** 30-60 seconds (85% faster!)

### Production Deployment
```bash
# Production with Nginx reverse proxy
docker-compose -f docker-compose.prod.yml up -d

# Monitor container
./scripts/monitor-containers.sh

# Security scan
trivy image astra-landing:latest
```

📄 **Full Report:** [DOCKER_OPTIMIZATION_REPORT.md](DOCKER_OPTIMIZATION_REPORT.md)

---

## 🚦 Performance Targets

- **Lighthouse Score:** > 90 (all metrics)
- **LCP:** < 2.5s
- **INP:** < 200ms
- **CLS:** < 0.1

---

## 🧪 Testing

### Unit & Integration Tests
```bash
# Run all tests
pnpm test

# Run with UI
pnpm test:ui

# Generate coverage report
pnpm test:coverage
```

### E2E Tests (Playwright)
```bash
# Run E2E tests
pnpm test:e2e

# Run with UI
pnpm test:e2e:ui

# Run in headed mode
pnpm test:e2e:headed

# Debug mode
pnpm test:e2e:debug
```

### Visual Regression Tests (Percy)
```bash
# Run visual tests
pnpm test:visual

# Update baselines after intentional changes
pnpm test:visual:update
```

**Visual Testing Coverage:**
- ✅ Feature cards (6 color themes)
- ✅ All landing page sections
- ✅ Responsive breakpoints (375px, 768px, 1280px, 1920px)
- ✅ Cross-browser testing (Chrome, Firefox, Safari)
- ✅ Hover states and animations

📄 **Full Guide:** [PERCY_SETUP.md](PERCY_SETUP.md)

---

## 📈 Development Roadmap

### ✅ Phase 0: Planning (Completed)
- [x] Анализ требований
- [x] Выбор tech stack
- [x] Структура landing page
- [x] Memory Bank setup
- [x] Design research и mockup концепция

### ✅ Phase 1: Foundation (Completed - 2025-10-29)
- [x] Next.js 15 project setup
- [x] TypeScript + ESLint + Prettier конфигурация
- [x] Tailwind CSS v3 с design tokens
- [x] shadcn/ui компоненты (Button, Card, Input, Label)
- [x] Framer Motion + Lenis установка
- [x] Project structure (app/, components/, lib/)
- [x] Базовая Hero Section с CTAs и статистикой
- [x] Build успешно (102 kB First Load JS)

### 🔄 Phase 2: Core Sections (In Progress - Week 1-2)
- [ ] Header + Navigation (responsive)
- [ ] Footer с links
- [ ] Trust Bar (logo carousel)
- [ ] Problem Statement (3 pain points)
- [ ] Solution Overview (How It Works)

### 📋 Phase 3: Features (Week 3-4)
- [ ] Key Features Bento Grid (6 методов)
- [ ] Results & Metrics section
- [ ] Use Cases section
- [ ] Social Proof (testimonials)

### 📋 Phase 4: Conversion (Week 5)
- [ ] Pricing Table (3 plans)
- [ ] FAQ accordion
- [ ] Contact Forms + Resend integration
- [ ] Analytics setup (GA4/Plausible)

### 📋 Phase 5: Launch (Week 6)
- [ ] Performance optimization (< 100 kB target)
- [ ] Testing (mobile, accessibility, SEO)
- [ ] Deployment to Vercel
- [ ] DNS setup

**Target:** 6 weeks to MVP launch
**Current Status:** Phase 1 Complete ✅, начинаем Phase 2

---

## 🤝 Contributing

Этот проект использует **AI-assisted development** с Claude Code.

### Before starting work:
1. Read **[.memory_bank/README.md](./.memory_bank/README.md)**
2. Check **[current_tasks.md](./.memory_bank/current_tasks.md)**
3. Follow **[coding_standards.md](./.memory_bank/guides/coding_standards.md)**

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details

---

## 📞 Contact

- **Email:** support@astra.ai
- **Website:** https://astra.ai (coming soon)
- **LinkedIn:** [Astra](https://linkedin.com/company/astra)

---

**Built with ❤️ using Next.js 15, AI-assisted development, and modern web technologies**
