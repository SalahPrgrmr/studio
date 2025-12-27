'use server';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Cloud Function to create a user document in Firestore upon new user creation
export const createUserDocument = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName } = user;

  // Reference to the user's document in the 'users' collection
  const userRef = admin.firestore().collection('users').doc(uid);

  // Data to be saved in the document
  const userData = {
    email,
    displayName: displayName || 'مستخدم جديد', // Default name if not provided
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    roles: ['user'], // Assign a default role
    // You can add any other initial fields here
  };

  try {
    await userRef.set(userData);
    console.log(`Successfully created user document for UID: ${uid}`);
  } catch (error) {
    console.error(`Error creating user document for UID: ${uid}`, error);
  }
});
