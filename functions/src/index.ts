import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Creates a user profile document when a new Firebase user is created.
 */
export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user;

  const newUserProfile = {
    id: uid,
    displayName: displayName || 'مستخدم جديد',
    photoURL: photoURL || '',
    email: email || '',
    role: 'user', // Default role
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
    await admin.firestore().collection('users').doc(uid).set(newUserProfile);
    console.log(`Successfully created profile for user: ${uid}`);
  } catch (error) {
    console.error(`Error creating profile for user: ${uid}`, error);
  }
});

/**
 * Sets a custom claim 'isAdmin' on user when their role is changed to 'admin' in Firestore.
 */
export const onUserRoleChange = functions.firestore.document('users/{userId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();
    const userId = context.params.userId;

    // Check if the role has changed
    if (newData.role !== previousData.role) {
      try {
        if (newData.role === 'admin') {
          await admin.auth().setCustomUserClaims(userId, { admin: true });
          console.log(`Custom claim 'admin' set for user ${userId}`);
        } else if (previousData.role === 'admin' && newData.role !== 'admin') {
          // If role is changed from admin to something else, remove the claim
          await admin.auth().setCustomUserClaims(userId, { admin: null });
           console.log(`Custom claim 'admin' removed for user ${userId}`);
        }
      } catch (error) {
        console.error(`Error setting custom claim for user ${userId}:`, error);
      }
    }
});
