
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Creates a comprehensive user profile document and sub-collections when a new Firebase user is created.
 */
export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user;
  const db = admin.firestore();
  const batch = db.batch();

  // 1. Main user profile document
  const userDocRef = db.collection('users').doc(uid);
  const newUserProfile = {
    name: displayName || 'مستخدم جديد',
    email: email || '',
    avatar: photoURL || `https://picsum.photos/seed/${uid}/100/100`,
    phone: null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    lastLogin: admin.firestore.FieldValue.serverTimestamp(),
  };
  batch.set(userDocRef, newUserProfile);

  // 2. Settings sub-collection document
  const settingsDocRef = userDocRef.collection('settings').doc('general');
  const userSettings = {
    theme: 'dark',
    language: 'ar',
    notifications: true,
  };
  batch.set(settingsDocRef, userSettings);

  // 3. Preferences sub-collection document
  const prefsDocRef = userDocRef.collection('preferences').doc('main');
  const userPreferences = {
    favorites: [],
    bookmarks: [],
  };
  batch.set(prefsDocRef, userPreferences);

  try {
    await batch.commit();
    console.log(`Successfully created comprehensive profile for user: ${uid}`);
  } catch (error) {
    console.error(`Error creating comprehensive profile for user: ${uid}`, error);
    throw new functions.https.HttpsError('internal', 'Could not create user profile structure.');
  }
});
