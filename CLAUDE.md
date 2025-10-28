# Claude Code Configuration for Astra Landing Page

## At the Start of ANY Work Session

**MANDATORY** perform the following actions:

1. Read the **`.memory_bank/README.md`** file completely.
2. Follow the mandatory reading sequence instructions from this file:
   - **[Tech Stack](.memory_bank/tech_stack.md)**: Learn which technologies, libraries and versions we use
   - **[Coding Standards](.memory_bank/guides/coding_standards.md)**: Formatting rules, naming conventions and best practices
   - **[Current Tasks](.memory_bank/current_tasks.md)**: List of active tasks and current team focus
3. Follow links to relevant documents depending on task type:
   - For new features → study specification in `.memory_bank/landing_structure.md`
   - For bugs → study workflow `.memory_bank/workflows/bug_fix.md`
   - For technology questions → check `.memory_bank/tech_stack.md`

---

## About the Project: Astra Landing Page

**Astra Landing Page** - Marketing website for AI-powered career counseling assistant

### Key Project Features:

#### 1. Next.js 15 Architecture
- Using **Next.js 15** with App Router
- **React Server Components (RSC)** by default - reduce client-side JavaScript
- **Client Components** only when needed (interactivity, hooks, browser APIs)
- Full **TypeScript** with strict mode enabled
- **Framework**: Next.js 15.0.0 with React 19

#### 2. TypeScript Best Practices
**CRITICALLY IMPORTANT:**
- All functions MUST have complete type hints
- NO `any` types allowed - always define proper types
- Use strict mode with all options enabled
- Define interfaces for all data structures
- Use type inference where appropriate

Correct approach example:
```typescript
import { type FC } from 'react';

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText: string;
}

export const HeroSection: FC<HeroSectionProps> = ({
  headline,
  subheadline,
  ctaText,
}) => {
  return (
    <section className="container mx-auto px-4 py-20">
      <h1 className="text-6xl font-bold">{headline}</h1>
      <p className="text-xl text-gray-600">{subheadline}</p>
      <button className="btn-primary">{ctaText}</button>
    </section>
  );
};
```

#### 3. React Server Components vs Client Components
**CRITICALLY IMPORTANT:**
- Server Components by default (no `'use client'` directive)
- Client Components only when you need:
  - State management (useState, useReducer)
  - Effects (useEffect)
  - Event handlers (onClick, onChange)
  - Browser APIs (window, localStorage)
  - Third-party libraries that use React hooks

Server Component example:
```typescript
// app/page.tsx - Server Component by default
import { HeroSection } from '@/components/landing/hero-section';

export default async function HomePage() {
  // Can fetch data directly in Server Components
  const data = await fetchData();

  return (
    <main>
      <HeroSection data={data} />
    </main>
  );
}
```

Client Component example:
```typescript
// components/ui/counter.tsx
'use client'; // Required for hooks

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

#### 4. Styling with Tailwind CSS
- **Tailwind CSS v3.4.18** - utility-first CSS framework
- **cn() utility** for conditional classes (clsx + tailwind-merge)
- Custom CSS variables in `globals.css` for design tokens
- Responsive design: mobile-first approach
- Design system: colors, spacing, typography in CSS variables

Styling example:
```typescript
import { cn } from '@/lib/utils';

export function Button({ variant, children }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-semibold transition-all',
        variant === 'primary' && 'bg-primary text-white',
        variant === 'outline' && 'border-2 border-primary text-primary'
      )}
    >
      {children}
    </button>
  );
}
```

#### 5. Component Architecture
**Component organization:**
- `app/` - Next.js 15 App Router pages and layouts
- `components/ui/` - Reusable UI primitives (buttons, inputs, cards)
- `components/landing/` - Landing page specific sections (hero, features, pricing)
- `lib/` - Utility functions, constants, type definitions
- `hooks/` - Custom React hooks
- `content/` - Content and copywriting

Component structure example:
```typescript
// components/landing/features-section.tsx
import { type FC } from 'react';
import { Card } from '@/components/ui/card';
import { FEATURES } from '@/lib/constants';

