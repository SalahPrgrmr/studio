
import { NextResponse, type NextRequest } from 'next/server';
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// This file is now self-contained for Firebase Admin initialization
import { serviceAccount } from './firebase/service-account-credentials';

// Force the middleware to run on the Node.js runtime.
export const runtime = 'nodejs';

/**
 * Initializes and returns the Firebase Admin app instance, ensuring it only happens once.
 * This function is now local to the middleware.
 * @returns The initialized Firebase Admin App.
 */
function initializeFirebaseAdmin(): admin.App {
  if (admin.apps.length > 0 && admin.apps[0]) {
    return admin.apps[0];
  }
  
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Helper to fetch user role from Firestore
async function getUserRole(uid: string): Promise<string> {
    const adminApp = initializeFirebaseAdmin();
    const adminDb = getFirestore(adminApp);
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
      const adminApp = initializeFirebaseAdmin();
      // Verify the session cookie
      const decodedToken = await getAuth(adminApp).verifySessionCookie(sessionCookie, true);
      
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
