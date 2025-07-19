import "server-only"

import * as admin from "firebase-admin";
import serviceAccount from "../../firebase-service-account-key.json";

// Prevents re-initialization during hot-reloads in development
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminDb = admin.firestore();
