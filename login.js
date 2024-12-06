document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "panty" && password === "123") {
        window.location.href = "ventana.html";
    } else {
        document.getElementById("loginMessage").textContent = "Usuario o contraseña incorrectos.";
        document.getElementById("loginMessage").style.color = "red";
    }
});
