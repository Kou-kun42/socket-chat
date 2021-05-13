const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let users = {};

io.on("connection", (socket) => {
  console.log("New user has joined");
  io.emit("joined");

  socket.on("chat message", (msg, nick) => {
    users[nick] = socket.id;
    io.emit("chat message", msg, nick);
    console.log(nick + ": " + msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
