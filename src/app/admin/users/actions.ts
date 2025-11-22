'use server';

import { getFirestore } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';
import { initializeFirebaseAdmin } from '@/lib/firebase-admin';

type ActionResponse = {
    error?: string;
};

export async function setUserRole(
  uid: string,
  role: 'admin' | 'user'
): Promise<ActionResponse | void> {
  try {
    const adminDb = getFirestore(initializeFirebaseAdmin());
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
