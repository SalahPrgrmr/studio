import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Creates a user profile document when a new Firebase user is created
 * and marks their email as verified.
 */
export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user;

  // Data for the new user profile document
  const newUserProfile = {
    id: uid,
    displayName: displayName || 'مستخدم جديد',
    photoURL: photoURL || `https://picsum.photos/seed/${uid}/100/100`,
    email: email || '',
    role: 'user', // Default role for new users
    points: 0,
    title: 'مستكشف',
    badges: [],
    stats: {
      storiesPublished: 0,
      forumPosts: 0,
      audioContributions: 0,
    },
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  try {
    const firestorePromise = admin.firestore().collection('users').doc(uid).set(newUserProfile);
    console.log(`Successfully created profile document for user: ${uid}`);

    // Mark the user's email as verified
    const authPromise = admin.auth().updateUser(uid, {
        emailVerified: true
    });
    console.log(`Successfully marked email as verified for user: ${uid}`);
    
    // Wait for both operations to complete
    await Promise.all([firestorePromise, authPromise]);

  } catch (error) {
    console.error(`Error processing new user: ${uid}`, error);
    // Optionally, re-throw the error to have the function execution marked as a failure
    throw new functions.https.HttpsError('internal', 'Could not process new user creation.');
  }
});
