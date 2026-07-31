import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;