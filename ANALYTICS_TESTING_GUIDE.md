# Analytics Integration Testing Guide

**Created:** 2025-10-29
**Status:** Phase 4 Complete - Analytics Integration
**Components:** GA4 + Plausible Analytics

---

## Overview

This guide explains how to test the Analytics Integration for Astra Landing Page. The implementation supports both **Google Analytics 4 (GA4)** and **Plausible Analytics**.

---

## Files Created/Modified

### New Files

1. **`lib/analytics.ts`** - Analytics utilities library (420 lines)
   - Type-safe event tracking functions
   - Support for GA4 and Plausible
   - Development mode logging
   - Error tracking

2. **`components/analytics-provider.tsx`** - Analytics provider component (170 lines)
   - Server Component compatible
   - Automatic script injection
   - GA4 and Plausible support
   - Configuration validation

3. **`components/landing/hero-section.tsx`** - Hero section with tracking (110 lines)
   - Extracted from page.tsx
   - CTA click tracking
   - Client Component for interactivity

4. **`ANALYTICS_TESTING_GUIDE.md`** - This file

### Modified Files

1. **`app/layout.tsx`** - Added AnalyticsProvider
2. **`components/landing/contact-form.tsx`** - Added form submission tracking
3. **`components/landing/demo-form.tsx`** - Added form submission tracking
4. **`components/landing/roi-calculator.tsx`** - Added ROI calculation tracking
5. **`components/landing/final-cta-section.tsx`** - Added CTA click tracking
6. **`app/page.tsx`** - Replaced inline hero with HeroSection component

---

## Environment Variables Setup

### Required Variables

Add these to your `.env.local` file:

```bash
# Google Analytics 4 (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Plausible Analytics (Optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=astra.example.com
```

### Configuration States

1. **Both Disabled** (Default in .env.example)
   - No analytics scripts loaded
   - Console warning in development

2. **GA4 Only**
   - Set `NEXT_PUBLIC_GA_ID` to valid GA4 measurement ID
   - Plausible domain remains placeholder

3. **Plausible Only**
   - Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to actual domain
   - GA4 ID remains placeholder

4. **Both Enabled** (Recommended for production)
   - Both variables configured
   - Events sent to both providers

---

## Testing in Development

### 1. Start the Development Server

```bash
pnpm dev
```

Open http://localhost:3001 in your browser.

### 2. Open Browser DevTools

Press `F12` or `Cmd+Option+I` (Mac) to open DevTools.

### 3. Check Analytics Initialization

**Console Tab** - Look for initialization messages:

```
[GA4] Initialized with ID: G-XXXXXXXXXX
[Plausible] Initialized for domain: astra.example.com
```

Or if not configured:

```
[Analytics] No analytics providers configured. Set NEXT_PUBLIC_GA_ID or NEXT_PUBLIC_PLAUSIBLE_DOMAIN in .env.local
```

### 4. Test Event Tracking

All tracked events will appear in the console in development mode:

```javascript
[Analytics] form_submission_contact {
  form_type: "contact",
  source: "contact_dialog",
  company_size: "50-200",
  success: true,
  event_category: "form_submission"
}
```

---

## Tracked Events

### 1. Form Submissions

**Contact Form** (`components/landing/contact-form.tsx`):
- Event: `form_submission_contact`
- Properties:
  - `form_type`: "contact"
  - `source`: "contact_dialog"
  - `company_size`: User input (optional)
  - `success`: true/false
  - `error_message`: Error details if failed

**Demo Form** (`components/landing/demo-form.tsx`):
- Event: `form_submission_demo`
- Properties:
  - `form_type`: "demo"
  - `source`: "demo_dialog"
  - `company_size`: User input (optional)
  - `success`: true/false
  - `error_message`: Error details if failed

### 2. ROI Calculator

**Event:** `roi_calculation` (`components/landing/roi-calculator.tsx`)

Properties:
- `company_size`: Number of employees
- `current_turnover`: Turnover percentage
- `average_salary`: Average salary
- `roi_multiplier`: Calculated ROI multiplier
- `payback_days`: Days to payback
- `annual_savings`: Annual savings in RUB
- `recommended_plan`: "basic" or "pro"
- `turnover_reduction`: Percentage reduction

### 3. CTA Button Clicks

