const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIo(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
      from: 'mike@example.jp',
      text: 'What is going on.',
      createdAt: 123
    });

    socket.on('createMessage', (newMessage) => {
      console.log('createMessage', newMessage);
    });

    socket.on('disconnect', () => {
      console.log('User was discnnected');
    });
})

server.listen(port, () => {
    console.log('Server is up on port 3000');
})
