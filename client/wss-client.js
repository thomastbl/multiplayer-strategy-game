// Connexion au serveur
import { displayPlayersList } from "./render.js";

let socket = null;

export function connectWebSocket() {
  const socket = new WebSocket("ws://localhost:8081");

  socket.addEventListener("open", () => {
    console.log("CLIENT-SIDE : You are connected to the server");
    const token = localStorage.getItem("token");

    socket.send(JSON.stringify({ type: "token", token: token }));
  });

  socket.addEventListener("message", (event) => {
    const parsedData = JSON.parse(event.data);
    if (parsedData.type === "connectedPlayers") {
      displayPlayersList(parsedData.players);
    }
  });

  socket.addEventListener("close", () => {
    console.log("CLIENT-SIDE : Disconnected");
  });
}