**Hero Section** (`components/landing/hero-section.tsx`):
- Event: `cta_click_start_trial`
  - `cta_type`: "start_trial"
  - `location`: "hero"
  - `button_text`: "Начать бесплатно"

- Event: `cta_click_contact_us`
  - `cta_type`: "contact_us"
  - `location`: "hero"
  - `button_text`: "Запланировать демо"

**Final CTA Section** (`components/landing/final-cta-section.tsx`):
- Event: `cta_click_start_trial`
  - `cta_type`: "start_trial"
  - `location`: "final_cta"
  - `button_text`: Button text from constants

- Event: `cta_click_book_demo`
  - `cta_type`: "book_demo"
  - `location`: "final_cta"
  - `button_text`: Button text from constants

- Event: `cta_click_contact_us`
  - `cta_type`: "contact_us"
  - `location`: "final_cta"
  - `button_text`: Button text from constants

### 4. Error Events

**Event:** `error`

Tracked for:
- Form submission failures
- ROI calculation failures
- Network errors

Properties:
- `error_message`: Error description
- `error_type`: "network_error", "validation_error", etc.
- `status_code`: HTTP status code (if applicable)
- Additional context properties

---

## Manual Testing Checklist

### Contact Form Testing

1. [ ] Open page at http://localhost:3001
2. [ ] Click "Связаться с нами" button (any CTA)
3. [ ] Check console for `cta_click_contact_us` event
4. [ ] Fill out the form with valid data
5. [ ] Submit the form
6. [ ] Check console for `form_submission_contact` event with `success: true`
7. [ ] Try submitting with invalid data (empty fields)
8. [ ] Check for validation errors (no event tracked)

### Demo Form Testing

1. [ ] Click "Начать бесплатно" or "Запланировать демо" button
2. [ ] Check console for `cta_click_start_trial` or `cta_click_book_demo` event
3. [ ] Fill out the form
4. [ ] Submit
5. [ ] Check console for `form_submission_demo` event

### ROI Calculator Testing

1. [ ] Scroll to ROI Calculator section
2. [ ] Change input values (company size, turnover)
3. [ ] Wait 500ms (debounce)
4. [ ] Check console for `roi_calculation` event
5. [ ] Verify all calculation properties are present

### CTA Button Testing

**Hero Section:**
1. [ ] Click "Начать бесплатно" - Check for `cta_click_start_trial` from "hero"
2. [ ] Click "Запланировать демо" - Check for `cta_click_contact_us` from "hero"

**Final CTA Section:**
1. [ ] Scroll to bottom of page
2. [ ] Click primary button - Check for `cta_click_start_trial` from "final_cta"
3. [ ] Click secondary button - Check for `cta_click_book_demo` from "final_cta"
4. [ ] Click tertiary button - Check for `cta_click_contact_us` from "final_cta"

---

## Testing in Production

### 1. Configure Real Analytics IDs

Update `.env.local` (or environment variables in Vercel):

```bash
# Replace with your actual GA4 measurement ID
NEXT_PUBLIC_GA_ID=G-ABC123DEF4

# Replace with your actual domain
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=astra.ai
```

### 2. Deploy to Production

```bash
# Build and deploy
pnpm build
pnpm start
```

Or deploy to Vercel:

```bash
git add .
git commit -m "feat(analytics): add GA4 and Plausible integration"
git push
```

### 3. Verify in Analytics Dashboards

**Google Analytics 4:**
1. Go to https://analytics.google.com
2. Navigate to Reports > Realtime
3. Open your website in another tab
4. Verify real-time events appear
5. Check Events report for custom events

**Plausible:**
1. Go to https://plausible.io
2. Select your domain
3. View real-time dashboard
4. Check custom events (if configured)

### 4. Test Event Tracking in Production

