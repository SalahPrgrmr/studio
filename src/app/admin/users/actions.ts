'use server';

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';
import { serviceAccount } from '@/firebase/service-account-credentials';
import type { UserProfile, UserRoles } from '@/lib/types';

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

// Combined type for the table
type UserWithRole = UserProfile & { role: UserRoles['role'] };


/**
 * Fetches all users from the Firestore 'users' collection and their roles.
 * This bypasses client-side security rules.
 */
export async function getAllUsers(): Promise<{ users?: UserWithRole[]; error?: string }> {
  try {
    const { db } = initializeFirebaseAdmin();
    const usersSnapshot = await db.collection('users').get();
    
    const usersData = await Promise.all(
        usersSnapshot.docs.map(async (userDoc) => {
            const userProfile = { ...userDoc.data(), id: userDoc.id } as UserProfile;

            // Fetch the role from the sub-collection
            const roleDocRef = db.collection('users').doc(userDoc.id).collection('roles').doc('access');
            const roleDoc = await roleDocRef.get();
            const roleData = roleDoc.exists ? roleDoc.data() as UserRoles : { role: 'viewer' as const };

            return {
                ...userProfile,
                role: roleData.role, // Add role to the main object
            };
        })
    );

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
  role: UserRoles['role']
): Promise<ActionResponse> {
  try {
    const { auth, db } = initializeFirebaseAdmin();

    // 1. Update the role in the Firestore sub-collection document
    const roleDocRef = db.collection('users').doc(uid).collection('roles').doc('access');
    await roleDocRef.update({ role: role });

    // 2. Set the custom claim on the user's auth token
    const claims: { [key: string]: any } = { admin: null, editor: null, viewer: null };
    if (role === 'admin' || role === 'editor') { // Example: admin and editor get special claims
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
