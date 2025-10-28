# Design System - Astra Landing Page

**Last Updated:** 2025-10-29
**Status:** Mockup Concept Ready
**Brand Colors:** Extracted from Astra Avatar

---

## Quick Reference

### Colors (from Astra Avatar)
- **Primary:** `#22d3ee` (Cyan) - Glow effect
- **Secondary:** `#0ea5e9` (Teal) - Background
- **Accent:** `#2563eb` (Blue) - Costume
- **Gradient:** `linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #2563eb 100%)`

### Typography
- **Font:** Inter / Manrope
- **Headline:** 56-72px, Bold
- **Body:** 16-18px, Regular

### Spacing
- **Section:** 80-120px
- **Component:** 40-60px
- **Element:** 16-32px

---

## 📁 Design Documentation

All design resources are located in `/design/` folder.

### Main Documents

1. **[Mockup Design Concept](../design/ASTRA_MOCKUP_DESIGN_CONCEPT.md)** - Start here
   - Complete mockup specifications for all 11 sections
   - Color palette extracted from avatar
   - 5-week implementation plan
   - Tools and resources

2. **[Design Trends 2025](../design/LANDING_DESIGN_TRENDS_2025.md)**
   - Research on modern landing page design
   - B2B SaaS best practices (Linear, Vercel, Stripe)
   - AI/Tech visualization patterns

3. **[Tools & Resources](../design/TOOLS_AND_RESOURCES.md)**
   - Mockup generators (Rotato, Mockuuups, Screely)
   - Figma templates and plugins
   - Animation libraries

4. **[Code Examples](../design/CODE_EXAMPLES.md)**
   - Production-ready React/Next.js components
   - Glassmorphism effects
   - Framer Motion animations

---

## 🎨 Design Tokens

### Color Palette

```css
:root {
  /* Primary Colors */
  --color-primary: #22d3ee;      /* Cyan */
  --color-secondary: #0ea5e9;    /* Teal */
  --color-accent: #2563eb;       /* Blue */

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #2563eb 100%);
  --gradient-cta: linear-gradient(90deg, #0ea5e9 0%, #2563eb 100%);
  --gradient-ai: linear-gradient(180deg, #22d3ee 0%, rgba(34, 211, 238, 0) 100%);

  /* Neutral Colors */
  --color-dark: #1f2937;
  --color-gray: #6b7280;
  --color-light: #f3f4f6;
  --color-white: #ffffff;

  /* Semantic Colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
}
```

### Typography Scale

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-display: 'Manrope', 'Inter', sans-serif;

  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */
  --text-7xl: 4.5rem;      /* 72px */

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### Spacing System

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
```

### Shadows & Effects

```css
:root {
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.18);
  --glass-blur: blur(10px);

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* Glow Effects */
  --glow-cyan: 0 0 20px rgba(34, 211, 238, 0.5);
  --glow-blue: 0 0 20px rgba(37, 99, 235, 0.5);
}
```

---

## 🎭 Component Styles

### Buttons

```css
/* Primary CTA */
.btn-primary {
  background: var(--gradient-cta);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow-lg);
  transition: transform 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl), var(--glow-blue);
}
```

### Cards

```css
/* Glassmorphic Card */
.card-glass {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: 1rem;
  padding: 2rem;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Mobile */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large Desktop */
--breakpoint-2xl: 1536px; /* Extra Large */
```

---

## 🔗 Related Documents

- **[Landing Structure](./landing_structure.md)** - 11 sections structure
- **[Copywriting Assets](./copywriting_assets.md)** - All texts
- **[Tech Stack](./tech_stack.md)** - Technologies used

---

## 📦 Assets

### Logo & Brand
- **Avatar:** `/astra.png` (1024×1024px)
- **Favicon:** TBD
- **Social Media:** TBD

### Mockups Location
- **Path:** `/design/mockups/` (will be created)
- **Naming:** `{section}-{element}-{variant}@{resolution}.{ext}`

### Illustrations
- **Path:** `/public/illustrations/`
- **Style:** Futuristic professional (Storyset AI theme)

---

## ✅ Implementation Checklist

- [x] Color palette extracted from avatar
- [x] Design concept created
- [x] Tools researched
- [ ] Figma file setup
- [ ] Mockups created (Hero, Pain, Solution)
- [ ] Components implemented
- [ ] Responsive testing
- [ ] Accessibility audit

---

**For detailed mockup specifications, see:** [design/ASTRA_MOCKUP_DESIGN_CONCEPT.md](../design/ASTRA_MOCKUP_DESIGN_CONCEPT.md)
