import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxNroWtQXhgVlT-G9I9USDuGR7O-0rFl8",
  authDomain: "linkedin-clone-73d73.firebaseapp.com",
  projectId: "linkedin-clone-73d73",
  storageBucket: "linkedin-clone-73d73.appspot.com",
  messagingSenderId: "404062034226",
  appId: "1:404062034226:web:029f0e0c037624f7975f2b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
