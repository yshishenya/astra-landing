# Tawk.to Integration - Code Snippets Reference

Quick reference guide with all code snippets for Tawk.to integration.

---

## Component Code

### Main Component: `/components/marketing/tawk-chat.tsx`

```typescript
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
 * Usage:
 * ```tsx
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

const isTawkEnabled = (): boolean => {
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

  return Boolean(
    propertyId &&
      widgetId &&
      propertyId !== 'your_property_id' &&
      widgetId !== 'your_widget_id'
  );
};

const getTawkPropertyId = (): string | null => {
  return process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || null;
};

const getTawkWidgetId = (): string | null => {
  return process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || null;
};

export const TawkChat: FC = () => {
  const propertyId = getTawkPropertyId();
  const widgetId = getTawkWidgetId();
  const isEnabled = isTawkEnabled();

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

      <Script
        id="tawk-to-config"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API = Tawk_API || {};

            Tawk_API.onChatStarted = function() {
              if (typeof window !== 'undefined') {
                if (window.gtag) {
                  window.gtag('event', 'chat_started', {
                    'event_category': 'engagement',
                    'event_label': 'tawk_chat_opened'
                  });
                }
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

            Tawk_API.onMessageSent = function() {
              if (typeof window !== 'undefined') {
                if (window.gtag) {
                  window.gtag('event', 'message_sent', {
                    'event_category': 'engagement',
                    'event_label': 'tawk_message_sent'
                  });
                }
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

            Tawk_API.onAgentMessageReceived = function() {
              if (typeof window !== 'undefined') {
                if (window.gtag) {
                  window.gtag('event', 'agent_replied', {
                    'event_category': 'engagement',
                    'event_label': 'tawk_agent_replied'
                  });
                }
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

export { isTawkEnabled, getTawkPropertyId, getTawkWidgetId };
```

---

## Layout Integration

### `/app/layout.tsx` - Import

```typescript
import { TawkChat } from '@/components/marketing/tawk-chat';
```

### `/app/layout.tsx` - Component

```typescript
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <AnalyticsProvider />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <TawkChat />
      </body>
    </html>
  );
}
```

---

## Environment Variables

### `.env.local` Setup

```bash
# Tawk.to Live Chat (FREE - no credit card required)
NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id
```

### `.env.example` Template

```bash
# Tawk.to Live Chat (FREE - no credit card required)
# Sign up at https://www.tawk.to
# Get Property ID and Widget ID from your Tawk.to dashboard
# Dashboard > Settings > Channels > Website > Embed Code
# Format: https://embed.tawk.to/{PROPERTY_ID}/{WIDGET_ID}
NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id
```

---

## Analytics Tracking

### GA4 Event Tracking

```typescript
// Automatically tracked by component:
window.gtag('event', 'chat_started', {
  'event_category': 'engagement',
  'event_label': 'tawk_chat_opened'
});

window.gtag('event', 'message_sent', {
  'event_category': 'engagement',
  'event_label': 'tawk_message_sent'
});

window.gtag('event', 'agent_replied', {
  'event_category': 'engagement',
  'event_label': 'tawk_agent_replied'
});
```

### Plausible Event Tracking

```typescript
// Automatically tracked by component:
window.plausible('Chat Started');
window.plausible('Chat Message Sent');
window.plausible('Agent Replied');
```

---

## Tawk.to API Callbacks

### Currently Implemented

```typescript
// Chat window opened
Tawk_API.onChatStarted = function() {
  // Tracked in analytics
};

// Visitor sent message
Tawk_API.onMessageSent = function() {
  // Tracked in analytics
};

// Agent sent message
Tawk_API.onAgentMessageReceived = function() {
  // Tracked in analytics
};
```

### Additional Available Callbacks

```typescript
// Chat window closed
Tawk_API.onChatClosed = function() {
  console.log('Chat closed');
};

// Agent sent message (to visitor)
Tawk_API.onAgentMessageSent = function() {
  console.log('Agent sent message');
};

// Visitor sent message
Tawk_API.onVisitorMessageSent = function() {
  console.log('Visitor message sent');
};

// Pre-chat form submitted
Tawk_API.onPrechatSubmit = function(data) {
  console.log('Pre-chat form submitted', data);
};

// Offline form submitted
Tawk_API.onOfflineSubmit = function(data) {
  console.log('Offline form submitted', data);
};

// Rating submitted
Tawk_API.onChatRating = function(data) {
  console.log('Chat rating', data);
};
```

---

## Custom Implementation Examples

### Add Chat Closed Event

```typescript
// In /components/marketing/tawk-chat.tsx, add to script:
Tawk_API.onChatClosed = function() {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'chat_closed', {
        'event_category': 'engagement',
        'event_label': 'tawk_chat_closed'
      });
    }
    if (window.plausible) {
      window.plausible('Chat Closed');
    }
  }
};
```

### Track User Information

```typescript
// In /components/marketing/tawk-chat.tsx, add to script:
Tawk_API.onPrechatSubmit = function(data) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'visitor_identified', {
      'event_category': 'engagement',
      'event_label': 'tawk_visitor_info',
      'visitor_email': data.email || 'unknown',
      'visitor_name': data.name || 'unknown'
    });
  }
};
```

### Conditional Widget Loading

```typescript
// Load only on specific pages
const shouldShowChat = () => {
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  // Don't show on admin pages
  return !path.startsWith('/admin');
};

