import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBlhafG2QuKs0e4Zpw4TIVu-eZkUi9zmBA",
  authDomain: "shopping-9edfd.firebaseapp.com",
  databaseURL: "https://shopping-9edfd-default-rtdb.firebaseio.com",
  projectId: "shopping-9edfd",
  storageBucket: "shopping-9edfd.firebasestorage.app",
  messagingSenderId: "626262855591",
  appId: "1:626262855591:web:2c76e16706a8f91ad73082",
  measurementId: "G-6MLYQB3JWR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.error("Firebase Analytics initialization failed:", error);
  }
}

export { app, auth, db, analytics };
