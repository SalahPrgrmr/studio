
import { NextResponse, type NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeFirebaseAdmin } from '@/lib/firebase-admin';

// Force the middleware to run on the Node.js runtime.
// This is required because 'firebase-admin' uses Node.js APIs not available in the Edge Runtime.
export const runtime = 'nodejs';

// Initialize the app once
const adminApp = initializeFirebaseAdmin();
const adminAuth = getAuth(adminApp);
const adminDb = getFirestore(adminApp);


// Helper to fetch user role from Firestore
async function getUserRole(uid: string): Promise<string> {
    const userDoc = await adminDb.collection('users').doc(uid).get();
    if (userDoc.exists) {
        return userDoc.data()?.role || 'user';
    }
    return 'user';
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect the /admin route
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('__session')?.value;

    if (!sessionCookie) {
      // Redirect to login page if no session cookie
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify the session cookie
      const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
      
      // Get user role from Firestore
      const userRole = await getUserRole(decodedToken.uid);

      // Check if the user is an admin
      if (userRole !== 'admin') {
         // If not an admin, redirect to home page
         return NextResponse.redirect(new URL('/', request.url));
      }

      // If user is admin, allow access
      return NextResponse.next();
      
    } catch (error) {
      // If cookie is invalid, clear it and redirect to login
      console.error('Middleware Error:', error);
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('__session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
