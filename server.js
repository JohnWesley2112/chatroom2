const express = require("express");
const path = require("path");

const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server);

const port = 5000;
const hostname = "127.0.0.1";

// Telling the app to use public directory to serve static files. syntax express.static("path", [options])
app.use(express.static(path.join(__dirname + "/public")));

io.on("connection", (socket) => {
  socket.on("newuser", (username) => {
    // console.log("update : ", `${username} has joined the chat.`);
    socket.broadcast.emit("update : ", `${username} has joined the chat.`);
  });

  socket.on("exituser", (username) => {
    socket.broadcast.emit("update : ", `${username} has left the chat.`);
  });

  socket.on("chat", (message) => {
    socket.broadcast.emit("chat", message);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server is up on http://${hostname}:${port}`);
});
