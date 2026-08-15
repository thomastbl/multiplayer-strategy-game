const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8081 });
console.log("Server listening on port 8081");
