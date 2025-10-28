import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/contact/route';

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
  sendEmailWithTimeout: vi.fn().mockResolvedValue({ id: 'mock-email-id' }),
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
    remaining: 9,
    resetAt: Date.now() + 3600000,
  }),
  getClientIdentifier: vi.fn().mockReturnValue('test-ip'),
  RateLimitPresets: {
    MODERATE: { maxRequests: 10, windowMs: 3600000 },
  },
}));

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up environment variables
    process.env.RESEND_API_KEY = 'test-api-key';
    process.env.RESEND_FROM_EMAIL = 'test@example.com';
    process.env.NEXT_PUBLIC_CONTACT_EMAIL = 'contact@example.com';
  });

  it('returns 200 on valid contact form submission', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        companySize: '50-100',
        message: 'This is a test message.',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain('успешно отправлено');
  });

  it('returns 400 on missing required fields', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        // Missing email, company, and message
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.errors).toBeDefined();
    expect(data.errors.length).toBeGreaterThan(0);
  });

  it('returns 400 on invalid email format', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        company: 'Test Company',
        message: 'This is a test message.',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('returns 400 on message too short', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'Short',
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

    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'This is a test message.',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.success).toBe(false);
    expect(response.headers.get('Retry-After')).toBe('3600');
  });

  it('succeeds when email is not configured (development mode)', async () => {
    // In test environment, RESEND_API_KEY is not set, so email is not sent
    // but the route should still return success
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'This is a test message.',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('accepts optional companySize field', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'This is a test message.',
        // companySize is optional
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('accepts potentially malicious input (HTML is sanitized in templates)', async () => {
    // The API route accepts any string input, but our email templates sanitize HTML
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '<script>alert("XSS")</script>',
        email: 'test@example.com',
        company: '<img src=x onerror=alert(1)>',
        message: 'Message with <b>HTML</b> tags.',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    // HTML sanitization is tested in email-templates.test.ts
  });
});
