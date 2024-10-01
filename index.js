const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + ''));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join', (username) => {
    io.emit('server', `New user, ${username} connected`);

    socket.on('disconnect', () => {
      console.log('user disconnected');
      io.emit('server', `${username} disconnected`);
    });
  });

  socket.on('message', (info) => {
    io.emit('message', info);
  });

  socket.on('typing', (info) => {
    io.emit('typing', info);
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
