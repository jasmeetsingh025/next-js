import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('Middleware path:', path);

  // Define public that should be accessible without authentication
  const isPublicPath = path.startsWith('/login') || path.startsWith('/signup');

  //Get the token from the cookies
  const token = request.cookies.get('token')?.value;
  // Check if the user is trying to access a public path
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }
  // Check if the user is trying to access a protected path
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
  // Allow the request to proceed
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ['/profile/:path*', '/settings/:path*', '/login', '/signup'],
};
