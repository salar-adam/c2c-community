import "server-only"
import * as admin from 'firebase-admin';

let firebaseAdminApp: admin.app.App;

function getFirebaseAdminApp() {
    if (firebaseAdminApp) {
        return firebaseAdminApp;
    }

    if (admin.apps.length > 0) {
        firebaseAdminApp = admin.app();
        return firebaseAdminApp;
    }

    if (!process.env.FIREBASE_PRIVATE_KEY) {
        throw new Error('The FIREBASE_PRIVATE_KEY environment variable is not set. Please check your environment configuration.');
    }

    const serviceAccount = {
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    };
    
    firebaseAdminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    });
    
    return firebaseAdminApp;
}


export function getFirestoreAdmin() {
    return admin.firestore(getFirebaseAdminApp());
}
