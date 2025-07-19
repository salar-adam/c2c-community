
import * as admin from 'firebase-admin';

// This function ensures the Firebase Admin SDK is initialized only once.
function initializeAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountString) {
    // This will prevent the app from crashing if the service account is not set.
    // Server-side actions that require adminDb will fail gracefully, logging an error.
    console.error('FIREBASE_SERVICE_ACCOUNT environment variable is not set. Firebase Admin SDK not initialized.');
    return null;
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountString);
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (e) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT. Firebase Admin SDK not initialized.', e);
    return null;
  }
}

// Initialize the app and export the firestore database instance.
const adminApp = initializeAdmin();
const adminDb = adminApp ? admin.firestore() : null;

export { adminDb };
