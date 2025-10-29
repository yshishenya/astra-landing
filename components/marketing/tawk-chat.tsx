/**
 * Tawk.to Live Chat Component
 *
 * Integrates Tawk.to live chat widget into the page.
 * Free live chat service with no credit card required.
 *
 * Features:
 * - Loads only on client-side (no SSR)
 * - Uses Next.js Script component for optimal performance
 * - Strategy: 'lazyOnload' (loads after page is interactive)
 * - Supports custom widget configuration
 * - Tracks chat events for analytics
 *
 * Setup:
 * 1. Create account at https://www.tawk.to
 * 2. Get Property ID and Widget ID from dashboard
 * 3. Add to .env.local:
 *    NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
 *    NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id
 * 4. Add <TawkChat /> to app/layout.tsx
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * import { TawkChat } from '@/components/marketing/tawk-chat';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <TawkChat />
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

'use client';

import Script from 'next/script';
import type { FC } from 'react';

/**
 * Check if Tawk.to is configured in environment variables
 */
const isTawkEnabled = (): boolean => {
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

  // Return false if using placeholder IDs
  return Boolean(
    propertyId && widgetId && propertyId !== 'your_property_id' && widgetId !== 'your_widget_id'
  );
};

/**
 * Get Tawk.to Property ID from environment
 */
const getTawkPropertyId = (): string | null => {
  return process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || null;
};

/**
 * Get Tawk.to Widget ID from environment
 */
const getTawkWidgetId = (): string | null => {
  return process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || null;
};

/**
 * Tawk.to Live Chat Widget Component
 *
 * Client Component that loads the Tawk.to widget script.
 * Only renders if both PROPERTY_ID and WIDGET_ID are configured.
 *
 * Features:
 * - Lazy loads after page is interactive
 * - Conditionally renders based on environment variables
 * - Supports custom Tawk API initialization
 * - Development logging for debugging
 *
 * Widget customization is done in Tawk.to dashboard:
 * - Widget color (recommended: #22d3ee - Astra primary)
 * - Position (bottom-right, default)
 * - Welcome message (Russian: "Привет! Есть вопросы об Astra?")
 * - Offline message (Russian: "Мы сейчас offline, оставьте сообщение")
 * - Automated responses
 * - Department routing
 *
 * @returns React component or null if not configured
 */
export const TawkChat: FC = () => {
  const propertyId = getTawkPropertyId();
  const widgetId = getTawkWidgetId();
  const isEnabled = isTawkEnabled();

  // Don't render if not configured
  if (!isEnabled || !propertyId || !widgetId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[Tawk.to] Not configured. Set NEXT_PUBLIC_TAWK_PROPERTY_ID and NEXT_PUBLIC_TAWK_WIDGET_ID in .env.local'
      );
    }
    return null;
  }

  return (
    <>
      {/* Tawk.to Widget Script */}
      <Script
        id="tawk-to-chat"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/${propertyId}/${widgetId}';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />

      {/* Tawk.to API Customization and Event Tracking */}
      <Script
        id="tawk-to-config"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            // Tawk.to API callbacks for event tracking
            var Tawk_API = Tawk_API || {};

            // Called when visitor opens the chat window
            Tawk_API.onChatStarted = function() {
              if (typeof window !== 'undefined') {
                // Track event in analytics (GA4 if available)
                if (window.gtag) {
                  window.gtag('event', 'chat_started', {
                    'event_category': 'engagement',
                    'event_label': 'tawk_chat_opened'
                  });
                }
                // Track in Plausible if available
                if (window.plausible) {
                  window.plausible('Chat Started');
                }
              }
              ${
                process.env.NODE_ENV === 'development'
                  ? `console.log('[Tawk.to] Chat window opened');`
                  : ''
              }
            };

            // Called when visitor sends a message
            Tawk_API.onMessageSent = function() {
              if (typeof window !== 'undefined') {
                // Track event in analytics
                if (window.gtag) {
                  window.gtag('event', 'message_sent', {
                    'event_category': 'engagement',
                    'event_label': 'tawk_message_sent'
                  });
                }
                // Track in Plausible
                if (window.plausible) {
                  window.plausible('Chat Message Sent');
                }
              }
              ${
                process.env.NODE_ENV === 'development'
                  ? `console.log('[Tawk.to] Visitor message sent');`
                  : ''
              }
            };

            // Called when agent sends a message
            Tawk_API.onAgentMessageReceived = function() {
              if (typeof window !== 'undefined') {
                // Track event in analytics
                if (window.gtag) {
                  window.gtag('event', 'agent_replied', {
                    'event_category': 'engagement',
                    'event_label': 'tawk_agent_replied'
                  });
                }
                // Track in Plausible
                if (window.plausible) {
                  window.plausible('Agent Replied');
                }
              }
              ${
                process.env.NODE_ENV === 'development'
                  ? `console.log('[Tawk.to] Agent message received');`
                  : ''
              }
            };

            // Called when visitor goes offline
            Tawk_API.onVisitorMessageSent = function() {
              ${
                process.env.NODE_ENV === 'development'
                  ? `console.log('[Tawk.to] Visitor message sent');`
                  : ''
              }
            };

            // Log Tawk.to initialization
            ${
              process.env.NODE_ENV === 'development'
                ? `
                  console.log('[Tawk.to] Initialized');
                  console.log('[Tawk.to] Property ID: ${propertyId}');
                  console.log('[Tawk.to] Widget ID: ${widgetId}');
                `
                : ''
            }
          `,
        }}
      />
    </>
  );
};

/**
 * Export helper functions for checking Tawk.to status
 */
export { isTawkEnabled, getTawkPropertyId, getTawkWidgetId };
