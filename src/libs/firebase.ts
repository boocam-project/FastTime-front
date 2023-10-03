import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_MEASUREMENT_ID,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  appId: VITE_FIREBASE_APP_ID,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
