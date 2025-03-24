document.addEventListener("DOMContentLoaded", function () {
    // Redirect ke login jika belum login dan bukan di halaman login atau register
    if (!localStorage.getItem("loggedInUser") && 
        !window.location.pathname.includes("login.html") && 
        !window.location.pathname.includes("register.html")) {
        window.location.href = "login.html";
    }

    // Registrasi - Simpan akun ke localStorage
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const fullName = document.getElementById("fullName").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("registerPwd").value;
            
            let users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[email]) {
                document.getElementById("registerMessage").innerText = "Email sudah terdaftar! Silakan login.";
                document.getElementById("registerMessage").style.color = "red";
            } else {
                users[email] = { fullName, password };
                localStorage.setItem("users", JSON.stringify(users));

                document.getElementById("registerMessage").innerText = "Registrasi berhasil! Silakan login.";
                document.getElementById("registerMessage").style.color = "green";
            }
        });
    }

    // Login - Periksa akun di localStorage
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const username = document.getElementById("userName").value;
            const password = document.getElementById("pwd").value;
            
            let users = JSON.parse(localStorage.getItem("users")) || {};
            
            if (users[username] && users[username].password === password) {
                localStorage.setItem("loggedInUser", username);
                window.location.href = "index.html";
            } else {
                document.getElementById("message").innerText = "Username atau password salah!";
                document.getElementById("message").style.color = "red";
            }
        });
    }

    // Logout - Hapus session dan kembali ke login
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "login.html";
        });
    }

});
