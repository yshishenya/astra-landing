# Troubleshooting Guide - Astra Landing Page

**Purpose:** Common issues and their solutions for the Astra Landing Page project

**Last Updated:** 2025-10-29

---

## Environment Variables

### Issue: Environment variables not available in browser (showing as `null` or `undefined`)

**Symptoms:**
- `process.env.NEXT_PUBLIC_*` variables show as `null` in browser console
- Debug messages show missing configuration
- Third-party integrations (Tawk.to, GA4, etc.) don't load

**Root Cause:**
Next.js embeds `NEXT_PUBLIC_*` environment variables at **build time** for client components. If you:
1. Start the dev server (`pnpm dev`)
2. Then add/modify environment variables in `.env.local`
3. The running dev server won't pick up these changes

**Solution:**

**For Local Development:**
```bash
# 1. Stop the dev server (Ctrl+C or kill the process)
pkill -f "next"

# 2. Restart the dev server
pnpm dev
```

**For Docker:**
```bash
# Restart Docker containers to pick up .env.local changes
docker compose down
docker compose up -d

# Verify environment variables are loaded
docker exec astra-landing printenv | grep NEXT_PUBLIC_TAWK
```

**Prevention:**
- Always restart the dev server after modifying `.env.local`
- Add environment variables BEFORE starting the dev server when possible
- Use the `--turbo` flag for faster dev server restarts (Next.js 13+)

**Related Files:**
- `.env.local` - Local environment variables (never commit to git!)
- `.env.example` - Template for required environment variables
- `next.config.ts` - Next.js configuration

