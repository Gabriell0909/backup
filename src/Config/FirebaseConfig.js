import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import {
   API_KEY,
   AUTH_DOMAIN,
   PROJECT_ID,
   STORAGE_BUCKET,
   MESSAGING_SENDER_ID,
   APP_ID,
   MEASUREMENT_ID,
} from '@env';

const firebaseConfig = {
   apiKey: API_KEY,
   authDomain: AUTH_DOMAIN,
   projectId: PROJECT_ID,
   storageBucket: STORAGE_BUCKET,
   messagingSenderId: MESSAGING_SENDER_ID,
   appId: APP_ID,
   measurementId: MEASUREMENT_ID,
};

// Inicializa o app apenas se não houver nenhuma instância existente
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializa o auth apenas se não houver nenhuma instância existente
let auth;
try {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
    console.log('✅ Firebase Auth conectado com sucesso!');
} catch (error) {
    if (error.code === 'auth/already-initialized') {
        console.log('⚠️ Firebase Auth já estava inicializado');
    } else {
        console.error('❌ Erro ao inicializar Firebase Auth:', error);
    }
}

// Inicializa o Firestore
const db = getFirestore(app);
console.log('✅ Firebase Firestore conectado com sucesso!');

export { app, auth, db };
