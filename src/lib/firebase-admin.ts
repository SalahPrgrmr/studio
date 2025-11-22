import * as admin from 'firebase-admin';
import { serviceAccount } from '@/firebase/service-account-credentials';

const firebaseAdminConfig: admin.AppOptions = {
    credential: admin.credential.cert(serviceAccount)
};

/**
 * Initializes and returns the Firebase Admin app instance, ensuring it only happens once.
 * @returns The initialized Firebase Admin App.
 */
export function initializeFirebaseAdmin(): admin.App {
  // Check if the default app is already initialized
  if (admin.apps.length > 0 && admin.apps[0]) {
    return admin.apps[0];
  }
  // If not, initialize it
  return admin.initializeApp(firebaseAdminConfig);
}
