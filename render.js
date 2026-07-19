const goLogin = document.querySelector(`[data-go="login"]`);
const goSignup = document.querySelector(`[data-go="signup"]`);
const goMenu = document.querySelectorAll(`[data-go="menu"]`);
const signupButton = document.getElementById("signup-button");
const usernameSU = document.getElementById("username_su");
const passwordSU = document.getElementById("password_su");

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
  console.log(response.message);
});

goMenu.forEach((button) => {
  button.addEventListener("click", () => {
    render("menu");
  });
});
