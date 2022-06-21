var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

const http = require('http');
const httpServer = http.Server(app);
const io = require("socket.io")(httpServer);

let colors = ["red", "green", "yellow", "blue"];
let players = []; // array of socket ids
let playerCount = 4;
let turn = 0;
let gameStarted = false;

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);
  players.push(socket.id);
  if (players.length === playerCount) {    
    startGame();
  } else {
    io.emit("game", "waiting for more players");
  }

  socket.on('disconnect', () => {
    console.log(`a user disconnected: ${socket.id}`);
    players.splice(players.indexOf(socket.id), 1);
  });  

  socket.on("can-move", (callback) => {
    let playerIndex = players.indexOf(socket.id);
    if (gameStarted && turn % playerCount === playerIndex) {
      callback(true);
    } else {
      callback(false);
    }
  })

  socket.on('move', (board) => {
    socket.broadcast.emit("move", board);
    turn++;
    io.to(players[turn % playerCount]).emit("game", "your turn");
  });

  socket.on('force-start', () => {
    playerCount = players.length;
    startGame();
  })
});

const startGame = () => {    
  console.log(`game started`)
  
  io.emit("game", "ready to start");
  io.to(players[0]).emit("game", "your turn");
  
  players.forEach((socketId, i) => io.to(socketId).emit("assign-color", colors[i]));
  
  gameStarted = true;
}

// // HOT MODULE REPLACMENT
// var webpack = require('webpack');
// var webpackConfig = require('../webpack.config');
// var compiler = webpack(webpackConfig);

// app.use(require("webpack-dev-middleware")(compiler, {
//     noInfo: true, publicPath: webpackConfig.output.publicPath
// }));
// app.use(require("webpack-hot-middleware")(compiler));
// // HOT MODULE REPLACMENT

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname + '/../client/dist')));

httpServer.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});