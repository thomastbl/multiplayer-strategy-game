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
    const message = JSON.parse(data);

    // prettier-ignore
    switch (message.type) {
      case "connect":       handleAuthentification(socket, message); break;
    }
  });

  socket.on("close", () => {
    handleDisconnection(socket);
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

function handleAuthentification(socket, message) {
  const payload = jwt.verify(message.token, process.env.JWT_KEY);
  socket.userID = payload.user_id;

  connectedPlayers.set(payload.user_id, payload.username);

  updatePlayersListForAll(socket);
}
console.log("SERVER-SIDE : handleAuthentification(socket, message)");

function handleDisconnection(socket) {
  if (!socket.userID) return;

  connectedPlayers.delete(socket.userID);

  updatePlayersListForAll(socket);
}

function updatePlayersListForAll(socket) {
  console.log("SERVER-SIDE : updatePlayersListForAll(socket)");
  const array = [];
  connectedPlayers.forEach((username, id) => {
    array.push({
      name: username,
      status: "connected",
      lastseen: "now",
    });
  });

  const message = JSON.stringify({
    type: "connectedPlayers",
    players: array,
  });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
