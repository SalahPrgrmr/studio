import admin from 'firebase-admin';
import { serviceAccount } from '@/firebase/service-account-credentials';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export { admin };
