import "server-only"
import * as admin from 'firebase-admin';
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from '../../firebase-service-account-key.json';

let firebaseAdminApp: admin.app.App;

if (!admin.apps.length) {
  firebaseAdminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
} else {
  firebaseAdminApp = admin.app();
}

export const adminDb = getFirestore(firebaseAdminApp);
export const adminAuth = getAuth(firebaseAdminApp);
