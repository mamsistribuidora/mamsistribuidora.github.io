const firebaseConfig = {
  apiKey: "AIzaSyALJUV1EAmwFvDdVmG3wK8KUATcOS8_-dI",
  authDomain: "mam-distribuidora-6043f.firebaseapp.com",
  projectId: "mam-distribuidora-6043f",
  storageBucket: "mam-distribuidora-6043f.appspot.com",
  messagingSenderId: "467923017917",
  appId: "1:467923017917:web:7361ecf8cff2cbfed197d4"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
