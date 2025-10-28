import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to handle CORS for API routes
 * Allows cross-origin requests from the configured app URL
 */
export function middleware(request: NextRequest) {
  // Only apply CORS to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Get allowed origin from environment or use wildcard for development
    const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL || '*';

    // Handle preflight OPTIONS requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400', // 24 hours
        },
      });
    }

    // Handle actual requests
    const response = NextResponse.next();

    // Add CORS headers to the response
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  }

  // For non-API routes, continue without modification
  return NextResponse.next();
}

/**
 * Configure which paths the middleware should run on
 * Currently configured to run on all API routes
 */
export const config = {
  matcher: '/api/:path*',
};
