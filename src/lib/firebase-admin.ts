
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (serviceAccountString) {
    try {
      const serviceAccount = JSON.parse(serviceAccountString);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT. Firebase Admin SDK not initialized.', e);
    }
  } else {
    // This will use Application Default Credentials if they are available.
    admin.initializeApp();
  }
}

const adminDb = admin.firestore();

export { adminDb };
