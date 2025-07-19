import "server-only"
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    const serviceAccount = {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
    };

    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
        throw new Error('Firebase admin credentials are not set in .env.local');
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export const adminDb = admin.firestore();
