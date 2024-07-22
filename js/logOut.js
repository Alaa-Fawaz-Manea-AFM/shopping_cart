const lgOut_btn = document.getElementById("logoutButton");
const email_user = document.getElementById("email_user");

email_user &&
  (email_user.innerText = JSON.parse(localStorage.getItem("user"))?.email);

lgOut_btn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "login.html";
});

check_user();
