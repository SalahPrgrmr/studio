import { NextResponse, type NextRequest } from 'next/server';
import { admin } from './lib/firebase-admin';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;

  // If no session cookie and trying to access a protected route, redirect to login
  if (!sessionCookie && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (sessionCookie) {
    try {
        const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
        
        // If user is not an admin and tries to access admin routes, redirect
        if (request.nextUrl.pathname.startsWith('/admin') && !decodedClaims.admin) {
             return NextResponse.redirect(new URL('/', request.url));
        }

    } catch (error) {
        // Session cookie is invalid. Clear it and redirect to login.
        console.error('Session cookie verification failed:', error);
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('session');
        return response;
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*', '/profile'],
};
