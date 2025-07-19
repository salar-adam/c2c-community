import "server-only"
import * as admin from 'firebase-admin';
import serviceAccount from './firebase-service-account.json';

console.log('firebase-admin:', admin);
console.log('firebase-admin.apps:', admin.apps);

// Check if the app is already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    });
} else {
    // If already initialized, use the existing app
    admin.app();
}

export const adminDb = admin.firestore();
