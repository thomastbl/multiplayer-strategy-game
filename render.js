const goLogin = document.querySelector(`[data-go="login"]`);
const goSignup = document.querySelector(`[data-go="signup"]`);
const goMenu = document.querySelectorAll(`[data-go="menu"]`);
const signupButton = document.getElementById("signup-button");
const loginButton = document.getElementById("login-button");
const usernameSU = document.getElementById("username_su");
const passwordSU = document.getElementById("password_su");
const usernameLG = document.getElementById("username_lg");
const passwordLG = document.getElementById("password_lg");

let currentView = "menu";

export function render(dataview) {
  document
    .querySelectorAll("[data-view]")
    .forEach((element) => (element.hidden = true));

  document.querySelector(`[data-view="${dataview}"]`).hidden = false;
}

goLogin.addEventListener("click", () => {
  render("login");
});

goSignup.addEventListener("click", () => {
  render("signup");
});

signupButton.addEventListener("click", async () => {
  const response = await fetch("http://localhost:8080/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: usernameSU.value,
      password: passwordSU.value,
    }),
  });
  const data = await response.json();
  console.log(data.error);
});

loginButton.addEventListener("click", async () => {
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: usernameLG.value,
      password: passwordLG.value,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    console.log(data.connection);
    localStorage.setItem("token", data.token);
  } else {
    console.log(data.connection);
  }
});

goMenu.forEach((button) => {
  button.addEventListener("click", () => {
    render("menu");
  });
});
