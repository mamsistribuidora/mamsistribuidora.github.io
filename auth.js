import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// REGISTAR UTILIZADOR
export async function register(name, email, password) {

    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {

        uid: user.uid,

        name: name,

        email: email,

        role: "artist",

        verified: false,

        createdAt: new Date()

    });

    return user;

}

// LOGIN
export async function login(email, password) {

    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    return userCredential.user;

}

// LOGOUT
export async function logout() {

    await signOut(auth);

}

// UTILIZADOR ATUAL
export function currentUser(callback) {

    onAuthStateChanged(auth, async(user) => {

        if (!user) {

            callback(null);

            return;

        }

        const snap = await getDoc(doc(db, "users", user.uid));

        callback({

            uid: user.uid,

            ...snap.data()

        });

    });

}
