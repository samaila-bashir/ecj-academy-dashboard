import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_APP_FIREBASE_STORAGE_BOUCKET,
  messagingSenderId: process.env.VITE_APP_FIREBASE_MESSAGGING_SENDER_ID,
  appId: process.env.VITE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const firestoreApp = initializeApp(firebaseConfig);
export const auth = getAuth();

export default firestoreApp;
