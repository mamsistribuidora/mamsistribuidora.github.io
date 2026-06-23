import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const email = document.getElementById("user-email");
const logout = document.getElementById("logout");

onAuthStateChanged(auth, (user) => {
    if (user) {
        email.textContent = user.email;
    } else {
        window.location.href = "../pages/login.html";
    }
});

logout.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "../pages/login.html";
});