**References:**
- [Next.js Environment Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
- Bug fix: `[BUG-01]` in `.memory_bank/current_tasks.md`

---

## Tawk.to Integration

### Issue: Tawk.to blocked by Content Security Policy (CSP)

**Symptoms:**
- Browser console error: `Refused to load the script 'https://embed.tawk.to/...' because it violates the following Content Security Policy directive`
- Environment variables are correct
- No widget appears on page

**Root Cause:**
Next.js security headers block third-party scripts by default. Tawk.to domains must be explicitly whitelisted in CSP.

**Solution:**
Add Tawk.to domains to `next.config.ts`:

```typescript
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    // Add Tawk.to script sources
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://embed.tawk.to https://va.tawk.to",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    // Add Tawk.to WebSocket and API connections
    "connect-src 'self' https://va.tawk.to wss://*.tawk.to",
    // Add Tawk.to iframe
    "frame-src https://embed.tawk.to",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
}
```

**Complete CSP Configuration for Tawk.to:**
- `script-src`: `https://embed.tawk.to` (widget script), `https://va.tawk.to` (analytics)
- `style-src`: `https://embed.tawk.to` (widget CSS), `https://fonts.googleapis.com` (Google Fonts)
- `font-src`: `https://embed.tawk.to` (widget fonts), `https://fonts.gstatic.com` (Google Fonts CDN)
- `connect-src`: `https://embed.tawk.to` (JSON files), `https://va.tawk.to` (API), `wss://*.tawk.to` (WebSocket chat)
- `frame-src`: `https://embed.tawk.to` (widget iframe)

**Important:**
- `connect-src` must include `https://embed.tawk.to` for Fetch API requests (language files, config, etc.)
- `style-src` and `font-src` needed for widget appearance to work correctly

**After modifying next.config.ts:**
```bash
# For local dev
pnpm dev

# For Docker production
docker compose build --no-cache
docker compose up -d
```

---

### Issue: Tawk.to widget not appearing on the page

**Symptoms:**
- No chat widget in bottom-right corner
- Debug messages show: `Property ID: null`, `Widget ID: null`, `Is Enabled: false`

**Diagnosis:**
Check the browser console for debug messages:
```javascript
[Tawk.to Debug] Property ID: null
[Tawk.to Debug] Widget ID: null
[Tawk.to Debug] Is Enabled: false
```

**Solutions:**

#### 1. Missing Environment Variables
If variables are not set in `.env.local`:

```bash
# Add to .env.local
NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id_here
NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id_here
```

#### 2. Dev Server Not Restarted
If variables exist but show as `null`:

```bash
# Restart the dev server
pkill -f "next"
pnpm dev
```

#### 3. Verify Credentials
Check if your Tawk.to credentials are correct:

1. Log in to [Tawk.to Dashboard](https://dashboard.tawk.to)
2. Go to **Administration** → **Channels** → **Chat Widget**
3. Click **Embed Code**
4. Copy Property ID and Widget ID from the URL:
   ```
   https://embed.tawk.to/{PROPERTY_ID}/{WIDGET_ID}
   ```

**Verification:**
After fixing, you should see in browser console:
```javascript
[Tawk.to Debug] Property ID: 6901671363418c195086a383
[Tawk.to Debug] Widget ID: 1j8mnla16
[Tawk.to Debug] Is Enabled: true
[Tawk.to] Component rendering with credentials
[Tawk.to] Initialized
```

**Related Files:**
- `components/marketing/tawk-chat.tsx` - Tawk.to component
- `app/layout.tsx` - Where TawkChat is rendered
- `.env.local` - Environment variables

---

## Build Errors

### Issue: TypeScript compilation errors

**Symptoms:**
```
Type error: Property 'X' does not exist on type 'Y'
```

**Solutions:**

#### 1. Run Type Check
```bash
pnpm tsc --noEmit
```

#### 2. Check for Missing Type Definitions
```bash
# Install type definitions
pnpm add -D @types/node @types/react @types/react-dom
```

#### 3. Strict Mode Issues
If you're using TypeScript strict mode (enabled in this project), ensure:
- All function parameters have type annotations
- No implicit `any` types
- Optional properties use `?` or have default values

**Related Files:**
- `tsconfig.json` - TypeScript configuration
- `.memory_bank/guides/coding_standards.md` - TypeScript best practices

---

## Performance Issues

### Issue: Slow page load or low Lighthouse scores

**Diagnosis:**
```bash
# Run Lighthouse audit
pnpm build
pnpm start
# Then open Chrome DevTools → Lighthouse
```

**Common Causes:**

#### 1. Large Bundle Size
```bash
# Analyze bundle
pnpm build
# Check .next/analyze/ for bundle report
```

**Solutions:**
- Use dynamic imports for large components (see `roi-calculator.tsx`)
- Enable code splitting in `next.config.ts`
- Remove unused dependencies

#### 2. Unoptimized Images
**Solution:**
- Use Next.js `<Image>` component (already implemented)
- Convert to AVIF/WebP (configured in `next.config.ts`)

#### 3. Blocking JavaScript
**Solution:**
- Use `next/script` with `strategy="afterInteractive"` (already implemented)
- Defer non-critical scripts

**Related Documents:**
- `.memory_bank/current_tasks.md` - Performance optimization history
- `PERFORMANCE_OPTIMIZATION_REPORT.md` - Detailed performance analysis

---

## Testing Issues

### Issue: Playwright tests failing

**Diagnosis:**
```bash
# Run tests with debug
pnpm test:e2e --debug
```

**Common Causes:**

#### 1. Dev Server Not Running
```bash
# Start dev server in another terminal
pnpm dev

# Then run tests
pnpm test:e2e
```

#### 2. Timeouts
Increase timeout in `playwright.config.ts`:
```typescript
timeout: 30000, // 30 seconds
```

#### 3. Selector Changes
Update selectors in test files if component structure changed.

**Related Files:**
- `playwright.config.ts` - Playwright configuration
- `e2e/*.spec.ts` - E2E test files
- `.memory_bank/guides/testing_strategy.md` - Testing strategy

---

## Docker Issues

### Issue: NEXT_PUBLIC_* environment variables not working in Docker production build

**Symptoms:**
- `process.env.NEXT_PUBLIC_*` variables show as `null` in browser console
- Third-party integrations don't work (Tawk.to, GA4, etc.)
- Running `docker exec astra-landing printenv` shows variables ARE present
- But browser still shows `null`

**Root Cause:**
Next.js embeds `NEXT_PUBLIC_*` variables at **build time**, not runtime. For Docker production builds:
1. Variables in `.env.local` are only available at runtime
2. But Next.js needs them during `pnpm build` to embed in JavaScript bundles
3. Docker must pass these as **build arguments** (ARG), not just runtime environment variables

**Critical Understanding:**
- **Development mode** (`pnpm dev`): Reads `.env.local` at runtime ✅
- **Production build** (`pnpm build`): Needs vars at build time ❌ `.env.local` won't work

**Solution (CORRECT for Docker production):**

**Step 1:** Add ARG declarations to `Dockerfile` (in builder stage):
```dockerfile
# Build-time arguments for Next.js NEXT_PUBLIC_* variables
ARG NEXT_PUBLIC_TAWK_PROPERTY_ID
ARG NEXT_PUBLIC_TAWK_WIDGET_ID
ARG NEXT_PUBLIC_APP_URL
# ... other NEXT_PUBLIC_ vars

# Pass build args as environment variables for Next.js build
ENV NEXT_PUBLIC_TAWK_PROPERTY_ID=$NEXT_PUBLIC_TAWK_PROPERTY_ID
ENV NEXT_PUBLIC_TAWK_WIDGET_ID=$NEXT_PUBLIC_TAWK_WIDGET_ID
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
# ... other NEXT_PUBLIC_ vars
```

**Step 2:** Update `docker-compose.yml` to pass build args:
```yaml
services:
  astra-landing:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NODE_ENV: production
        NEXT_PUBLIC_TAWK_PROPERTY_ID: ${NEXT_PUBLIC_TAWK_PROPERTY_ID}
        NEXT_PUBLIC_TAWK_WIDGET_ID: ${NEXT_PUBLIC_TAWK_WIDGET_ID}
        # ... other NEXT_PUBLIC_ vars
```

**Step 3:** Rebuild the image (not just restart):
```bash
# 1. Stop containers
docker compose down

# 2. Rebuild image from scratch (REQUIRED!)
docker compose build --no-cache

# 3. Start with new image
docker compose up -d

# 4. Verify in build logs
docker compose build 2>&1 | grep "Tawk.to"
# Should see: [Tawk.to Debug] Property ID: 6901671363418c195086a383
```

**Verification:**
```bash
# Check container is healthy
docker ps | grep astra

# Check build embedded the variables (look for debug output)
docker compose build 2>&1 | grep -A2 "Tawk.to Debug"
```

**Expected Build Output:**
```
[Tawk.to Debug] Property ID: 6901671363418c195086a383
[Tawk.to Debug] Widget ID: 1j8mnla16
[Tawk.to Debug] Is Enabled: true
[Tawk.to] Component rendering with credentials
```

**Common Mistakes:**
❌ Just restarting container: `docker compose restart` (won't work!)
❌ Just stopping and starting: `docker compose down && docker compose up -d` (won't work!)
✅ Must rebuild image: `docker compose build --no-cache`

**Related Files:**
- `Dockerfile` - Lines 47-69: ARG and ENV declarations
- `docker-compose.yml` - Lines 10-18: build.args configuration
- `.env.local` - Source of environment variables

**Bug Report:** `[BUG-01]` in `.memory_bank/current_tasks.md`

---

### Issue: Docker build fails

**Diagnosis:**
```bash
# Build with verbose output
./scripts/docker-build.sh dev --verbose
```

**Common Causes:**

#### 1. Missing Environment Variables
Ensure `.env.local` is copied to `.env` for Docker:
```bash
cp .env.local .env
```

#### 2. Permission Issues
```bash
# Fix permissions
chmod +x scripts/*.sh
```

#### 3. Port Conflicts
```bash
# Check for port usage
lsof -i :3000
lsof -i :3002

# Kill process if needed
kill -9 <PID>
```

**Related Files:**
- `Dockerfile` - Docker build configuration
- `docker-compose.yml` - Docker Compose configuration
- `scripts/docker-build.sh` - Build automation script

---

## Common Development Issues

### Issue: "Module not found" errors

**Solution:**
```bash
# Clear Next.js cache and node_modules
rm -rf .next node_modules
pnpm install
```

### Issue: ESLint errors on save

**Solution:**
```bash
# Run ESLint fix
pnpm lint --fix

# Or format with Prettier
pnpm format
```

### Issue: Git merge conflicts in lock files

**Solution:**
```bash
# Delete lock file and regenerate
rm pnpm-lock.yaml
pnpm install
```

---

## Getting Help

If you encounter an issue not covered here:

1. **Check Memory Bank:**
   - `.memory_bank/README.md` - Start here
   - `.memory_bank/tech_stack.md` - Technology-specific issues
   - `.memory_bank/workflows/bug_fix.md` - Bug fix process

2. **Check Documentation:**
   - `README.md` - Project overview
   - `CLAUDE.md` - Claude Code configuration
   - Component-specific README files

3. **Check Recent Changes:**
   ```bash
   git log --oneline -10
   git diff HEAD~1
   ```

4. **Ask for Help:**
   - Create a detailed bug report
   - Include error messages, steps to reproduce, and environment info
   - Check GitHub issues for similar problems

---

## Debugging Checklist

When debugging any issue:

- [ ] Clear Next.js cache: `rm -rf .next`
- [ ] Restart dev server
- [ ] Check browser console for errors
- [ ] Check terminal for server errors
- [ ] Verify environment variables are loaded
- [ ] Check if the issue reproduces in production build
- [ ] Review recent git commits for breaking changes
- [ ] Check Memory Bank documentation
- [ ] Run type check: `pnpm tsc --noEmit`
- [ ] Run linting: `pnpm lint`
- [ ] Check for dependency conflicts: `pnpm why <package-name>`

---

**Last Updated:** 2025-10-29
**Maintained By:** Development Team
