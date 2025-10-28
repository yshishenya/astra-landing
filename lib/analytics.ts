/**
 * Analytics Utilities for Astra Landing Page
 *
 * Supports both Google Analytics 4 (GA4) and Plausible Analytics
 *
 * Usage:
 * ```tsx
 * import { trackEvent, trackFormSubmission, trackCTAClick } from '@/lib/analytics';
 *
 * trackEvent('page_view', { page_path: '/pricing' });
 * trackFormSubmission('contact', { source: 'hero' });
 * trackCTAClick('start_trial', { location: 'hero' });
 * ```
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Supported analytics providers
 */
export type AnalyticsProvider = 'ga4' | 'plausible';

/**
 * Standard event categories for analytics tracking
 */
export type EventCategory =
  | 'engagement'
  | 'conversion'
  | 'form_submission'
  | 'cta_click'
  | 'navigation'
  | 'scroll'
  | 'error';

/**
 * Form types for tracking submissions
 */
export type FormType = 'contact' | 'demo' | 'roi_calculator' | 'newsletter';

/**
 * CTA button types
 */
export type CTAType = 'start_trial' | 'book_demo' | 'calculate_roi' | 'contact_us';

/**
 * Generic event properties
 */
export interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Form submission event properties
 */
export interface FormSubmissionProperties extends EventProperties {
  form_type: FormType;
  source?: string; // Where the form was triggered (e.g., 'hero', 'footer')
  company_size?: string;
  success: boolean;
  error_message?: string;
}

/**
 * CTA click event properties
 */
export interface CTAClickProperties extends EventProperties {
  cta_type: CTAType;
  location: string; // Section where CTA was clicked (e.g., 'hero', 'final_cta')
  button_text?: string;
}

/**
 * Page view event properties
 */
export interface PageViewProperties extends EventProperties {
  page_path: string;
  page_title?: string;
  referrer?: string;
}

/**
 * Scroll event properties
 */
export interface ScrollProperties extends EventProperties {
  section: string; // Section that was scrolled into view
  depth_percentage: number; // 0-100
}

// ============================================================================
// Global Analytics Interface (for type safety)
// ============================================================================

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: EventProperties
    ) => void;
    plausible?: (
      eventName: string,
      options?: { props?: EventProperties; callback?: () => void }
    ) => void;
    dataLayer?: Array<unknown>;
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if analytics is enabled (based on environment variables)
 */
export const isAnalyticsEnabled = (provider: AnalyticsProvider): boolean => {
  if (typeof window === 'undefined') return false;

  switch (provider) {
    case 'ga4':
      return Boolean(
        process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA_ID !== 'G-XXXXXXXXXX'
      );
    case 'plausible':
      return Boolean(
        process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN &&
          process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN !== 'astra.example.com'
      );
    default:
      return false;
  }
};

/**
 * Check if we're in development mode
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

/**
 * Sanitize event properties (remove undefined, convert to strings)
 */
const sanitizeProperties = (properties: EventProperties): EventProperties => {
  const sanitized: EventProperties = {};

  Object.entries(properties).forEach(([key, value]) => {
    if (value !== undefined) {
      sanitized[key] = value;
    }
  });

  return sanitized;
};

// ============================================================================
// Core Analytics Functions
// ============================================================================

/**
 * Track a generic event to all enabled analytics providers
 *
 * @param eventName - Name of the event (e.g., 'page_view', 'button_click')
 * @param properties - Event properties (optional)
 * @param category - Event category for better organization (optional)
 *
 * @example
 * ```tsx
 * trackEvent('purchase', { value: 99.99, currency: 'RUB' }, 'conversion');
 * ```
 */
export const trackEvent = (
  eventName: string,
  properties: EventProperties = {},
  category: EventCategory = 'engagement'
): void => {
  const sanitizedProps = sanitizeProperties({
    ...properties,
    event_category: category,
  });

  // Log to console in development
  if (isDevelopment()) {
    console.log('[Analytics]', eventName, sanitizedProps);
  }

  // Google Analytics 4
  if (isAnalyticsEnabled('ga4') && window.gtag) {
    try {
      window.gtag('event', eventName, sanitizedProps);
    } catch (error) {
      console.error('[GA4] Error tracking event:', error);
    }
  }

  // Plausible Analytics
  if (isAnalyticsEnabled('plausible') && window.plausible) {
    try {
      window.plausible(eventName, { props: sanitizedProps });
    } catch (error) {
      console.error('[Plausible] Error tracking event:', error);
    }
  }
};

/**
 * Track a page view event
 *
 * @param properties - Page view properties
 *
 * @example
 * ```tsx
 * trackPageView({ page_path: '/pricing', page_title: 'Pricing - Astra' });
 * ```
 */
export const trackPageView = (properties: PageViewProperties): void => {
  trackEvent('page_view', properties as EventProperties, 'navigation');
};

