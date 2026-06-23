import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyALJUV1EAmwFvDdVmG3wK8KUATcOS8_-dI",
  authDomain: "mam-distribuidora-6043f.firebaseapp.com",
  projectId: "mam-distribuidora-6043f",
  storageBucket: "mam-distribuidora-6043f.firebasestorage.app",
  messagingSenderId: "467923017917",
  appId: "1:467923017917:web:7361ecf8cff2cbfed197d4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
