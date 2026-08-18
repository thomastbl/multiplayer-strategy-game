const { WebSocketServer } = require("ws");
const jwt = require("jsonwebtoken");
process.loadEnvFile();

// Création du serveur qui écoute sur le port 8081
const wss = new WebSocketServer({ port: 8081 });
console.log("App listening on port 8081");

const connectedPlayers = new Map();

wss.on("connection", (socket) => {
  console.log("SERVER-SIDE : CLIENT CONNECTED");
  socket.isAlive = true;
  socket.on("pong", () => {
    socket.isAlive = true;
  });

  socket.on("message", (data) => {
    const parsedData = JSON.parse(data);

    if (parsedData.type === "token") {
      const payload = jwt.verify(parsedData.token, process.env.JWT_KEY);

      connectedPlayers.set(payload.user_id, payload.username);

      const array = [];
      connectedPlayers.forEach((username, id) => {
        array.push({
          name: username,
          status: "connected",
          lastseen: "now",
        });
      });

      socket.send(JSON.stringify({ type: "connectedPlayers", players: array }));
    }
  });

  socket.on("close", () => {
    console.log("SERVER-SIDE : CLIENT DISCONNECTED");
  });
});

setInterval(() => {
  wss.clients.forEach((socket) => {
    if (socket.isAlive === false) {
      return socket.terminate();
    }
    socket.isAlive = false;
    socket.ping();
  });
}, 10000);