export const FeaturesSection: FC = () => {
  return (
    <section className="section-spacing">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center mb-12">
          Возможности
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card key={feature.id}>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
```

#### 6. Content Management
**IMPORTANT**: All copy must come from `lib/constants.ts`
- Never hardcode text in components
- All content is centralized and sourced from Memory Bank
- Easy to update and maintain
- Type-safe with `as const`

Content usage example:
```typescript
import { HERO_HEADLINES, CTA_BUTTONS, STATS } from '@/lib/constants';

export function HeroSection() {
  return (
    <section>
      <h1>{HERO_HEADLINES[0]}</h1>
      <button>{CTA_BUTTONS.primary}</button>
      <div>Analysis time: {STATS.analysisTime}</div>
    </section>
  );
}
```

---

## Self-Documentation Principle

**IMPORTANT**: You not only read from Memory Bank, but also **update it**.

When performing tasks you MUST:
- Update status in `.memory_bank/current_tasks.md` (To Do → In Progress → Done)
- Create/update documentation in `.memory_bank/guides/` when implementing new subsystems
- Update `.memory_bank/tech_stack.md` when adding new dependencies
- Create new patterns in `.memory_bank/patterns/` when making architectural decisions
- Add specifications in `.memory_bank/specs/` for new features

---

## Workflow Selection: Choosing the Right Process

Before starting any task, determine its type and choose the corresponding workflow:

### 1. New Feature
**When to use**: Adding new section or component to the landing page
**Workflow**: `.memory_bank/workflows/new_feature.md`
**Examples**:
- Adding new landing page section
- Creating new UI component
- Adding new content block

### 2. Bug Fix
**When to use**: Something doesn't work as expected
**Workflow**: `.memory_bank/workflows/bug_fix.md`
**Examples**:
- Component doesn't render correctly
- Styling issues
- TypeScript errors
- Broken links or missing assets

### 3. Code Review
**When to use**: Quality check before merge
**Workflow**: `.memory_bank/workflows/code_review.md`
**What to check**:
- Compliance with coding standards
- Correct Server/Client Component usage
- TypeScript strict mode compliance
- Accessibility
- Performance

---

## Forbidden Actions

**NEVER** do the following:

1. **Don't add new dependencies** without updating `.memory_bank/tech_stack.md`
2. **Don't violate patterns** from `.memory_bank/patterns/`
3. **Don't reinvent** what already exists in the project
4. **Don't use `any`** in type hints - always specify concrete types
5. **Don't use Client Components** when Server Components would work
6. **Don't hardcode content** - use `lib/constants.ts`
7. **Don't create inline styles** - use Tailwind CSS
8. **Don't import entire icon libraries** - import specific icons only

---

## Mandatory Checks Before Starting Work

Before writing code ALWAYS check:

1. **Tech Stack** (`.memory_bank/tech_stack.md`):
   - Which libraries are allowed for this task?
   - Which practices are forbidden?

2. **Existing Components**:
   - Does this component already exist?
   - Which components can be reused?

3. **Patterns** (`.memory_bank/patterns/`):
   - How to properly structure components?
   - Which patterns to use?

4. **Current Tasks** (`.memory_bank/current_tasks.md`):
   - Does my task conflict with others?
   - Need to update status?

---

## When Context is Lost

If you feel context was lost or compressed:

1. Use `/refresh_context` command (if available)
2. Re-read `.memory_bank/README.md`
3. Study recent commits to understand current state:
   ```bash
   git log --oneline -10
   ```
4. Check current project status:
   ```bash
   git status
   ```

---

## Type Safety Requirements

All functions MUST have complete type hints:

```typescript
import { type FC } from 'react';

// CORRECT - Full type annotations
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  variant,
  size = 'md',
  children,
  onClick
}) => {
  return (
    <button onClick={onClick} className={...}>
      {children}
    </button>
  );
};

// INCORRECT - Missing type annotations
export const Button = ({ variant, size, children, onClick }) => {
  // ❌ No types!
  return <button onClick={onClick}>{children}</button>;
};
```

---

## Testing Requirements (When Applicable)

For each new component you SHOULD:
1. Write unit tests in `__tests__/` or `*.test.tsx`
2. Use `@testing-library/react` for component tests
3. Use `vitest` for unit tests
4. Test edge cases and accessibility

Test example:
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with primary variant', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

---

## Performance Requirements

All components must follow these performance guidelines:

1. **Image Optimization**:
   - Always use Next.js `<Image>` component
   - Provide `width` and `height`
   - Use `priority` for above-the-fold images
   - Use AVIF format when possible

```typescript
import Image from 'next/image';

<Image
  src="/hero-image.png"
  width={1200}
  height={600}
  alt="Hero"
  priority // for above-the-fold
  quality={90}
/>
```

2. **Code Splitting**:
   - Use dynamic imports for large components
   - Lazy load below-the-fold content

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <p>Loading...</p>,
});
```

3. **Font Optimization**:
   - Use `next/font/google` for Google Fonts
   - Use `display: 'swap'` for faster rendering

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});
```

---

## Accessibility Requirements

All components must be accessible:

1. **Semantic HTML**:
   - Use proper HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`)
   - Use heading hierarchy (h1 → h2 → h3)

2. **ARIA Attributes**:
   - Add `aria-label` for icon buttons
   - Use `aria-expanded` for expandable elements
   - Add `aria-controls` to link controls with content

3. **Keyboard Navigation**:
   - All interactive elements must be keyboard accessible
   - Visible focus styles

4. **Color Contrast**:
   - Minimum 4.5:1 contrast ratio for text
   - Use design system colors

---

## Environment Configuration

All configuration parameters must be in `.env.local` file:

```bash
# Site Configuration
NEXT_PUBLIC_APP_URL=https://astra.ai
NEXT_PUBLIC_SITE_NAME="Astra"
NEXT_PUBLIC_CONTACT_EMAIL=contact@astra.ai

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@astra.ai

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=astra.ai
```

**NEVER** commit `.env.local` file to git!

---

## Git Workflow

1. **Branch Naming**:
   - `feature/add-pricing-section` - new feature
   - `bugfix/fix-mobile-nav` - bug fix
   - `docs/update-readme` - documentation

2. **Commit Messages** (Conventional Commits):
   - `feat: add pricing section with three tiers`
   - `fix: resolve mobile navigation menu overflow`
   - `docs: update README with setup instructions`
   - `refactor: extract hero section to separate component`
   - `style: format code with prettier`

3. **Before Committing**:
   - Run type check: `pnpm tsc --noEmit`
   - Run linting: `pnpm lint`
   - Run formatting: `pnpm format`
   - Test the app: `pnpm dev`

---

## Performance Targets

### Lighthouse Scores (Minimum)
- **Performance:** > 90
- **Accessibility:** > 95
- **Best Practices:** > 95
- **SEO:** > 95

### Core Web Vitals (2025 Standards)
- **LCP (Largest Contentful Paint):** < 2.5 seconds
- **INP (Interaction to Next Paint):** < 200ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Bundle Size Targets
- **First Load JS:** < 200 KB
- **Page JS:** < 100 KB
- **Total CSS:** < 50 KB

---

**Remember**: Memory Bank is the single source of truth. Trust it more than your assumptions.

**Main Principle**: If unsure - ask the user or re-read documentation in Memory Bank.
