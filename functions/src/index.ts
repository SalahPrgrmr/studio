import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Creates a user profile document when a new Firebase user is created.
 */
export const createUserProfile = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user;

  const newUserProfile = {
    id: uid,
    displayName: displayName || 'مستخدم جديد',
    photoURL: photoURL || '',
    role: 'user', // Default role
    points: 0,
    title: 'مستكشف',
    badges: [],
    stats: {
      storiesPublished: 0,
      forumPosts: 0,
      audioContributions: 0,
    },
  };

  try {
    await admin.firestore().collection('users').doc(uid).set(newUserProfile);
    console.log(`Successfully created profile for user: ${uid}`);
  } catch (error) {
    console.error(`Error creating profile for user: ${uid}`, error);
  }
});
