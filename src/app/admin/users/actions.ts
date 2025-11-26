'use server';

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';
import { serviceAccount } from '@/firebase/service-account-credentials';
import type { UserProfile } from '@/lib/types'; // Note: UserRoles is removed as it's not needed here anymore.

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
 * Fetches all users from the Firestore 'users' collection.
 * This bypasses client-side security rules.
 */
export async function getAllUsers(): Promise<{ users?: UserProfile[]; error?: string }> {
  try {
    const { db } = initializeFirebaseAdmin();
    const usersSnapshot = await db.collection('users').get();
    
    const usersData = usersSnapshot.docs.map(doc => ({
        ...(doc.data() as Omit<UserProfile, 'id'>),
        id: doc.id,
    }));

    return { users: usersData };

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
  role: UserProfile['role']
): Promise<ActionResponse> {
  try {
    const { auth, db } = initializeFirebaseAdmin();

    // 1. Update the role in the Firestore document
    const userDocRef = db.collection('users').doc(uid);
    await userDocRef.update({ role: role });

    // 2. Set the custom claim on the user's auth token
    const claims: { [key: string]: any } = { admin: null, editor: null }; // Reset claims
    if (role === 'admin' || role === 'editor') {
        claims[role] = true;
    }
    
    await auth.setCustomUserClaims(uid, claims);

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