/**
 * Track a form submission event
 *
 * @param formType - Type of form (contact, demo, roi_calculator)
 * @param properties - Additional form properties
 *
 * @example
 * ```tsx
 * trackFormSubmission('contact', { source: 'hero', company_size: '50-200', success: true });
 * trackFormSubmission('demo', { success: false, error_message: 'Invalid email' });
 * ```
 */
export const trackFormSubmission = (
  formType: FormType,
  properties: Partial<FormSubmissionProperties> = {}
): void => {
  const eventProps: FormSubmissionProperties = {
    form_type: formType,
    success: properties.success ?? true,
    ...properties,
  };

  trackEvent(`form_submission_${formType}`, eventProps as EventProperties, 'form_submission');
};

/**
 * Track a CTA button click
 *
 * @param ctaType - Type of CTA button
 * @param location - Section where the button is located
 * @param properties - Additional CTA properties
 *
 * @example
 * ```tsx
 * trackCTAClick('start_trial', 'hero', { button_text: 'Начать бесплатно' });
 * trackCTAClick('book_demo', 'final_cta');
 * ```
 */
export const trackCTAClick = (
  ctaType: CTAType,
  location: string,
  properties: Partial<CTAClickProperties> = {}
): void => {
  const eventProps: CTAClickProperties = {
    cta_type: ctaType,
    location,
    ...properties,
  };

  trackEvent(`cta_click_${ctaType}`, eventProps as EventProperties, 'cta_click');
};

/**
 * Track scroll depth (when user scrolls to a section)
 *
 * @param section - Name of the section that was scrolled to
 * @param depthPercentage - How far down the page (0-100)
 *
 * @example
 * ```tsx
 * trackScroll('pricing', 75);
 * ```
 */
export const trackScroll = (section: string, depthPercentage: number): void => {
  const eventProps: ScrollProperties = {
    section,
    depth_percentage: Math.round(depthPercentage),
  };

  trackEvent('scroll_depth', eventProps as EventProperties, 'scroll');
};

/**
 * Track an error event
 *
 * @param errorMessage - Description of the error
 * @param properties - Additional error context
 *
 * @example
 * ```tsx
 * trackError('Form submission failed', { form_type: 'contact', status_code: 500 });
 * ```
 */
export const trackError = (errorMessage: string, properties: EventProperties = {}): void => {
  trackEvent(
    'error',
    {
      error_message: errorMessage,
      ...properties,
    },
    'error'
  );
};

/**
 * Track ROI Calculator usage
 *
 * @param calculationResults - Results from ROI calculation
 *
 * @example
 * ```tsx
 * trackROICalculation({
 *   company_size: 500,
 *   roi_multiplier: 162,
 *   payback_days: 3,
 *   annual_savings: 31250000
 * });
 * ```
 */
export const trackROICalculation = (calculationResults: EventProperties): void => {
  trackEvent('roi_calculation', calculationResults, 'engagement');
};

/**
 * Track outbound link click
 *
 * @param url - Destination URL
 * @param linkText - Text of the link (optional)
 *
 * @example
 * ```tsx
 * trackOutboundLink('https://linkedin.com/company/astra', 'LinkedIn');
 * ```
 */
export const trackOutboundLink = (url: string, linkText?: string): void => {
  trackEvent(
    'outbound_link_click',
    {
      destination_url: url,
      link_text: linkText,
    },
    'navigation'
  );
};

// ============================================================================
// Utility Hooks (for React components)
// ============================================================================

/**
 * Get analytics configuration status
 *
 * @returns Object with analytics provider status
 *
 * @example
 * ```tsx
 * const { ga4Enabled, plausibleEnabled } = getAnalyticsStatus();
 * ```
 */
export const getAnalyticsStatus = () => {
  return {
    ga4Enabled: isAnalyticsEnabled('ga4'),
    plausibleEnabled: isAnalyticsEnabled('plausible'),
    isDevelopment: isDevelopment(),
  };
};

/**
 * Debug analytics configuration
 *
 * Logs current analytics status to console
 *
 * @example
 * ```tsx
 * debugAnalytics();
 * ```
 */
export const debugAnalytics = (): void => {
  const status = getAnalyticsStatus();
  console.group('Analytics Configuration');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('GA4 Enabled:', status.ga4Enabled);
  console.log('GA4 ID:', process.env.NEXT_PUBLIC_GA_ID || 'Not configured');
  console.log('Plausible Enabled:', status.plausibleEnabled);
  console.log(
    'Plausible Domain:',
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'Not configured'
  );
  console.log('Window.gtag:', typeof window !== 'undefined' ? typeof window.gtag : 'N/A');
  console.log('Window.plausible:', typeof window !== 'undefined' ? typeof window.plausible : 'N/A');
  console.groupEnd();
};
