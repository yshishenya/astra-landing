/**
 * Simple in-memory rate limiter using sliding window algorithm
 * For production with multiple instances, consider using Redis-based rate limiting
 * (e.g., @upstash/ratelimit with Vercel KV)
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store for rate limit data
// Note: This will be reset on server restart
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000); // 5 minutes

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed within the window
   */
  maxRequests: number;
  /**
   * Time window in milliseconds
   */
  windowMs: number;
}

export interface RateLimitResult {
  /**
   * Whether the request is allowed
   */
  success: boolean;
  /**
   * Number of requests remaining in the current window
   */
  remaining: number;
  /**
   * Unix timestamp (ms) when the rate limit resets
   */
  resetAt: number;
  /**
   * Number of seconds until the rate limit resets
   */
  retryAfter?: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier for the client (e.g., IP address, user ID)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function rateLimit(identifier: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // If no entry exists or window has expired, create new entry
  if (!entry || entry.resetAt < now) {
    const resetAt = now + config.windowMs;
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt,
    });

    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetAt,
    };
  }

  // Window is still active
  if (entry.count < config.maxRequests) {
    // Request allowed
    entry.count += 1;
    rateLimitStore.set(identifier, entry);

    return {
      success: true,
      remaining: config.maxRequests - entry.count,
      resetAt: entry.resetAt,
    };
  }

  // Rate limit exceeded
  const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
  return {
    success: false,
    remaining: 0,
    resetAt: entry.resetAt,
    retryAfter,
  };
}

/**
 * Get client identifier from request
 * Tries to get real IP from various headers (for proxies/CDNs)
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (in order of preference)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown';
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback to 'unknown' if no IP found
  return 'unknown';
}

/**
 * Preset rate limit configurations
 */
export const RateLimitPresets = {
  /**
   * Strict rate limit for sensitive operations
   * 5 requests per hour
   */
  STRICT: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  },

  /**
   * Moderate rate limit for form submissions
   * 10 requests per hour
   */
  MODERATE: {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000, // 1 hour
  },

  /**
   * Lenient rate limit for general API usage
   * 100 requests per 15 minutes
   */
  LENIENT: {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
} as const;
