import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/view/:path*'],
};

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // Properly typed to allow dynamic string keys
  const redirects: Record<string, string> = {
    '/view/dhaka/uttara/flat-abc-123': '/view/dhaka/uttara/luxury-flat-456',
    '/view/dhaka/banani/old-property-789': '/view/dhaka/banani/modern-home-999',
  };

  const newPath = redirects[currentPath];

  if (newPath) {
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return NextResponse.next();
}



// Middleware only for property url manage