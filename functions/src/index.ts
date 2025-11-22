import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Creates a user profile document when a new Firebase user is created.
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
    // Set the document in the 'users' collection with the user's UID as the document ID.
    await admin.firestore().collection('users').doc(uid).set(newUserProfile);
    console.log(`Successfully created profile for user: ${uid}`);

  } catch (error) {
    console.error(`Error creating profile for user: ${uid}`, error);
    // Optionally, re-throw the error to have the function execution marked as a failure
    throw new functions.https.HttpsError('internal', 'Could not create user profile.');
  }
});


/**
 * Endpoint to create a session cookie for the authenticated user.
 */
export const createSessionCookie = functions.https.onCall(async (data, context) => {
    // Ensure the user is authenticated via an ID token.
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }

    const idToken = data.idToken;
    if (typeof idToken !== 'string') {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a string "idToken" argument.');
    }

    // Set session expiration to 2 weeks.
    const expiresIn = 60 * 60 * 24 * 14 * 1000;

    try {
        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
        return { sessionCookie, expiresIn };
    } catch (error) {
        console.error('Error creating session cookie:', error);
        throw new functions.https.HttpsError('internal', 'Failed to create session cookie.');
    }
});
