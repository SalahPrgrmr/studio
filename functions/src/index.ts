'use server';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * A Cloud Function that triggers when a new user is created.
 * It creates a corresponding user document in Firestore.
 */
export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user;

  const userDocRef = admin.firestore().collection('users').doc(uid);

  try {
    await userDocRef.set({
      displayName: displayName || email, // Use email as fallback for name
      email: email,
      photoURL: photoURL || `https://picsum.photos/seed/${uid}/200/200`, // Default avatar
      createdAt: new Date().toISOString(),
    });
    console.log(`Successfully created user document for ${uid}`);
  } catch (error) {
    console.error(`Error creating user document for ${uid}:`, error);
  }
});


/**
 * An HTTPS Callable function to delete all user documents from Firestore
 * except for the user calling the function.
 */
export const deleteAllUsersExceptAdmin = functions.https.onCall(async (data, context) => {
    // Ensure the user is authenticated.
    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated', 
            'The function must be called while authenticated.'
        );
    }

    const adminUid = context.auth.uid;
    const usersRef = admin.firestore().collection('users');

    try {
        const snapshot = await usersRef.get();
        if (snapshot.empty) {
            return { success: true, message: 'لا يوجد مستخدمين للحذف.', deletedCount: 0 };
        }

        const batch = admin.firestore().batch();
        let deletedCount = 0;

        snapshot.docs.forEach(doc => {
            if (doc.id !== adminUid) {
                batch.delete(doc.ref);
                deletedCount++;
            }
        });

        await batch.commit();

        if (deletedCount === 0) {
            return { success: true, message: 'أنت المستخدم الوحيد، لم يتم حذف أي شيء.', deletedCount: 0 };
        }

        return { 
            success: true, 
            message: `تم حذف ${deletedCount} مستخدمًا بنجاح.`,
            deletedCount 
        };

    } catch (error) {
        console.error('Error deleting users:', error);
        throw new functions.https.HttpsError(
            'internal', 
            'حدث خطأ أثناء حذف المستخدمين.'
        );
    }
});
