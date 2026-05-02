import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { AppConfig, FirebaseConfig, hasFirebaseConfig } from '../config/AppConfig';

let firebaseDb: ReturnType<typeof getFirestore> | null = null;
let firebaseInitError: string | null = null;

export function bootstrapFirebase() {
  if (!AppConfig.useFirestore || !hasFirebaseConfig()) {
    firebaseInitError = 'Firebase config missing. Running in local demo mode.';
    return;
  }
  try {
    const app = initializeApp(FirebaseConfig);
    firebaseDb = getFirestore(app);
  } catch (error) {
    firebaseInitError = error instanceof Error ? error.message : 'Firebase bootstrap failed.';
  }
}

export function getFirebaseDb() {
  return firebaseDb;
}

export function getFirebaseInitError() {
  return firebaseInitError;
}
