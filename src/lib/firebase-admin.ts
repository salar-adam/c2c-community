import "server-only"
import * as admin from 'firebase-admin';

// This guard ensures that we only initialize the app once.
if (!admin.apps.length) {
    // Construct the service account object from environment variables.
    // This is the most secure way to handle credentials in Next.js.
    const serviceAccount = {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // The private key must have its newline characters correctly formatted.
        // The .replace() call ensures this is handled correctly.
        privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
    };

    // Check if the required environment variables are set.
    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
        throw new Error('Firebase admin credentials are not set in .env.local');
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

// Export the initialized admin database instance for use in server actions.
export const adminDb = admin.firestore();

    