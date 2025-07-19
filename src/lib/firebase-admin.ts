
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

// To avoid breaking the app if adminDb is null, we create a proxy.
// This allows the server to start but will throw a clear error if any action tries to use the db.
const dbProxy = adminDb ? adminDb : new Proxy({}, {
  get(target, prop) {
    if (adminDb) {
      // @ts-ignore
      return adminDb[prop];
    }
    throw new Error("Firebase Admin SDK is not initialized. Check your FIREBASE_SERVICE_ACCOUNT environment variable.");
  }
}) as admin.firestore.Firestore;


export { dbProxy as adminDb };
