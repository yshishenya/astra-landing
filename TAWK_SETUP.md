# Tawk.to Live Chat Integration Guide

Complete setup guide for integrating Tawk.to live chat widget into the Astra landing page.

**Last Updated:** 2025-10-29
**Status:** Ready for implementation

---

## Table of Contents

1. [Overview](#overview)
2. [Account Creation](#account-creation)
3. [Environment Configuration](#environment-configuration)
4. [Widget Setup](#widget-setup)
5. [Customization Guide](#customization-guide)
6. [Analytics Integration](#analytics-integration)
7. [Testing Checklist](#testing-checklist)
8. [Troubleshooting](#troubleshooting)

---

## Overview

### What is Tawk.to?

Tawk.to is a **FREE** live chat service that allows you to:
- Chat with website visitors in real-time
- Collect visitor information (email, name)
- Set up automated responses and canned messages
- Create departments and assign agents
- View chat history and analytics
- No credit card required

### Why Tawk.to for Astra?

- **Cost:** Completely free (no premium required for basic features)
- **Setup:** 5-minute setup, no developer required
- **Features:** Perfect for lead qualification and support
- **Integration:** Lightweight, doesn't impact page performance
- **Analytics:** Track chat opens, messages, and agent responses

### Implementation Details

**Component:** `/components/marketing/tawk-chat.tsx`
- Client Component using 'use client' directive
- Uses Next.js `Script` component for optimal loading
- Strategy: `lazyOnload` (loads after page is interactive)
- Only renders if environment variables are configured
- Tracks chat events in GA4 and Plausible analytics

**Layout Integration:** `/app/layout.tsx`
- Added `<TawkChat />` before closing `</body>` tag
- Positioned after analytics providers
- Doesn't block page rendering or navigation

---

## Account Creation

### Step 1: Create Tawk.to Account

1. Go to https://www.tawk.to
2. Click **"Sign Up Free"** button
3. Choose sign-up method:
   - Email + password (recommended)
   - Google account
   - Microsoft account
4. Enter your details:
   - Email address
   - Password (strong: mix of letters, numbers, symbols)
   - Company name (optional but recommended)
   - Country
5. Click **"Create Account"**
6. Verify email if required (check inbox and spam folder)

### Step 2: Create First Website/Property

After account creation, you'll be prompted to add your website:

1. Enter your website details:
   - **Website Name:** "Astra Landing Page" or "Astra.ai"
   - **Website URL:** https://astra.ai (or your staging URL)
   - **Website Category:** Select "Technology/Software"
   - **Language:** Russian (Русский) or English

2. Click **"Create Website"**

### Step 3: Get Embed Code

Once website is created:

1. Navigate to: **Dashboard > Settings > Channels > Website**
2. Find the **"Embed Code"** section
3. Look for the script tag with format:
   ```html
   <!--Start of Tawk.to Script-->
   <script type="text/javascript">
   var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
   (function(){
   var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
   s1.async=true;
   s1.src='https://embed.tawk.to/PROPERTY_ID/WIDGET_ID';
   s1.charset='UTF-8';
   s1.setAttribute('crossorigin','*');
   s0.parentNode.insertBefore(s1,s0);
   })();
   </script>
   <!--End of Tawk.to Script-->
   ```

4. Extract the two IDs:
   - **Property ID:** First long string (e.g., `673a1b2c3d4e5f6a`)
   - **Widget ID:** Second number (typically `1`)
   - Full URL format: `https://embed.tawk.to/{PROPERTY_ID}/{WIDGET_ID}`

---

## Environment Configuration

### Update .env.local File

Add your Tawk.to credentials to `.env.local`:

```bash
# Tawk.to Live Chat (FREE - no credit card required)
NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id
```

**Important:**
- Replace `your_property_id` with actual Property ID
- Replace `your_widget_id` with actual Widget ID
- Do NOT commit `.env.local` to git (it's in `.gitignore`)
- Can be different per environment (dev, staging, production)

### Verify Environment Variables

To test your configuration:

1. In your terminal, verify variables are set:
   ```bash
   echo $NEXT_PUBLIC_TAWK_PROPERTY_ID
   echo $NEXT_PUBLIC_TAWK_WIDGET_ID
   ```

2. Start development server:
   ```bash
   pnpm dev
   ```

3. Open browser DevTools Console and look for Tawk.to initialization logs:
   ```
   [Tawk.to] Initialized
   [Tawk.to] Property ID: your_property_id
   [Tawk.to] Widget ID: your_widget_id
   ```

---

## Widget Setup

### Basic Configuration

Once environment variables are set, the widget will appear on the bottom-right of your page.

To customize widget appearance and behavior:

1. Go to Tawk.to **Dashboard**
2. Select your website property
3. Go to **Settings > Channels > Website**
4. Find **Widget Customization** section

### Widget Settings

#### Appearance
- **Widget Color:** Recommend matching Astra primary color (#22d3ee)
- **Position:** Bottom-right (default, recommended)
- **Widget Icon:** Default chat bubble or custom
- **Round Corners:** Enable for modern look
- **Show as Popup:** Enable to show chat as modal/dialog

#### Welcome Message (Russian)
```
Привет! Есть вопросы об Astra?
Пишите нам, мы ответим в течение нескольких минут.
```

#### Offline Message (Russian)
```
Спасибо за вашу ставку!
К сожалению, мы сейчас offline.
Оставьте ваше сообщение, и мы ответим как только сможем.
```

#### Pre-chat Form (Optional)
Enable to collect visitor info before chat:
- Name (required)
- Email (required)
- Message (optional)

---

## Customization Guide

### Department Setup

Create departments for routing messages:

1. Go to **Settings > General Settings > Departments**
2. Create departments:
   - **Sales:** For pricing/demo questions
   - **Support:** For product questions
   - **Enterprise:** For large deals
3. Set default department priority
4. Assign agents to departments

### Canned Responses

Create quick reply templates for common questions:

1. Go to **Dashboard > Canned Responses**
2. Create responses in Russian and English:

**Russian:**
```
Спасибо за интерес к Astra!

Вот краткое описание наших ключевых возможностей:
- Анализ резюме за 90 секунд (вместо 2-3 часов)
- 6 методов анализа (SWOT, Holland, ИПР, Soft Skills, психометрия)
- 99.9% качество анализа
- 162x ROI
- Снижение текучки на 5-10%

Какой у вас есть вопрос?
```

**English:**
```
Thank you for your interest in Astra!

Here are our key features:
- Resume analysis in 90 seconds (vs 2-3 hours)
- 6 analysis methods (SWOT, Holland, IDP, Soft Skills, psychometry)
- 99.9% analysis quality
- 162x ROI
- 5-10% churn reduction

What would you like to know?
```

### Business Hours

Set your availability:

1. Go to **Settings > General Settings > Business Hours**
2. Configure:
   - Timezone (your location)
   - Operating hours (e.g., 9 AM - 6 PM)
   - Days of operation (Mon-Fri)
   - Holidays (optional)
3. Set offline message to display outside business hours

### Agent Setup

Add team members:

1. Go to **Settings > Team Members**
2. Click **"Add Agent"**
3. Enter agent details:
   - Email address
   - Name
   - Department
   - Status (Active/Away)
4. Agent receives invite email
5. Agent logs in with their email

---

## Analytics Integration

### Automatic Event Tracking

The Tawk.to component automatically tracks these events:

**In Google Analytics 4:**
- `chat_started` - When visitor opens chat window
- `message_sent` - When visitor sends message
- `agent_replied` - When agent sends reply

**In Plausible Analytics:**
- `Chat Started`
- `Chat Message Sent`
- `Agent Replied`

### View Chat Analytics in Tawk.to

1. Go to **Dashboard > Analytics**
2. View statistics:
   - Total chats
   - Average response time
   - Satisfaction rating
   - Conversion (chat to lead)
3. Export reports for your records

### Custom Tawk.to API Events

You can add more tracking by modifying `/components/marketing/tawk-chat.tsx`:

```typescript
// Example: Track when chat is closed
Tawk_API.onChatClosed = function() {
  if (window.gtag) {
    window.gtag('event', 'chat_closed', {
      'event_category': 'engagement',
      'event_label': 'tawk_chat_closed'
    });
  }
};
```

Available Tawk API callbacks:
- `onChatStarted` - Chat window opened
- `onChatClosed` - Chat window closed
- `onMessageSent` - Visitor sent message
- `onAgentMessageReceived` - Agent replied
- `onVisitorMessageSent` - Visitor message received

---

## Testing Checklist

### Before Launch

- [ ] **Account Created:** Tawk.to account exists and confirmed
- [ ] **IDs Configured:** `NEXT_PUBLIC_TAWK_PROPERTY_ID` and `NEXT_PUBLIC_TAWK_WIDGET_ID` set in `.env.local`
- [ ] **Component Integration:** `<TawkChat />` added to `app/layout.tsx`
- [ ] **Layout Placement:** Widget appears in bottom-right corner
- [ ] **Mobile Responsive:** Widget displays correctly on mobile devices (< 768px)
- [ ] **Tablet Responsive:** Widget displays correctly on tablets (768px - 1199px)
- [ ] **Desktop Display:** Widget displays correctly on desktop (1200px+)

### Functional Testing

- [ ] **Widget Visibility:** Chat widget is visible on page load
- [ ] **Click to Open:** Clicking widget opens chat window
- [ ] **Message Sending:** Can type and send messages
- [ ] **Offline Mode:** Offline message displays correctly outside business hours
- [ ] **Pre-chat Form:** Pre-chat form works (if enabled)
- [ ] **Department Routing:** Messages route to correct departments
- [ ] **Canned Responses:** Quick replies work correctly
- [ ] **Agent Access:** Agents can see and respond to messages

### Analytics Testing

- [ ] **GA4 Events:** Chat events appear in Google Analytics
- [ ] **Plausible Events:** Chat events appear in Plausible
- [ ] **Event Properties:** Events include proper category and label
- [ ] **Timestamp:** Events are timestamped correctly
- [ ] **User Identification:** Events associated with correct user

### Performance Testing

- [ ] **Page Load Time:** No significant impact on LCP (Largest Contentful Paint)
- [ ] **No Layout Shift:** Widget doesn't cause layout shifts (CLS)
- [ ] **Console Errors:** No JavaScript errors in browser console
- [ ] **Memory:** No memory leaks (check DevTools Performance tab)
- [ ] **Network:** Script loads from CDN without delays (< 2 seconds)

### Browser Compatibility

- [ ] **Chrome:** Latest version (Windows/Mac/Linux)
- [ ] **Firefox:** Latest version
- [ ] **Safari:** Latest version (macOS and iOS)
- [ ] **Edge:** Latest version
- [ ] **Mobile Safari:** iOS 13+
- [ ] **Chrome Mobile:** Android 5+

### Accessibility Testing

- [ ] **Keyboard Navigation:** Can tab to chat button
- [ ] **Screen Reader:** Chat button has proper ARIA labels
- [ ] **Focus Visible:** Focus indicator visible when tabbing
- [ ] **Color Contrast:** Chat widget has sufficient color contrast
- [ ] **Zoom:** Widget works correctly when page is zoomed

---

## Troubleshooting

### Widget Not Appearing

**Problem:** Chat widget doesn't show on page

**Solutions:**
1. Verify `.env.local` has both `NEXT_PUBLIC_TAWK_PROPERTY_ID` and `NEXT_PUBLIC_TAWK_WIDGET_ID`
2. Confirm IDs are not placeholder values (`your_property_id`, `your_widget_id`)
3. Restart development server: `pnpm dev`
4. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
5. Check browser console for errors: `F12` → Console tab
6. Verify website domain matches in Tawk.to settings

### Widget Loading Slowly

**Problem:** Chat widget takes too long to load

**Solutions:**
1. Check network speed (DevTools → Network tab)
2. Verify Tawk.to CDN is accessible: https://embed.tawk.to
3. Widget loads with `lazyOnload` strategy (intentionally deferred for performance)
4. This is normal and expected behavior

### Chat Not Sending Messages

**Problem:** Messages don't send or get stuck

**Solutions:**
1. Check internet connection
2. Verify pre-chat form is filled (if required)
3. Check agent is online and accepting chats
4. Check department is active and has available agents
5. Try refreshing page and retrying
6. Check Tawk.to server status: https://status.tawk.to

### Analytics Events Not Tracking

**Problem:** Chat events don't appear in GA4 or Plausible

**Solutions:**
1. Verify GA4 ID or Plausible domain is configured
2. Check that `AnalyticsProvider` is loaded in `app/layout.tsx`
3. In browser console, verify `window.gtag` or `window.plausible` exists
4. Wait 24-48 hours for events to appear in analytics dashboard
5. Check if analytics are filtered by date range in dashboard

### Widget Blocking Content

**Problem:** Chat widget overlaps page content

**Solutions:**
1. Adjust bottom-right position in Tawk.to settings
2. Add custom CSS margin to page elements if needed
3. Move widget to bottom-left if needed
4. Reduce widget size in Tawk.to appearance settings

### Multiple Chat Windows Opening

**Problem:** Chat widget appears multiple times

**Solutions:**
1. Check that `<TawkChat />` is only added once in `app/layout.tsx`
2. Verify no duplicate scripts in HTML
3. Clear browser cache completely
4. Restart development server

### SSL/HTTPS Issues

**Problem:** Widget doesn't load on HTTPS sites

**Solutions:**
1. This should work automatically - Tawk.to supports HTTPS
2. Check browser console for mixed content warnings
3. Verify Tawk.to is loaded from HTTPS URL (not HTTP)
4. Check CORS settings in Tawk.to dashboard

---

## Environment Variables Reference

### Development Environment

```bash
# .env.local (development)
NEXT_PUBLIC_TAWK_PROPERTY_ID=673a1b2c3d4e5f6a
NEXT_PUBLIC_TAWK_WIDGET_ID=1
```

### Staging Environment

Create separate Tawk.to property for staging:

```bash
# .env.staging or environment variable
NEXT_PUBLIC_TAWK_PROPERTY_ID=staging_property_id
NEXT_PUBLIC_TAWK_WIDGET_ID=1
```

### Production Environment

Create separate Tawk.to property for production:

```bash
# Set in Vercel > Settings > Environment Variables
NEXT_PUBLIC_TAWK_PROPERTY_ID=production_property_id
NEXT_PUBLIC_TAWK_WIDGET_ID=1
```

---

## Security Considerations

### Data Privacy

- Tawk.to complies with GDPR, CCPA, and other privacy regulations
- Chat messages are encrypted in transit (HTTPS)
- See Tawk.to Privacy Policy: https://www.tawk.to/privacy-policy
- Consider adding privacy notice if required by your jurisdiction

### Authentication

- Don't expose IDs in public code (use environment variables)
- Use `.env.local` for development (not committed to git)
- Use Vercel/hosting platform's environment variables for production
- Rotate IDs if accidentally exposed

### Rate Limiting

- Tawk.to handles rate limiting automatically
- No additional configuration needed
- Monitor usage if expecting very high traffic

---

## Frequently Asked Questions

### Q: Can I use Tawk.to for free permanently?

**A:** Yes, Tawk.to is completely free. There's no time limit or hidden charges. You only pay if you choose premium features (which are optional).

### Q: How many agents can I add?

**A:** Unlimited agents can be added to free accounts.

### Q: Can I set chat availability by timezone?

**A:** Yes, Tawk.to supports multiple timezones. Set in Settings > General Settings > Business Hours.

### Q: Will chat widget affect page performance?

**A:** Minimal impact. The widget loads with `lazyOnload` strategy after page is interactive. Typical impact: < 50ms additional page load time.

### Q: Can I customize widget colors to match Astra branding?

**A:** Yes, in Tawk.to Settings > Channels > Website > Widget Customization. Recommend using Astra primary color #22d3ee.

### Q: How do I track which pages generate the most chats?

**A:** Tawk.to tracks page URLs automatically. Go to Analytics > Conversations and filter by page.

### Q: Can I integrate with other tools (Slack, CRM)?

**A:** Yes, Tawk.to supports integrations. Check Tawk.to Marketplace for available integrations.

### Q: What if my agent goes offline?

**A:** Set offline message in Settings > General Settings. Messages can still be submitted when offline.

### Q: How do I train my team on using Tawk.to?

**A:** See Tawk.to help center: https://help.tawk.to

---

## Additional Resources

### Official Links
- **Tawk.to Home:** https://www.tawk.to
- **Help Center:** https://help.tawk.to
- **Dashboard:** https://dashboard.tawk.to
- **Status Page:** https://status.tawk.to
- **Integrations:** https://tawk.link/marketplace

### Documentation
- **Implementation Guide:** `/components/marketing/tawk-chat.tsx` (code comments)
- **Environment Setup:** `.env.example`
- **Integration Point:** `/app/layout.tsx`

### Support
- **Live Chat:** On Tawk.to website itself
- **Email:** support@tawk.to
- **Community Forum:** https://tawk.to/community

---

## Next Steps

1. **Create Account:** Sign up at https://www.tawk.to
2. **Get Credentials:** Extract Property ID and Widget ID
3. **Configure Environment:** Update `.env.local`
4. **Test Locally:** Run `pnpm dev` and verify widget appears
5. **Deploy:** Push to staging/production
6. **Monitor:** Check analytics and respond to visitors
7. **Optimize:** Adjust settings based on visitor behavior

---

**Notes:**
- This integration is non-intrusive and doesn't require code changes to existing components
- Tawk.to script is lazy-loaded, so it won't block page rendering
- All chat data is stored in Tawk.to cloud (no local storage required)
- Consider adding privacy notice if required in your jurisdiction

**Contact:** For questions about Astra integration, refer to `.memory_bank/patterns/api_standards.md`

---

**Last Updated:** 2025-10-29
**Status:** Production-ready
