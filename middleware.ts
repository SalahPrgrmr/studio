import { NextResponse, type NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { serviceAccount } from '@/firebase/service-account-credentials'; // Assuming you have this file

// Initialize Firebase Admin SDK
function initializeFirebaseAdmin(): App {
  if (getApps().length > 0) {
    return getApps()[0]!;
  }
  return initializeApp({
    credential: {
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
    }
  });
}

// Helper to fetch user role from Firestore
async function getUserRole(uid: string): Promise<string> {
    const { getFirestore } = require('firebase-admin/firestore');
    const db = getFirestore(initializeFirebaseAdmin());
    const userDoc = await db.collection('users').doc(uid).get();
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
      const decodedToken = await getAuth(initializeFirebaseAdmin()).verifySessionCookie(sessionCookie, true);
      
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
      // If cookie is invalid, redirect to login
      console.error('Middleware Error:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
