const login_btn = document.getElementById("loginForm");

login_btn.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  localStorage.setItem("user", JSON.stringify({ email, password }));
  window.location.href = "index.html";
});


 if (
   window.location.pathname === "/login.html" &&
   localStorage?.getItem("user")
 ) {
   window.location.href = "index.html";
 }