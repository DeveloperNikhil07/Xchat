import { getApp, getApps, initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  initializeAuth,
} from "firebase/auth";
// @ts-ignore
import { getReactNativePersistence } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBA1Q45jJgJw2DyHr7n4Mek9u25WaGiXJY",
  authDomain: "xchat-24179.firebaseapp.com",
  projectId: "xchat-24179",
  storageBucket: "xchat-24179.firebasestorage.app",
  messagingSenderId: "531812163719",
  appId: "1:531812163719:web:55faa1b2f5503862b35822",
  measurementId: "G-LNPS2P6HJW"
};

// Initialize Firebase (hot reload safe — duplicate app error nahi aayega)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// 🔑 Persistence ke sath auth — AsyncStorage me session save hoga
let auth: Auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // Fast Refresh / hot reload me initializeAuth dubara call hone pe fallback
  auth = getAuth(app);
}

const db = getFirestore(app);

export { auth, db };
export default app;