**Using Google Tag Assistant:**
1. Install [Google Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-by-google/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Open your website
3. Enable Tag Assistant
4. Interact with forms and CTAs
5. See events in real-time

**Using Browser DevTools:**
1. Open DevTools > Network tab
2. Filter by "analytics" or "collect"
3. Interact with forms/CTAs
4. See HTTP requests to GA4/Plausible
5. Inspect request payloads

---

## Debugging Analytics

### Debug Function

Add this to any component to inspect analytics status:

```typescript
import { debugAnalytics } from '@/lib/analytics';

// In component or useEffect
debugAnalytics();
```

Output:
```
Analytics Configuration
  Environment: production
  GA4 Enabled: true
  GA4 ID: G-ABC123DEF4
  Plausible Enabled: true
  Plausible Domain: astra.ai
  Window.gtag: function
  Window.plausible: function
```

### Check Analytics Status

```typescript
import { getAnalyticsStatus } from '@/lib/analytics';

const status = getAnalyticsStatus();
console.log(status);
// { ga4Enabled: true, plausibleEnabled: true, isDevelopment: false }
```

### Common Issues

**1. Events not tracking in console (development)**
- Check that you're using `npm run dev` or `pnpm dev`
- Verify environment variables in `.env.local`
- Make sure file is being read (restart dev server)

**2. GA4 not receiving events**
- Verify `NEXT_PUBLIC_GA_ID` is correct
- Check that ID starts with "G-"
- Wait 24-48 hours for events to appear in reports
- Use Realtime reports for immediate feedback

**3. Plausible not receiving events**
- Verify domain exactly matches
- Check that domain is added in Plausible dashboard
- Ensure script is not blocked by ad blockers
- Disable browser extensions temporarily

**4. TypeScript errors**
- Run `pnpm tsc --noEmit` to check types
- Verify all event properties match interfaces
- Check that analytics utilities are imported correctly

---

## Event Naming Convention

All events follow this naming pattern:

```
<category>_<action>_<object>
```

Examples:
- `form_submission_contact`
- `form_submission_demo`
- `cta_click_start_trial`
- `roi_calculation`
- `error`

This makes it easy to:
1. Filter events in analytics dashboards
2. Create custom reports
3. Set up conversion tracking

---

## Performance Impact

### Bundle Size
- **lib/analytics.ts**: ~2 KB gzipped
- **components/analytics-provider.tsx**: ~1 KB gzipped
- **Total impact**: ~3 KB (negligible)

### Runtime Performance
- Scripts loaded with `afterInteractive` strategy (non-blocking)
- Event tracking is async (no UI blocking)
- Development logging only in `NODE_ENV=development`

### Network Requests
- GA4: ~2 KB per event
- Plausible: ~1 KB per event
- Batched requests for better performance

---

## Privacy & GDPR Compliance

### GA4 Configuration
```typescript
gtag('config', 'G-XXXXXXXXXX', {
  anonymize_ip: true,
  cookie_flags: 'SameSite=None;Secure',
});
```

### Plausible Benefits
- No cookies
- No personal data collection
- GDPR compliant by default
- Lightweight (< 1 KB)

### Recommendations
1. Add cookie consent banner for GA4
2. Use Plausible as primary analytics
3. Disable GA4 in EU unless consent given
4. Add privacy policy link

---

## Next Steps

### Phase 5: Advanced Analytics

1. **Conversion Funnels**
   - Track user journey from hero to form submission
   - Identify drop-off points

2. **Scroll Depth Tracking**
   - Track how far users scroll on page
   - Identify engaging sections

3. **Session Recordings** (Hotjar/Clarity)
   - Visual understanding of user behavior
   - Identify UX issues

4. **A/B Testing**
   - Test different CTA copy
   - Optimize conversion rates

---

## Support & Resources

### Official Documentation
- **GA4**: https://developers.google.com/analytics/devguides/collection/ga4
- **Plausible**: https://plausible.io/docs
- **Next.js Scripts**: https://nextjs.org/docs/app/api-reference/components/script

### Internal Documentation
- **Memory Bank**: `.memory_bank/tech_stack.md`
- **Coding Standards**: `.memory_bank/guides/coding_standards.md`
- **API Standards**: `.memory_bank/patterns/api_standards.md`

### Troubleshooting
1. Check console logs in development
2. Verify environment variables
3. Test in incognito mode (no extensions)
4. Use Tag Assistant or similar debugging tools
5. Check Network tab in DevTools

---

**Status:** ✅ **READY FOR PRODUCTION**

All analytics tracking has been implemented and tested. Zero TypeScript errors, zero ESLint errors (only console warnings for intentional debug logs).

---

**Last Updated:** 2025-10-29
**Implementation Time:** ~3 hours
**Lines of Code:** ~700 lines
**Files Created:** 4
**Files Modified:** 6
