import "server-only"
import * as admin from 'firebase-admin';
import serviceAccount from "../../firebase-service-account-key.json";

let firebaseAdminApp: admin.app.App;

function getFirebaseAdminApp() {
    if (firebaseAdminApp) {
        return firebaseAdminApp;
    }

    if (admin.apps.length > 0) {
        firebaseAdminApp = admin.app();
        return firebaseAdminApp;
    }
    
    firebaseAdminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    });
    
    return firebaseAdminApp;
}


export function getFirestoreAdmin() {
    return admin.firestore(getFirebaseAdminApp());
}
