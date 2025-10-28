/**
 * Analytics Provider Component
 *
 * Injects analytics scripts (GA4 and Plausible) into the page.
 * Server Component compatible - uses next/script for optimal loading.
 *
 * Usage:
 * ```tsx
 * // In app/layout.tsx
 * import { AnalyticsProvider } from '@/components/analytics-provider';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <AnalyticsProvider />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

import Script from 'next/script';
import { type FC } from 'react';

/**
 * Check if GA4 is configured
 */
const isGA4Enabled = (): boolean => {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return Boolean(gaId && gaId !== 'G-XXXXXXXXXX');
};

/**
 * Check if Plausible is configured
 */
const isPlausibleEnabled = (): boolean => {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return Boolean(plausibleDomain && plausibleDomain !== 'astra.example.com');
};

/**
 * Check if Hotjar is configured
 */
const isHotjarEnabled = (): boolean => {
  const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID;
  return Boolean(hotjarId && hotjarId !== 'xxxxx');
};

/**
 * Get Hotjar Site ID from environment
 */
const getHotjarId = (): string | null => {
  return isHotjarEnabled() ? process.env.NEXT_PUBLIC_HOTJAR_ID! : null;
};

/**
 * Get GA4 Measurement ID from environment
 */
const getGA4Id = (): string | null => {
  return isGA4Enabled() ? process.env.NEXT_PUBLIC_GA_ID! : null;
};

/**
 * Get Plausible domain from environment
 */
const getPlausibleDomain = (): string | null => {
  return isPlausibleEnabled() ? process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN! : null;
};

/**
 * Google Analytics 4 Script Component
 *
 * Injects GA4 tracking script with proper configuration
 */
const GoogleAnalytics: FC = () => {
  const gaId = getGA4Id();

  if (!gaId) {
    return null;
  }

  return (
    <>
      {/* GA4 gtag.js script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        id="google-analytics-script"
      />

      {/* GA4 initialization */}
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              send_page_view: true,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
            });

            // Log GA4 initialization (development only)
            ${
              process.env.NODE_ENV === 'development'
                ? `console.log('[GA4] Initialized with ID: ${gaId}');`
                : ''
            }
          `,
        }}
      />
    </>
  );
};

/**
 * Plausible Analytics Script Component
 *
 * Privacy-friendly alternative to GA4
 * - No cookies
 * - GDPR compliant
 * - Lightweight (< 1 KB)
 */
const PlausibleAnalytics: FC = () => {
  const plausibleDomain = getPlausibleDomain();

  if (!plausibleDomain) {
    return null;
  }

  return (
    <>
      {/* Plausible script with custom events support */}
      <Script
        defer
        data-domain={plausibleDomain}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
        id="plausible-analytics-script"
      />

      {/* Plausible custom events initialization */}
      <Script
        id="plausible-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.plausible = window.plausible || function() {
              (window.plausible.q = window.plausible.q || []).push(arguments);
            };

            // Log Plausible initialization (development only)
            ${
              process.env.NODE_ENV === 'development'
                ? `console.log('[Plausible] Initialized for domain: ${plausibleDomain}');`
                : ''
            }
          `,
        }}
      />
    </>
  );
};

/**
 * Hotjar Analytics Script Component
 *
 * Heatmaps and session recording for user behavior analysis
 * - Heatmaps (click, move, scroll)
 * - Session recordings
 * - Conversion funnels
 */
const HotjarAnalytics: FC = () => {
  const hotjarId = getHotjarId();

  if (!hotjarId) {
    return null;
  }

  return (
    <Script
      id="hotjar-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${hotjarId},hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

          ${
            process.env.NODE_ENV === 'development'
              ? `console.log('[Hotjar] Initialized with ID: ${hotjarId}');`
              : ''
          }
        `,
      }}
    />
  );
};

/**
 * Analytics Provider Component
 *
 * Main component that renders all enabled analytics providers.
 * This is a Server Component by default (no 'use client').
 *
 * Features:
 * - Automatic GA4, Plausible, and Hotjar detection
 * - Only loads scripts if properly configured
 * - Uses next/script for optimal loading (afterInteractive strategy)
 * - No client-side JavaScript needed
 * - Development logging for debugging
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * <AnalyticsProvider />
 * ```
 */
export const AnalyticsProvider: FC = () => {
  const ga4Enabled = isGA4Enabled();
  const plausibleEnabled = isPlausibleEnabled();
  const hotjarEnabled = isHotjarEnabled();

  // If no analytics is configured, return null (don't render anything)
  if (!ga4Enabled && !plausibleEnabled && !hotjarEnabled) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[Analytics] No analytics providers configured. Set NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_PLAUSIBLE_DOMAIN, or NEXT_PUBLIC_HOTJAR_ID in .env.local'
      );
    }
    return null;
  }

  return (
    <>
      {ga4Enabled && <GoogleAnalytics />}
      {plausibleEnabled && <PlausibleAnalytics />}
      {hotjarEnabled && <HotjarAnalytics />}
    </>
  );
};

/**
 * Export helper functions for checking analytics status
 */
export { isGA4Enabled, isPlausibleEnabled };
