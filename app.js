import { currentUser, logout } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {

    currentUser((user) => {

        if (!user) {
            console.log("Utilizador não autenticado.");
            return;
        }

        console.log("Bem-vindo:", user.name);

        const userName = document.getElementById("userName");

        if (userName) {
            userName.textContent = user.name;
        }

        if (user.role === "admin") {
            console.log("Administrador");
        } else {
            console.log("Artista");
        }

    });

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", async () => {

            await logout();

            window.location.href = "login.html";

        });

    }

});
