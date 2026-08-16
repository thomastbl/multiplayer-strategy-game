const { WebSocketServer } = require("ws");

// Création du serveur qui écoute sur le port 8081
const wss = new WebSocketServer({ port: 8081 });
console.log("App listening on port 8081");

wss.on("connection", (socket) => {
  console.log("SERVER-SIDE : A client is connected to the server");
  socket.send("Hello client. You are connected to the server");

  socket.on("message", (data) => {
    console.log(`SERVER-SIDE : Received message: ${data}`);
    socket.send(`The server has received your message: ${data}`);
  });

  socket.on("close", () => {
    console.log("SERVER-SIDE : Client disconnected");
  });
});
