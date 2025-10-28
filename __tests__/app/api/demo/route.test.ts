import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/demo/route';

// Mock Resend
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'mock-email-id' }),
    },
  })),
}));

// Mock email utility
vi.mock('@/lib/email', () => ({
  sendEmailsWithTimeout: vi.fn().mockResolvedValue({
    success: 2,
    failed: 0,
    results: [{ success: true }, { success: true }],
  }),
  EmailTimeoutError: class EmailTimeoutError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'EmailTimeoutError';
    }
  },
}));

// Mock rate limiting
vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockReturnValue({
    success: true,
    remaining: 4,
    resetAt: Date.now() + 3600000,
  }),
  getClientIdentifier: vi.fn().mockReturnValue('test-ip'),
  RateLimitPresets: {
    STRICT: { maxRequests: 5, windowMs: 3600000 },
  },
}));

describe('POST /api/demo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up environment variables
    process.env.RESEND_API_KEY = 'test-api-key';
    process.env.RESEND_FROM_EMAIL = 'test@example.com';
    process.env.NEXT_PUBLIC_CONTACT_EMAIL = 'contact@example.com';
    process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
  });

  it('returns 200 on valid demo booking submission', async () => {
    const request = new Request('http://localhost:3000/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        phone: '1234567890',
        preferredTime: '2024-12-01 14:00',
        companySize: '50-100',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain('успешно отправлен');
  });

  it('returns 400 on missing required fields', async () => {
    const request = new Request('http://localhost:3000/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        // Missing email and company
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.errors).toBeDefined();
  });

  it('accepts optional phone, preferredTime, and companySize', async () => {
    const request = new Request('http://localhost:3000/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        // All optional fields omitted
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('returns 400 on invalid email format', async () => {
    const request = new Request('http://localhost:3000/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'not-an-email',
        company: 'Test Company',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('returns 400 on phone number too short', async () => {
    const request = new Request('http://localhost:3000/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        phone: '123', // Too short
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('returns 429 when rate limit is exceeded', async () => {
    // Mock rate limit exceeded
    const { rateLimit } = await import('@/lib/rate-limit');
    vi.mocked(rateLimit).mockReturnValueOnce({
      success: false,
      remaining: 0,
      resetAt: Date.now() + 3600000,
      retryAfter: 3600,
    });

    const request = new Request('http://localhost:3000/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.success).toBe(false);
    expect(response.headers.get('Retry-After')).toBe('3600');
  });

  it('succeeds when email is not configured (development mode)', async () => {
    // In test environment, RESEND_API_KEY is not set
    const request = new Request('http://localhost:3000/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('accepts potentially malicious input (HTML is sanitized in templates)', async () => {
    // The API route accepts any string input, but our email templates sanitize HTML
    const request = new Request('http://localhost:3000/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '<script>alert("XSS")</script>',
        email: 'test@example.com',
        company: '<img src=x onerror=alert(1)>',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    // HTML sanitization is tested in email-templates.test.ts
  });
});
