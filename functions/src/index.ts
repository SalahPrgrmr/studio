
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Creates a comprehensive user profile document when a new Firebase user is created.
 */
export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL, phoneNumber, providerData } = user;
  const db = admin.firestore();

  const userDocRef = db.collection('users').doc(uid);

  const newUserProfile = {
    id: uid,
    name: displayName || 'مستخدم جديد',
    email: email || '',
    emailVerified: user.emailVerified,
    photoURL: photoURL || `https://picsum.photos/seed/${uid}/100/100`,
    phone: phoneNumber || null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),

    settings: {
      language: "ar",
      theme: "dark",
      notifications: {
        email: true,
        sms: false,
        push: true,
      }
    },

    account: {
      provider: providerData?.[0]?.providerId || "password",
      lastLogin: admin.firestore.FieldValue.serverTimestamp()
    },

    profile: {
      bio: null,
      gender: null,
      birthday: null,
      country: null
    }
  };

  try {
    await userDocRef.set(newUserProfile);
    console.log(`Successfully created comprehensive profile for user: ${uid}`);
  } catch (error) {
    console.error(`Error creating comprehensive profile for user: ${uid}`, error);
    throw new functions.https.HttpsError('internal', 'Could not create user profile structure.');
  }
});
