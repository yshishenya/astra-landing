# Astra Landing Page - Ultra-Optimized Multi-Stage Dockerfile
# Built for Next.js 15 with standalone output
# Optimizations: BuildKit cache mounts, security scanning, minimal final image

# syntax=docker/dockerfile:1.4

# ============================================
# Stage 1: Dependencies with BuildKit Cache
# ============================================
FROM node:22-alpine AS deps

# Security: Install latest updates
RUN apk update && apk upgrade --no-cache

# Install pnpm via corepack
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with BuildKit cache mount (10-100x faster rebuilds)
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ============================================
# Stage 2: Builder with Type Checking
# ============================================
FROM node:22-alpine AS builder

# Security: Install updates
RUN apk update && apk upgrade --no-cache

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build-time arguments for Next.js NEXT_PUBLIC_* variables
ARG NEXT_PUBLIC_TAWK_PROPERTY_ID
ARG NEXT_PUBLIC_TAWK_WIDGET_ID
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_SITE_NAME
ARG NEXT_PUBLIC_CONTACT_EMAIL
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_PLAUSIBLE_DOMAIN
ARG NEXT_PUBLIC_HOTJAR_ID

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Pass build args as environment variables for Next.js build
ENV NEXT_PUBLIC_TAWK_PROPERTY_ID=$NEXT_PUBLIC_TAWK_PROPERTY_ID
ENV NEXT_PUBLIC_TAWK_WIDGET_ID=$NEXT_PUBLIC_TAWK_WIDGET_ID
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME
ENV NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_PLAUSIBLE_DOMAIN=$NEXT_PUBLIC_PLAUSIBLE_DOMAIN
ENV NEXT_PUBLIC_HOTJAR_ID=$NEXT_PUBLIC_HOTJAR_ID

# Run type checking before build (fail fast on errors)
RUN pnpm type-check

# Build Next.js app with standalone output (BuildKit cache for build artifacts)
RUN --mount=type=cache,id=next-build,target=/app/.next/cache \
    pnpm build

# ============================================
# Stage 3: Security Audit (Optional)
# ============================================
FROM builder AS security-audit

# Run npm audit for security vulnerabilities
RUN pnpm audit --audit-level moderate || echo "Security audit completed with warnings"

# ============================================
# Stage 4: Production Runner (Ultra-Minimal)
# ============================================
FROM node:22-alpine AS runner

# Install dumb-init for proper signal handling and security updates
RUN apk update && apk upgrade --no-cache && \
    apk add --no-cache dumb-init && \
    rm -rf /var/cache/apk/*

WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown nextjs:nodejs /app

# Set production environment
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# Copy public assets (static files)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy standalone output (optimized Next.js bundle)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Add metadata labels for container management
LABEL org.opencontainers.image.title="Astra Landing Page" \
      org.opencontainers.image.description="Marketing website for AI-powered career counseling" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.vendor="Astra" \
      org.opencontainers.image.source="https://github.com/your-org/astra_landing" \
      maintainer="support@astra.ai"

# Switch to non-root user
USER nextjs

# Expose application port
EXPOSE 3000

# Health check with faster intervals for production
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)}).on('error', () => process.exit(1))"

# Use dumb-init for proper signal handling (graceful shutdown)
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "server.js"]
