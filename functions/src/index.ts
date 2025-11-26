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
