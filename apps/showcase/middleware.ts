import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Check for existing variant cookie or query parameter
  const cookieVariant = req.cookies.get('ui-variant')?.value as 'A' | 'B' | undefined;
  const queryVariant = req.nextUrl.searchParams.get('variant');
  
  // Map query params to A/B variants
  let variant: 'A' | 'B';
  if (queryVariant === 'classic') {
    variant = 'A';
  } else if (queryVariant === 'cosmic') {
    variant = 'B';
  } else {
    // Use cookie or random assignment
    variant = cookieVariant ?? (Math.random() < 0.5 ? 'A' : 'B');
  }

  // Create response with variant info
  const res = NextResponse.next();
  
  // Set cookie for 30 days
  res.cookies.set('ui-variant', variant, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  
  // Add header for server-side access
  res.headers.set('x-ui-variant', variant);
  
  // Log variant assignment for analytics
  if (process.env.NODE_ENV === 'production') {
    console.log(`[A/B Test] User assigned to variant ${variant}`, {
      path: req.nextUrl.pathname,
      timestamp: new Date().toISOString(),
    });
  }
  
  return res;
}

// Only run middleware on page routes, exclude static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};