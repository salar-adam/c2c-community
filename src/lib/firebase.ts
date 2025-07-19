// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5YX4hFoPb0cQCnb8xXsk0xP0BY0Gbav8",
  authDomain: "geonexus-6np3x.firebaseapp.com",
  projectId: "geonexus-6np3x",
  storageBucket: "geonexus-6np3x.appspot.com",
  messagingSenderId: "568047901337",
  appId: "1:568047901337:web:93c4b440e2da0f1de4f608"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
