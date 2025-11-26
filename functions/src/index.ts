import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Creates a user profile document and related sub-collections 
 * when a new Firebase user is created.
 */
export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL, phoneNumber } = user;
  const db = admin.firestore();

  // Create the main user profile document
  const userProfileRef = db.collection('users').doc(uid);
  const userProfileData = {
    name: displayName || 'مستخدم جديد',
    email: email || '',
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    avatar: photoURL || `https://picsum.photos/seed/${uid}/100/100`,
    phone: phoneNumber || '',
    is_active: true,
  };

  // Create the initial settings document
  const settingsRef = userProfileRef.collection('settings').doc('general');
  const settingsData = {
    theme: 'dark',
    language: 'ar',
    notifications_enabled: true,
  };

  // Create the initial roles document
  const rolesRef = userProfileRef.collection('roles').doc('access');
  const rolesData = {
    role: 'viewer', // Default role
    can_edit: false,
    can_delete: false,
    can_view_reports: false,
  };

  // Use a batched write to perform all creations atomically
  const batch = db.batch();
  
  batch.set(userProfileRef, userProfileData);
  batch.set(settingsRef, settingsData);
  batch.set(rolesRef, rolesData);

  try {
    await batch.commit();
    console.log(`Successfully created profile and sub-collections for user: ${uid}`);
  } catch (error) {
    console.error(`Error creating profile for user: ${uid}`, error);
    // Re-throw the error to have the function execution marked as a failure
    throw new functions.https.HttpsError('internal', 'Could not create user profile structure.');
  }
});