export const TawkChat: FC = () => {
  if (!shouldShowChat()) return null;
  // ... rest of component
};
```

---

## Testing Code Snippets

### Verify Environment Variables

```javascript
// In browser console:
console.log(process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID);
console.log(process.env.NEXT_PUBLIC_TAWK_WIDGET_ID);
```

### Check GA4 Events

```javascript
// In browser console:
// Wait for chat event, then check:
console.log(window.dataLayer);

// Or filter for chat events:
window.dataLayer.filter(e =>
  e.event === 'chat_started' ||
  e.event === 'message_sent' ||
  e.event === 'agent_replied'
);
```

### Verify Plausible

```javascript
// In browser console:
console.log(window.plausible);

// Send test event:
window.plausible && window.plausible('Test Event');
```

### Check Widget Loading

```javascript
// In browser console:
console.log(window.Tawk_API);

// Check if loaded:
if (window.Tawk_API) {
  console.log('Tawk.to loaded successfully');
}
```

---

## Docker Deployment

### Docker Environment Variables

```dockerfile
# In Dockerfile or docker-compose.yml:
ENV NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
ENV NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id
```

### Docker Compose

```yaml
version: '3.8'

services:
  astra-landing:
    build: .
    environment:
      NEXT_PUBLIC_TAWK_PROPERTY_ID: ${NEXT_PUBLIC_TAWK_PROPERTY_ID}
      NEXT_PUBLIC_TAWK_WIDGET_ID: ${NEXT_PUBLIC_TAWK_WIDGET_ID}
    ports:
      - "3000:3000"
```

### Build Command

```bash
NEXT_PUBLIC_TAWK_PROPERTY_ID=your_id \
NEXT_PUBLIC_TAWK_WIDGET_ID=1 \
docker-compose up -d
```

---

## Debugging Snippets

### Check Component Props

```typescript
// In /components/marketing/tawk-chat.tsx
const propertyId = getTawkPropertyId();
const widgetId = getTawkWidgetId();
const isEnabled = isTawkEnabled();

console.log('Tawk Configuration:', {
  propertyId,
  widgetId,
  isEnabled,
  isDevelopment: process.env.NODE_ENV === 'development'
});
```

### Monitor Script Loading

```javascript
// In browser console:
// Monitor script loading
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach((node) => {
        if (node.id === 'tawk-to-chat' || node.id === 'tawk-to-config') {
          console.log('Tawk script loaded:', node);
        }
      });
    }
  });
});

observer.observe(document.head, { childList: true });
```

### Performance Monitoring

```javascript
// Measure Tawk.to loading time
if (performance.getEntriesByType) {
  const tawkScripts = performance.getEntriesByType('resource')
    .filter(r => r.name.includes('tawk'));
  console.log('Tawk loading time:', tawkScripts);
}
```

---

## Configuration Examples

### Custom Welcome Message

In Tawk.to Dashboard:
```
Settings > Channels > Website > Widget Settings

