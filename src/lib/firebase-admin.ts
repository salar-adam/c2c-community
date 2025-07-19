'use server';
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
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT:', e);
    }
  } else {
    console.log('FIREBASE_SERVICE_ACCOUNT environment variable not found. Firebase Admin SDK not initialized.');
  }
}

let adminDb: admin.firestore.Firestore;
if (admin.apps.length > 0) {
  adminDb = admin.firestore();
} else {
  // Provide a dummy object if initialization fails to prevent crashes on import.
  // Actions will fail gracefully if the SDK is not initialized.
  adminDb = {} as admin.firestore.Firestore;
}

export { adminDb };
