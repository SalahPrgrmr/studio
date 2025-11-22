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
    // Set the document in the 'users' collection with the user's UID as the document ID.
    // Using set() with merge: false (default) will create or overwrite.
    await admin.firestore().collection('users').doc(uid).set(newUserProfile);
    console.log(`Successfully created profile for user: ${uid}`);
  } catch (error) {
    console.error(`Error creating profile for user: ${uid}`, error);
    // Optionally, re-throw the error to have the function execution marked as a failure
    throw new functions.https.HttpsError('internal', 'Could not create user profile.');
  }
});


/**
 * Sets a custom claim 'admin' on a user when their role is changed to 'admin' in Firestore.
 * This is triggered on document updates in the 'users' collection.
 */
export const onUserRoleChange = functions.firestore.document('users/{userId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();
    const userId = context.params.userId;

    // Proceed only if the 'role' field has actually changed.
    if (newData.role !== previousData.role) {
      try {
        if (newData.role === 'admin') {
          // Set the 'admin' custom claim to true.
          await admin.auth().setCustomUserClaims(userId, { admin: true });
          console.log(`Custom claim 'admin' set to true for user ${userId}`);
        } else if (previousData.role === 'admin' && newData.role !== 'admin') {
          // If the role is changed FROM admin to something else, remove the claim.
          // Setting the claim to null or an empty object removes it.
          await admin.auth().setCustomUserClaims(userId, { admin: null });
          console.log(`Custom claim 'admin' removed for user ${userId}`);
        }
      } catch (error) {
        console.error(`Error setting custom claim for user ${userId}:`, error);
        // Log the error but don't re-throw to prevent function retries for this specific error.
      }
    }
  });
