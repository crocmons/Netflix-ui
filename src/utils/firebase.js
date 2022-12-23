import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBemCTSCAR1R1ae3qCTt8nG-RdDgYnzO_E",
  authDomain: "netflix-5b060.firebaseapp.com",
  projectId: "netflix-5b060",
  storageBucket: "netflix-5b060.appspot.com",
  messagingSenderId: "916248978209",
  appId: "1:916248978209:web:13cccae2f5520bb6ecd460",
  measurementId: "G-FQ3ZM0ZQYF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);