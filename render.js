const goLogin = document.querySelector(`[data-go="login"]`);
const goSignup = document.querySelector(`[data-go="signup"]`);
const goMenu = document.querySelectorAll(`[data-go="menu"]`);

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

goMenu.forEach((button) => {
  button.addEventListener("click", () => {
    render("menu");
  });
});
