# Marketing Components

High-conversion marketing components for the Astra landing page.

---

## Components

### 1. Exit Intent Popup (`exit-intent-popup.tsx`)

Lead magnet popup that appears when user is about to leave the page.

**Features:**
- Mouse exit detection (desktop only)
- Email capture form with validation
- Cookie-based persistence (7 days)
- Focus trap and ESC key support
- Analytics integration
- WCAG 2.1 AA compliant

**Usage:**
```tsx
import { ExitIntentPopup } from '@/components/marketing/exit-intent-popup';

// In app/layout.tsx (already integrated)
<ExitIntentPopup />
```

**Content:**
All copy comes from `lib/constants.ts` → `EXIT_POPUP_CONTENT`

**Testing:**
1. Desktop: Move mouse to top of viewport and exit
2. Mobile: Should NOT show (< 768px)
3. Cookie: Closes once, stays closed for 7 days
4. Form: Validates email, shows success message

**Analytics Events:**
- `exit_intent_detected`
- `exit_intent_popup_submit`
- `exit_intent_popup_success`
- `exit_intent_popup_error`
- `exit_popup_dismissed`

---

### 2. Sticky CTA Bar (`sticky-cta-bar.tsx`)

Bottom-fixed call-to-action bar that appears on scroll.

**Features:**
- Appears after scrolling past hero
- Sticky to bottom of viewport
- Primary and secondary CTA buttons
- Smooth slide-up animation
- Mobile-responsive

**Usage:**
```tsx
import { StickyCTABar } from '@/components/marketing/sticky-cta-bar';

<StickyCTABar />
```

---

### 3. Tawk Chat (`tawk-chat.tsx`)

Live chat widget integration.

**Features:**
- Tawk.to chat widget
- Loads after page load (performance optimization)
- Configurable via environment variables

**Usage:**
```tsx
import { TawkChat } from '@/components/marketing/tawk-chat';

<TawkChat />
```

---

## Development Guidelines

### TypeScript
- All components use strict TypeScript
- No `any` types allowed
- Props interfaces defined with `FC` type

### Accessibility
- WCAG 2.1 AA compliance required
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader announcements

### Performance
- Lazy load when possible
- Minimize client-side JavaScript
- Use React Server Components when possible
- Client components only when needed (interactivity)

### Content Management
- All copy from `lib/constants.ts`
- Never hardcode text in components
- Use TypeScript `as const` for content

### Analytics
- Track all user interactions
- Use `lib/analytics.ts` utilities
- Follow event naming conventions

---

## Testing

### Manual Testing
Each component should be tested for:
- Desktop functionality
- Mobile responsiveness
- Keyboard navigation
- Screen reader compatibility
- Performance impact

### Automated Testing (TODO)
- Unit tests with Vitest
- E2E tests with Playwright
- Visual regression with Percy

---

## File Structure

```
components/marketing/
├── exit-intent-popup.tsx      # Exit intent lead magnet
├── sticky-cta-bar.tsx         # Bottom sticky CTA
├── tawk-chat.tsx              # Live chat widget
└── README.md                  # This file
```

---

## Adding New Components

1. **Create component file:** `components/marketing/your-component.tsx`
2. **Add content:** Add constants to `lib/constants.ts`
3. **Add analytics:** Track events in `lib/analytics.ts`
4. **Document:** Add usage to this README
5. **Test:** Manual and automated testing
6. **Integrate:** Import in `app/layout.tsx` or page

---

## Best Practices

### Do ✅
- Use TypeScript strict mode
- Add ARIA labels
- Track analytics events
- Use content from constants
- Lazy load heavy components
- Test on multiple devices
- Follow accessibility guidelines

### Don't ❌
- Hardcode text in components
- Use `any` types
- Ignore accessibility
- Block page render
- Use inline styles (use Tailwind)
- Import entire icon libraries
- Forget to test on mobile

---

## Dependencies

- **framer-motion:** Animations
- **js-cookie:** Cookie management (exit popup)
- **react-hook-form:** Form state management
- **zod:** Form validation
- **lucide-react:** Icons

---

## Performance Targets

- **Bundle Size:** < 50 KB per component
- **First Load JS:** No blocking
- **Lighthouse Score:** > 90
- **Core Web Vitals:** Pass all

---

**Last Updated:** 2025-10-29
