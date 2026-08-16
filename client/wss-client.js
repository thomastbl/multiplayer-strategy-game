// Connexion au serveur
const socket = new WebSocket("ws://localhost:8081");

socket.addEventListener("open", () => {
  console.log("CLIENT-SIDE : You are connected to the server");
  socket.send("Hello server, I am the client");
});

socket.addEventListener("message", (event) => {
  console.log(`CLIENT-SIDE : Message received from the server : ${event.data}`);
});

socket.addEventListener("close", () => {
  console.log("CLIENT-SIDE : Disconnected");
});
