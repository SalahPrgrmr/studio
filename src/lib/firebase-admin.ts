import { initializeApp, getApps, App, AppOptions, cert } from 'firebase-admin/app';
import { serviceAccount } from '../firebase/service-account-credentials';

const firebaseAdminConfig: AppOptions = {
    credential: cert(serviceAccount)
};

export function initializeFirebaseAdmin(): App {
  if (getApps().length > 0) {
    // Find the existing admin app instance
    const existingApp = getApps().find(app => app.name === '[DEFAULT]');
    if (existingApp) {
        return existingApp;
    }
  }
  return initializeApp(firebaseAdminConfig);
}
