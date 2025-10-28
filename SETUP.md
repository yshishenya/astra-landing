# Astra Landing Page - Setup Guide

**Last Updated:** 2025-10-29
**Status:** Phase 1 Complete ✅

## Project Initialized ✅

The Next.js 15 project has been successfully set up with:

- ✅ Next.js 15.5.6 with App Router
- ✅ TypeScript 5.9.3 (strict mode, no `any` types)
- ✅ Tailwind CSS v3.4.18 with custom design tokens
- ✅ ESLint + Prettier configuration
- ✅ Project structure (app/, components/, lib/)
- ✅ Design system with Astra brand colors
- ✅ Hero section with CTAs and stats
- ✅ UI components (Button, Card, Input, Label)
- ✅ Build успешно (102 kB First Load JS)

## Prerequisites

- Node.js 22+ (recommended)
- pnpm 9+ (installed globally)

## Installation

Dependencies are already installed. If you need to reinstall:

```bash
pnpm install
```

## Development

Start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000) (or port 3001 if 3000 is in use).

## Project Structure

```
astra_landing/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with fonts and metadata
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles with design tokens
├── components/
│   ├── landing/             # Landing page sections (to be implemented)
│   └── ui/                  # Reusable UI components (to be implemented)
├── lib/
│   ├── constants.ts         # All copy content from copywriting_assets.md
│   ├── types.ts             # TypeScript type definitions
│   └── utils.ts             # Utility functions (cn, formatters)
├── public/
│   ├── astra.png           # Astra avatar (brand colors source)
│   └── images/             # Other images
├── .memory_bank/            # Project documentation
│   ├── README.md           # Memory bank navigation
│   ├── product_brief.md    # Product overview
│   ├── tech_stack.md       # Technology choices
│   ├── landing_structure.md # Section specifications
│   ├── copywriting_assets.md # All copy content
│   └── current_tasks.md    # Development tasks
└── design/                  # Design documentation
    ├── ASTRA_MOCKUP_DESIGN_CONCEPT.md
    ├── LANDING_DESIGN_TRENDS_2025.md
    ├── TOOLS_AND_RESOURCES.md
    └── CODE_EXAMPLES.md
```

## Design System

### Colors (from astra.png)
- **Primary (Cyan)**: #22d3ee
- **Secondary (Teal)**: #0ea5e9
- **Accent (Blue)**: #2563eb

### Fonts
- **Body**: Inter (sans-serif)
- **Display/Headlines**: Manrope (sans-serif)

### CSS Variables
All design tokens are defined in `app/globals.css`:
- Colors: `--color-primary`, `--color-secondary`, `--color-accent`
- Spacing: `--spacing-section`, `--spacing-component`
- Typography: `--font-size-hero-xl`, `--font-size-section-title`
- Gradients: `--gradient-hero`

### Utility Classes
- `.container-custom` - Max-width container with padding
- `.section-spacing` - Standard section padding (80px mobile, 120px desktop)
- `.gradient-text` - Primary-secondary-accent gradient text
- `.glass-effect` - Glassmorphism effect
- `.btn-primary`, `.btn-secondary`, `.btn-outline` - Button styles
- `.card`, `.card-hover` - Card styles

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server

# Build
pnpm build           # Build for production
pnpm start           # Start production server

# Code Quality
pnpm lint            # Run ESLint
pnpm type-check      # Check TypeScript types
pnpm format          # Format with Prettier
pnpm format:check    # Check formatting
```

## Next Steps

✅ **Phase 1 Complete!** Все базовые настройки завершены.

Следующие приоритеты (Phase 2):

1. **[COMP-01]** Create Header + Navigation (responsive)
   - Logo + brand
   - Navigation links (Features, Pricing, FAQ, Contact)
   - Mobile menu (hamburger)
   - Sticky header на scroll
   - CTA button в header

2. **[COMP-02]** Create Footer с links
   - 4-5 колонок ссылок
   - Copyright, contacts
   - Newsletter subscription

3. **[COMP-04]** Trust Bar (логотипы клиентов)
   - Infinite scroll carousel
   - "120+ компаний используют Астру"

4. **[COMP-05]** Problem Statement (3 pain points)
   - 3 карточки с статистикой
   - Анимация при scroll

См. подробности в [.memory_bank/current_tasks.md](./.memory_bank/current_tasks.md)

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Then fill in your API keys:
- `RESEND_API_KEY` - For email functionality (forms)
- `NEXT_PUBLIC_GA_ID` - For Google Analytics (optional)

## Documentation

All project documentation is in `.memory_bank/`:

- **Product Brief**: [.memory_bank/product_brief.md](./.memory_bank/product_brief.md)
- **Tech Stack**: [.memory_bank/tech_stack.md](./.memory_bank/tech_stack.md)
- **Landing Structure**: [.memory_bank/landing_structure.md](./.memory_bank/landing_structure.md)
- **Copywriting Assets**: [.memory_bank/copywriting_assets.md](./.memory_bank/copywriting_assets.md)
- **Current Tasks**: [.memory_bank/current_tasks.md](./.memory_bank/current_tasks.md)

Design documentation is in `design/`:
- **Mockup Concept**: [design/ASTRA_MOCKUP_DESIGN_CONCEPT.md](./design/ASTRA_MOCKUP_DESIGN_CONCEPT.md)
- **Design Trends**: [design/LANDING_DESIGN_TRENDS_2025.md](./design/LANDING_DESIGN_TRENDS_2025.md)

## Tech Stack Details

- **Framework**: Next.js 15.5.6 (App Router, React Server Components)
- **Language**: TypeScript 5.9.3 (strict mode, no `any` types)
- **Styling**: Tailwind CSS v3.4.18
- **UI Components**: shadcn/ui (Button, Card, Input, Label), lucide-react (icons)
- **Animations**: Framer Motion 11.18.2, Lenis 1.3.13
- **Forms**: React Hook Form 7.65.0, Zod 3.25.76
- **Email**: Resend 4.8.0, React Email 3.0.7
- **Package Manager**: pnpm 10.20.0

## Performance Targets

- **Lighthouse Score**: > 90 (all metrics)
- **LCP**: < 2.5s
- **INP**: < 200ms
- **CLS**: < 0.1
- **Bundle Size**: < 200 KB (first load)

**Current Performance:**
- ✅ **First Load JS**: 102 kB (48% under target)
- ✅ **Build**: Passing
- ✅ **Type Safety**: Strict mode enabled

## Support

For questions or issues, refer to:
- [.memory_bank/README.md](./.memory_bank/README.md) - Navigation hub
- [Current Tasks](./.memory_bank/current_tasks.md) - Development roadmap
- [SETUP.md](./SETUP.md) - This file

---

**Last Updated**: 2025-10-29
**Status**: Phase 1 Complete ✅ - Ready for Phase 2 Development
