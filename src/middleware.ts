import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  // Clone the request headers and add our custom headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-path', request.nextUrl.pathname);

  const traceParent = requestHeaders.get('traceparent');
  
  if (!traceParent) {
    // If no existing trace, we'll let OpenTelemetry handle this later
    // We're not generating a trace ID here as it should be done by OpenTelemetry
    console.log('No existing trace context found');
  } else {
    console.log('Existing trace context found:', traceParent);
  }
  // Create a new response with modified headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: '/:path*',
};