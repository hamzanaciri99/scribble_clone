const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Game } = require('./Controllers/Game');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

Game(http);

http.listen(3000, () => {
  console.log('listening on *:3000');
});