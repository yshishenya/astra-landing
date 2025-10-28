import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  trackEvent,
  trackFormSubmission,
  trackCTAClick,
  trackPageView,
  trackScroll,
  trackError,
  trackROICalculation,
  trackOutboundLink,
  isAnalyticsEnabled,
  isDevelopment,
  getAnalyticsStatus,
  clearRateLimitQueue,
} from '@/lib/analytics';

// Mock window object
const mockWindow = {
  gtag: vi.fn(),
  plausible: vi.fn(),
  dataLayer: [],
};

describe('Analytics Utilities', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Clear rate limit queue
    clearRateLimitQueue();

    // Setup window mock
    global.window = mockWindow as unknown as Window & typeof globalThis;

    // Reset environment variables using vi.stubEnv
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TEST123');
    vi.stubEnv('NEXT_PUBLIC_PLAUSIBLE_DOMAIN', 'test.example.com');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  describe('isAnalyticsEnabled', () => {
    it('should return true for GA4 when properly configured', () => {
      expect(isAnalyticsEnabled('ga4')).toBe(true);
    });

    it('should return false for GA4 with placeholder value', () => {
      vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-XXXXXXXXXX');
      expect(isAnalyticsEnabled('ga4')).toBe(false);
    });

    it('should return true for Plausible when properly configured', () => {
      expect(isAnalyticsEnabled('plausible')).toBe(true);
    });

    it('should return false for Plausible with placeholder value', () => {
      vi.stubEnv('NEXT_PUBLIC_PLAUSIBLE_DOMAIN', 'astra.example.com');
      expect(isAnalyticsEnabled('plausible')).toBe(false);
    });

    it('should return false when window is undefined', () => {
      // Temporarily remove window
      const originalWindow = global.window;
      // @ts-expect-error Testing server-side behavior
      delete global.window;

      expect(isAnalyticsEnabled('ga4')).toBe(false);

      // Restore window
      global.window = originalWindow;
    });
  });

  describe('isDevelopment', () => {
    it('should return true when NODE_ENV is development', () => {
      vi.stubEnv('NODE_ENV', 'development');
      expect(isDevelopment()).toBe(true);
    });

    it('should return false when NODE_ENV is production', () => {
      vi.stubEnv('NODE_ENV', 'production');
      expect(isDevelopment()).toBe(false);
    });

    it('should return false when NODE_ENV is test', () => {
      vi.stubEnv('NODE_ENV', 'test');
      expect(isDevelopment()).toBe(false);
    });
  });

  describe('getAnalyticsStatus', () => {
    it('should return correct status for all providers', () => {
      vi.stubEnv('NODE_ENV', 'development');
      const status = getAnalyticsStatus();

      expect(status).toEqual({
        ga4Enabled: true,
        plausibleEnabled: true,
        isDevelopment: true,
      });
    });

    it('should return disabled status when not configured', () => {
      vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-XXXXXXXXXX');
      vi.stubEnv('NEXT_PUBLIC_PLAUSIBLE_DOMAIN', 'astra.example.com');
      vi.stubEnv('NODE_ENV', 'production');

      const status = getAnalyticsStatus();

      expect(status).toEqual({
        ga4Enabled: false,
        plausibleEnabled: false,
        isDevelopment: false,
      });
    });
  });

  describe('trackEvent', () => {
    it('should call gtag with correct parameters for GA4', () => {
      trackEvent('test_event', { test_prop: 'value' }, 'engagement');

      expect(mockWindow.gtag).toHaveBeenCalledWith('event', 'test_event', {
        test_prop: 'value',
        event_category: 'engagement',
      });
    });

    it('should call plausible with correct parameters', () => {
      trackEvent('test_event', { test_prop: 'value' });

      expect(mockWindow.plausible).toHaveBeenCalledWith('test_event', {
        props: {
          test_prop: 'value',
          event_category: 'engagement',
        },
      });
    });

    it('should sanitize undefined properties', () => {
      trackEvent('test_event', { valid: 'value', invalid: undefined });

      expect(mockWindow.gtag).toHaveBeenCalledWith('event', 'test_event', {
        valid: 'value',
        event_category: 'engagement',
        // invalid should not be present
      });
    });

    it('should handle errors gracefully', () => {
      mockWindow.gtag = vi.fn().mockImplementation(() => {
        throw new Error('GA4 error');
      });

      // Should not throw
      expect(() => trackEvent('test_event')).not.toThrow();
    });

    it('should not call providers when not enabled', () => {
      vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-XXXXXXXXXX');
      vi.stubEnv('NEXT_PUBLIC_PLAUSIBLE_DOMAIN', 'astra.example.com');

      trackEvent('test_event');

      expect(mockWindow.gtag).not.toHaveBeenCalled();
      expect(mockWindow.plausible).not.toHaveBeenCalled();
    });

    it('should respect rate limiting', () => {
      // Track 15 events rapidly (max is 10 per second)
      for (let i = 0; i < 15; i++) {
        trackEvent(`test_event_${i}`);
      }

      // Should have called gtag only 10 times (rate limited)
      expect(mockWindow.gtag).toHaveBeenCalledTimes(10);
    });
  });

  describe('trackFormSubmission', () => {
    it('should track form submission with correct properties', () => {
      trackFormSubmission('contact', {
        form_type: 'contact',
        source: 'hero',
        success: true,
      });

      expect(mockWindow.gtag).toHaveBeenCalledWith(
        'event',
        'form_submission_contact',
        expect.objectContaining({
          form_type: 'contact',
          source: 'hero',
          success: true,
          event_category: 'form_submission',
        })
      );
    });

    it('should default success to true if not provided', () => {
      trackFormSubmission('demo', { form_type: 'demo' });

      expect(mockWindow.gtag).toHaveBeenCalledWith(
        'event',
        'form_submission_demo',
        expect.objectContaining({
          success: true,
        })
      );
    });

    it('should track failed submission', () => {
      trackFormSubmission('contact', {
        form_type: 'contact',
        success: false,
        error_message: 'Network error',
      });

      expect(mockWindow.gtag).toHaveBeenCalledWith(
        'event',
        'form_submission_contact',
        expect.objectContaining({
          success: false,
          error_message: 'Network error',
        })
      );
    });
  });

  describe('trackCTAClick', () => {
    it('should track CTA click with correct properties', () => {
      trackCTAClick('start_trial', 'hero', { button_text: 'Start Free' });

      expect(mockWindow.gtag).toHaveBeenCalledWith(
        'event',
        'cta_click_start_trial',
        expect.objectContaining({
          cta_type: 'start_trial',
          location: 'hero',
          button_text: 'Start Free',
          event_category: 'cta_click',
        })
      );
    });

    it('should work without additional properties', () => {
      trackCTAClick('book_demo', 'footer');

      expect(mockWindow.gtag).toHaveBeenCalledWith(
        'event',
        'cta_click_book_demo',
        expect.objectContaining({
          cta_type: 'book_demo',
          location: 'footer',
        })
      );
    });
  });

  describe('trackPageView', () => {
    it('should track page view with correct properties', () => {
      trackPageView({
        page_path: '/pricing',
        page_title: 'Pricing - Astra',
        referrer: 'https://google.com',
      });

      expect(mockWindow.gtag).toHaveBeenCalledWith(
        'event',
        'page_view',
        expect.objectContaining({
          page_path: '/pricing',
          page_title: 'Pricing - Astra',
          referrer: 'https://google.com',
          event_category: 'navigation',
        })
      );
    });
  });

  describe('trackScroll', () => {
    it('should track scroll depth with rounded percentage', () => {
      trackScroll('pricing', 75.8);

      expect(mockWindow.gtag).toHaveBeenCalledWith(
        'event',
        'scroll_depth',
        expect.objectContaining({
          section: 'pricing',
          depth_percentage: 76, // Should be rounded
          event_category: 'scroll',
        })
      );
    });
  });

  describe('trackError', () => {
    it('should track error with message and context', () => {
      trackError('Form submission failed', {
        form_type: 'contact',
        status_code: 500,
      });

      expect(mockWindow.gtag).toHaveBeenCalledWith(
        'event',
        'error',
        expect.objectContaining({
          error_message: 'Form submission failed',
          form_type: 'contact',
          status_code: 500,
          event_category: 'error',
        })
      );
    });
  });

  describe('trackROICalculation', () => {
    it('should track ROI calculation results', () => {
      const results = {
        company_size: 500,
        roi_multiplier: 162,
        payback_days: 3,
        annual_savings: 31250000,
      };

      trackROICalculation(results);

      expect(mockWindow.gtag).toHaveBeenCalledWith(
        'event',
        'roi_calculation',
        expect.objectContaining({
          company_size: 500,
          roi_multiplier: 162,
          payback_days: 3,
          annual_savings: 31250000,
          event_category: 'engagement',
        })
      );
    });
  });

  describe('trackOutboundLink', () => {
    it('should track outbound link click', () => {
      trackOutboundLink('https://linkedin.com/company/astra', 'LinkedIn');

      expect(mockWindow.gtag).toHaveBeenCalledWith(
        'event',
        'outbound_link_click',
        expect.objectContaining({
          destination_url: 'https://linkedin.com/company/astra',
          link_text: 'LinkedIn',
          event_category: 'navigation',
        })
      );
    });

    it('should work without link text', () => {
      trackOutboundLink('https://example.com');

      expect(mockWindow.gtag).toHaveBeenCalledWith(
        'event',
        'outbound_link_click',
        expect.objectContaining({
          destination_url: 'https://example.com',
          event_category: 'navigation',
          // link_text is undefined and sanitized away, so not present
        })
      );
    });
  });

  describe('Rate Limiting', () => {
    it('should allow events after rate limit window expires', async () => {
      // Track 10 events (max)
      for (let i = 0; i < 10; i++) {
        trackEvent(`test_event_${i}`);
      }

      expect(mockWindow.gtag).toHaveBeenCalledTimes(10);

      // Try to track 11th event (should be blocked)
      trackEvent('blocked_event');
      expect(mockWindow.gtag).toHaveBeenCalledTimes(10); // Still 10

      // Wait for rate limit window to expire
      await new Promise((resolve) => setTimeout(resolve, 1100));

      // Now should be able to track again
      trackEvent('allowed_event');
      expect(mockWindow.gtag).toHaveBeenCalledTimes(11);
    });
  });
});
