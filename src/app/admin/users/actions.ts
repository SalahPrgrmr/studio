'use server';

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';
import { serviceAccount } from '@/firebase/service-account-credentials';

function initializeFirebaseAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin.app();
}

type ActionResponse = {
    error?: string;
};

export async function setUserRole(
  uid: string,
  role: 'admin' | 'user'
): Promise<ActionResponse | void> {
  try {
    const adminApp = initializeFirebaseAdmin();
    const adminDb = getFirestore(adminApp);
    await adminDb.collection('users').doc(uid).update({ role: role });

    // Revalidate the path to ensure the UI updates with the new data
    revalidatePath('/admin/users');
  } catch (error: any) {
    console.error('Error setting user role:', error);
    return {
      error: error.message || 'فشل تحديث صلاحية المستخدم.',
    };
  }
}
