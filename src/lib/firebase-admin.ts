import "server-only"
import * as admin from 'firebase-admin';
import serviceAccount from '../../firebase-service-account-key.json';

// This is a singleton pattern to ensure we only initialize the app once.
if (!globalThis.firebaseAdminApp) {
  try {
    globalThis.firebaseAdminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    // We might be in a hot-reload scenario where the app is already initialized.
    if (!/already exists/u.test((error as Error).message)) {
      // eslint-disable-next-line no-console
      console.error('Firebase admin initialization error', error);
    }
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
