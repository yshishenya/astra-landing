import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/roi-calculator/route';

// Mock rate limiting
vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockReturnValue({
    success: true,
    remaining: 99,
    resetAt: Date.now() + 900000,
  }),
  getClientIdentifier: vi.fn().mockReturnValue('test-ip'),
  RateLimitPresets: {
    LENIENT: { maxRequests: 100, windowMs: 900000 },
  },
}));

describe('POST /api/roi-calculator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 with valid ROI calculation', async () => {
    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companySize: 100,
        currentTurnover: 20,
        averageSalary: 100000,
        currentHireTime: 30,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(data.data.inputs).toBeDefined();
    expect(data.data.currentSituation).toBeDefined();
    expect(data.data.withAstra).toBeDefined();
    expect(data.data.roi).toBeDefined();
    expect(data.data.threeYear).toBeDefined();
  });

  it('calculates correct annual turnover cost', async () => {
    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companySize: 100,
        currentTurnover: 20, // 20% turnover = 20 employees
        averageSalary: 100000,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.data.currentSituation.currentAnnualTurnoverCost).toBeGreaterThan(0);
    // 20 employees * 100k * 2.5 = 5,000,000
    expect(data.data.currentSituation.currentAnnualTurnoverCost).toBe(5000000);
  });

  it('uses default salary when not provided', async () => {
    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companySize: 100,
        currentTurnover: 20,
        // averageSalary not provided - should use default 100k
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.inputs.averageSalary).toBe(100000);
  });

  it('returns 400 on company size too small', async () => {
    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companySize: 5, // Below minimum of 10
        currentTurnover: 20,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.errors).toBeDefined();
  });

  it('returns 400 on company size too large', async () => {
    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companySize: 200000, // Above maximum of 100,000
        currentTurnover: 20,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('returns 400 on negative turnover', async () => {
    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companySize: 100,
        currentTurnover: -5,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('returns 400 on turnover over 100%', async () => {
    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companySize: 100,
        currentTurnover: 150,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('returns 400 on salary too low', async () => {
    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companySize: 100,
        currentTurnover: 20,
        averageSalary: 20000, // Below minimum of 30,000
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('calculates ROI percentage correctly', async () => {
    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companySize: 100,
        currentTurnover: 20,
        averageSalary: 100000,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.data.roi.roiPercentage).toBeGreaterThan(0);
    expect(data.data.roi.paybackDays).toBeGreaterThan(0);
    expect(data.data.roi.paybackDays).toBeLessThan(365);
  });

  it('calculates time savings correctly', async () => {
    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companySize: 100,
        currentTurnover: 20,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.data.withAstra.totalTimeSavedHours).toBeGreaterThan(0);
    expect(data.data.withAstra.annualTimeSavings).toBeGreaterThan(0);
  });

  it('calculates 3-year projections', async () => {
    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companySize: 100,
        currentTurnover: 20,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.data.threeYear.totalSavings).toBeGreaterThan(0);
    expect(data.data.threeYear.totalCost).toBeGreaterThan(0);
    expect(data.data.threeYear.netSavings).toBeGreaterThan(0);
  });

  it('returns 429 when rate limit is exceeded', async () => {
    // Mock rate limit exceeded
    const { rateLimit } = await import('@/lib/rate-limit');
    vi.mocked(rateLimit).mockReturnValueOnce({
      success: false,
      remaining: 0,
      resetAt: Date.now() + 900000,
      retryAfter: 900,
    });

    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companySize: 100,
        currentTurnover: 20,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.success).toBe(false);
    expect(response.headers.get('Retry-After')).toBe('900');
  });

  it('handles missing required fields', async () => {
    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Missing companySize and currentTurnover
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.errors).toBeDefined();
  });

  it('includes all expected fields in response', async () => {
    const request = new Request('http://localhost:3000/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companySize: 100,
        currentTurnover: 20,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    // Check inputs
    expect(data.data.inputs).toHaveProperty('companySize');
    expect(data.data.inputs).toHaveProperty('currentTurnover');
    expect(data.data.inputs).toHaveProperty('averageSalary');

    // Check currentSituation
    expect(data.data.currentSituation).toHaveProperty('annualTurnovers');
    expect(data.data.currentSituation).toHaveProperty('currentAnnualTurnoverCost');

    // Check withAstra
    expect(data.data.withAstra).toHaveProperty('turnoverReduction');
    expect(data.data.withAstra).toHaveProperty('annualTurnoverSavings');
    expect(data.data.withAstra).toHaveProperty('totalTimeSavedHours');
    expect(data.data.withAstra).toHaveProperty('annualTimeSavings');
    expect(data.data.withAstra).toHaveProperty('totalAnnualSavings');

    // Check ROI
    expect(data.data.roi).toHaveProperty('astraCost');
    expect(data.data.roi).toHaveProperty('netSavings');
    expect(data.data.roi).toHaveProperty('roiPercentage');
    expect(data.data.roi).toHaveProperty('paybackDays');

    // Check 3-year projections
    expect(data.data.threeYear).toHaveProperty('totalSavings');
    expect(data.data.threeYear).toHaveProperty('totalCost');
    expect(data.data.threeYear).toHaveProperty('netSavings');
  });
});
