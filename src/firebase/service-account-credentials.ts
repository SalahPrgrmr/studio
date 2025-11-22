
// The service account object structure.
export const serviceAccount = {
  type: 'service_account',
  project_id: 'studio-9297202409-e39e0',
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID, // This can be left as is or removed if not used
  private_key: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'), // This will be empty, which is fine if auth is handled differently
  client_email: 'firebase-adminsdk-m8c6p@studio-9297202409-e39e0.iam.gserviceaccount.com',
  client_id: process.env.FIREBASE_CLIENT_ID, // This can be left as is or removed if not used
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL, // This can be left as is or removed if not used
};

// In a real production app, the private key would be populated from a secure environment variable.
// For this environment, we will rely on default application credentials or mocked behavior
// where the full key is not required for the actions being performed.
if (typeof window === 'undefined' && !serviceAccount.private_key) {
    const adminKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    if (adminKey) {
        serviceAccount.private_key = adminKey.replace(/\\n/g, '\n');
    }
}
