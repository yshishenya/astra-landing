import { type NextRequest, NextResponse } from 'next/server';

/**
 * Returns a health check response for the application.
 */
export async function GET(_request: NextRequest): Promise<NextResponse> {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    },
    { status: 200 }
  );
}