Welcome Message:
"Привет! Есть вопросы об Astra?
Пишите нам, мы ответим в течение нескольких минут."
```

### Custom Offline Message

```
Settings > General Settings > Offline Message

"Спасибо за вашу ставку!
К сожалению, мы сейчас offline.
Оставьте ваше сообщение, и мы ответим как только сможем."
```

### Custom Canned Responses

```
Dashboard > Canned Responses

Response 1:
Title: "Основная информация"
Content: "Спасибо за интерес к Astra!
- Анализ резюме за 90 секунд
- 6 методов анализа
- 99.9% качество
- 162x ROI"

Response 2:
Title: "Цены"
Content: "Наши пакеты:
- Basic: 30,000 ₽/год
- Pro: 60,000 ₽/год (рекомендуется)
- Enterprise: Custom"
```

---

## TypeScript Type Definitions

### Component Props (if needed in future)

```typescript
interface TawkChatProps {
  propertyId?: string;
  widgetId?: string;
  onChatStarted?: () => void;
  onMessageSent?: () => void;
  onAgentReply?: () => void;
}

export const TawkChat: FC<TawkChatProps> = ({
  propertyId,
  widgetId,
  onChatStarted,
  onMessageSent,
  onAgentReply,
}) => {
  // ...
};
```

### Tawk API Type Definitions

```typescript
interface TawkAPI {
  onChatStarted?: () => void;
  onChatClosed?: () => void;
  onMessageSent?: () => void;
  onAgentMessageReceived?: () => void;
  onVisitorMessageSent?: () => void;
  onPrechatSubmit?: (data: Record<string, any>) => void;
  onOfflineSubmit?: (data: Record<string, any>) => void;
  onChatRating?: (data: Record<string, any>) => void;
}

declare global {
  interface Window {
    Tawk_API?: TawkAPI;
    Tawk_LoadStart?: Date;
  }
}
```

---

## Common Copy-Paste Snippets

### Quick Setup in .env.local

```bash
NEXT_PUBLIC_TAWK_PROPERTY_ID=REPLACE_WITH_YOUR_PROPERTY_ID
NEXT_PUBLIC_TAWK_WIDGET_ID=1
```

### Import Statement

```typescript
import { TawkChat } from '@/components/marketing/tawk-chat';
```

### Component Usage

```typescript
<TawkChat />
```

### Verification Command

```bash
pnpm dev
# Then open http://localhost:3001
# Widget should appear in bottom-right corner
```

---

## Verification Checklist Code

```javascript
// Copy-paste in browser console to verify setup

const verify = {
  envSet: Boolean(
    process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID &&
    process.env.NEXT_PUBLIC_TAWK_WIDGET_ID
  ),
  tawkLoaded: Boolean(window.Tawk_API),
  ga4Available: Boolean(window.gtag),
  plausibleAvailable: Boolean(window.plausible),
  widgetVisible: Boolean(
    document.querySelector('iframe[title*="Tawk"]') ||
    document.querySelector('[id*="tawk"]')
  )
};

console.table(verify);
console.log('All required:', Object.values(verify).every(Boolean));
```

---

## Next Steps Snippet

```typescript
// Copy this to a task manager or checklist

[ ] 1. Read TAWK_QUICK_REFERENCE.md (5 min)
[ ] 2. Create account at https://www.tawk.to
[ ] 3. Extract Property ID and Widget ID
[ ] 4. Add NEXT_PUBLIC_TAWK_PROPERTY_ID to .env.local
[ ] 5. Add NEXT_PUBLIC_TAWK_WIDGET_ID to .env.local
[ ] 6. Run: pnpm dev
[ ] 7. Verify widget appears in bottom-right
[ ] 8. Test chat functionality
[ ] 9. Deploy to staging
[ ] 10. Deploy to production
[ ] 11. Monitor conversations in Tawk.to dashboard
```

---

**All code snippets are production-ready and follow Astra coding standards.**

For full documentation, refer to the main documentation files:
- TAWK_QUICK_REFERENCE.md
- TAWK_INTEGRATION_README.md
- TAWK_SETUP.md
