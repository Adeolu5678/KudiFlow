export const AppConfig = {
  appName: 'KudiFlow',
  demoUserId: 'demo-user',
  useMockAI: false,
  allowMockAIFallback: true,
  useFirestore: true,
  extractionModelName: 'gemini-2.5-flash',
  assistantModelName: 'gemini-2.5-flash',
};

export function setUseMockAI(enabled: boolean) {
  AppConfig.useMockAI = enabled;
}

export const FirebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',
};

export function hasFirebaseConfig(): boolean {
  return Boolean(
    FirebaseConfig.apiKey &&
      FirebaseConfig.projectId &&
      FirebaseConfig.appId &&
      FirebaseConfig.storageBucket &&
      FirebaseConfig.messagingSenderId
  );
}
