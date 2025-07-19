import "server-only"

import * as admin from "firebase-admin";

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountString) {
  throw new Error('Firebase service account key is not set in environment variables.');
}

let serviceAccount;
try {
    const decodedKey = Buffer.from(serviceAccountString, 'base64').toString('utf-8');
    serviceAccount = JSON.parse(decodedKey);
} catch (error) {
    throw new Error('Failed to parse Firebase service account key. Ensure it is a valid, Base64-encoded JSON string.');
}


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminDb = admin.firestore();