import "server-only"
import * as admin from 'firebase-admin';
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from '../../firebase-service-account-key.json';

// This is a singleton pattern to ensure we only initialize the app once.
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  } catch (error) {
    // We might be in a hot-reload scenario where the app is already initialized.
    if (!/already exists/u.test((error as Error).message)) {
      console.error('Firebase admin initialization error', error);
    }
  }
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();
