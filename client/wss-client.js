// Connexion au serveur
import { displayPlayersList } from "./render.js";

let socket = null;

export function connectWebSocket() {
  const token = localStorage.getItem("token");
  socket = new WebSocket("ws://localhost:8081");

  socket.addEventListener("open", () => {
    console.log("CLIENT-SIDE : You are connected to the server");
    socket.send(JSON.stringify({ type: "connect", token: token }));
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);

    // prettier-ignore
    switch (message.type) { 
      case "connectedPlayers": displayPlayersList(message.players); break;
    }
  });

  socket.addEventListener("close", () => {
    console.log("CLIENT-SIDE : Disconnected");
  });
}

export function terminateWS() {
  socket.close();
}
