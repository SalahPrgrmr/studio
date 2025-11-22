'use server';

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';
import { serviceAccount } from '@/firebase/service-account-credentials';
import type { UserProfile } from '@/lib/types';

// Initialize Firebase Admin SDK if not already initialized
function initializeFirebaseAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return {
    auth: admin.auth(),
    db: getFirestore(),
  };
}

// Action response type
type ActionResponse = {
  error?: string;
  success?: boolean;
};

/**
 * Fetches all users from the Firestore 'users' collection using Admin SDK.
 * This bypasses client-side security rules.
 */
export async function getAllUsers(): Promise<{ users?: UserProfile[]; error?: string }> {
  try {
    const { db } = initializeFirebaseAdmin();
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    })) as UserProfile[];
    return { users };
  } catch (error: any) {
    console.error('Error fetching all users:', error);
    return {
      error: error.message || 'فشل في جلب قائمة المستخدمين.',
    };
  }
}

/**
 * Sets a user's role in Firestore and sets a corresponding custom claim.
 */
export async function setUserRole(
  uid: string,
  role: 'admin' | 'user' | 'editor' | 'moderator'
): Promise<ActionResponse> {
  try {
    const { auth, db } = initializeFirebaseAdmin();

    // 1. Update the role in the Firestore document
    await db.collection('users').doc(uid).update({ role: role });

    // 2. Set the custom claim on the user's auth token
    if (role === 'admin') {
      await auth.setCustomUserClaims(uid, { admin: true });
    } else {
      // Remove the admin claim by setting it to null for other roles
      await auth.setCustomUserClaims(uid, { admin: null });
    }

    // Revalidate the path to ensure the UI updates with the new data
    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    console.error('Error setting user role:', error);
    return {
      error: error.message || 'فشل تحديث صلاحية المستخدم.',
    };
  }
}
