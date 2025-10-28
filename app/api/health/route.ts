import { type NextRequest, NextResponse } from 'next/server';

/**
 * Health check endpoint for Docker and monitoring
 * Used by Docker HEALTHCHECK and external monitoring tools
 *
 * @returns 200 OK if the app is healthy
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
