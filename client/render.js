const goLogin = document.querySelector(`[data-go="login"]`);
const goSignup = document.querySelector(`[data-go="signup"]`);
const goGameMenu = document.querySelector(`[data-go="gameMenu"]`);
const goMenu = document.querySelectorAll(`[data-go="menu"]`);
const signupButton = document.getElementById("signup-button");
const loginButton = document.getElementById("login-button");
const usernameSU = document.getElementById("username_su");
const passwordSU = document.getElementById("password_su");
const usernameLG = document.getElementById("username_lg");
const passwordLG = document.getElementById("password_lg");
const logout = document.getElementById("logout");
const backButtonFromGameMenu = document.getElementById("menu-game-back");
const enterGameButton = document.getElementById("enter-game-button");
const signupStatus = document.getElementById("signup-status");
const loginStatus = document.getElementById("login-status");
const range = document.getElementById("lobby-size");
const affichage = document.getElementById("lobby-size-value");
const lobbyName = document.getElementById("lobby-name");
const lobbySize = document.getElementById("lobby-size");
const createLobby = document.getElementById("create-lobby");
const lobbyForm = document.getElementById("lobby-form");

import { connectWebSocket } from "./wss-client.js";
import { terminateWS } from "./wss-client.js";

let currentView = "menu";

export function render(dataview) {
  const update = () => {
    document.querySelectorAll("[data-view]").forEach((element) => {
      element.hidden = true;
    });
    document.querySelector(`[data-view="${dataview}"]`).hidden = false;
  };

  if (!document.startViewTransition) return update();
  document.startViewTransition(update);
}

// --------- Changement de vues

goLogin.addEventListener("click", () => {
  loginStatus.textContent = "";
  loginStatus.className = "";
  render("login");
});

goSignup.addEventListener("click", () => {
  signupStatus.textContent = "";
  signupStatus.className = "";
  render("signup");
});

goGameMenu.addEventListener("click", () => {
  const token = localStorage.getItem("token");
  if (token) {
    render("gameMenu");
    connectWebSocket();
  } else {
    render("login");
  }
});

// --------- Créer vue

export function displayPlayersList(playerList) {
  const tbody = document.getElementById("playerListBody");
  tbody.textContent = "";

  playerList.forEach((player) => {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    const tdName = document.createElement("td");
    tdName.textContent = player.name;
    tr.appendChild(tdName);

    const tdStatus = document.createElement("td");
    tdStatus.textContent = player.status;
    tr.appendChild(tdStatus);

    const tdActivity = document.createElement("td");
    tdActivity.textContent = player.lastseen;
    tr.appendChild(tdActivity);
  });
}

// --------- Events listeners

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  enterGameButton.hidden = true;
  goLogin.hidden = false;
  goSignup.hidden = false;
  terminateWS();
});

backButtonFromGameMenu.addEventListener("click", () => {
  enterGameButton.hidden = false;
  goLogin.hidden = true;
  goSignup.hidden = true;
  terminateWS();
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

  usernameSU.value = "";
  passwordSU.value = "";

  const data = await response.json();
  if (response.ok) {
    signupStatus.textContent = data.info;
    signupStatus.className = "success-message";
  } else {
    signupStatus.textContent = data.info;
    signupStatus.className = "failure-message";
  }
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

  usernameLG.value = "";
  passwordLG.value = "";

  const data = await response.json();
  if (response.ok) {
    console.log(data.connection);
    localStorage.setItem("token", data.token);
    connectWebSocket();
    render("gameMenu");
  } else {
    loginStatus.textContent = data.connection;
    loginStatus.className = "failure-message";
  }
});

goMenu.forEach((button) => {
  button.addEventListener("click", () => {
    render("menu");
  });
});

range.addEventListener("input", () => {
  affichage.textContent = range.value;
});

createLobby.addEventListener("click", async () => {
  const response = await fetch("http://localhost:8080/createLobby", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lobbyName: lobbyName.value,
      lobbySize: lobbySize.value,
    }),
  });
});

lobbyForm.addEventListener("submit", (event) => {
  event.preventDefault();
});
