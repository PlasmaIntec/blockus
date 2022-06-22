var express = require('express');
var morgan = require('morgan');
var path = require('path');
const uuid = require('uuid');

var app = express();
var PORT = process.env.PORT || 3000;

const http = require('http');
const httpServer = http.Server(app);
const io = require("socket.io")(httpServer);

let colors = ["red", "green", "yellow", "blue"];
let players = []; // array of sockets
const PLAYER_COUNT_MAX = 4;
const MAX_GAME_TIME_MILLIS = 30*60*1000 // games should expire after 30 min
let games = {};

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);
  players.push(socket);
  if (players.length === PLAYER_COUNT_MAX) {    
    const roomId = uuid();
    startGame(roomId);
  } else {
    // TODO!: put queueing players in lobby
    io.emit("game", "waiting for more players");
  }

  retireGames();

  socket.on('disconnect', () => {
    console.log(`a user disconnected: ${socket.id}`);
    const playerIndex = players.findIndex(playerSocket => playerSocket.id === socket.id);
    if (playerIndex > -1) {
      players.splice(playerIndex, 1);
    }
  });  

  socket.on("can-move", (roomId, callback) => {
    if (!roomId || !games[roomId]) {
      callback(false);
      return;
    }
    const playerIndex = games[roomId].players.findIndex(playerSocket => playerSocket.id === socket.id);
    const playerCount = games[roomId].players.length;
    const turn = games[roomId].turn;
    if (turn % playerCount === playerIndex) {
      callback(true);
    } else {
      callback(false);
    }
  })

  socket.on('move', (roomId, board) => {
    if (!roomId || !games[roomId]) {
      return;
    }
    socket.to(roomId).emit("move", board);
    const playerCount = games[roomId].players.length;
    const turn = ++games[roomId].turn;
    io.to(games[roomId].players[turn % playerCount].id).emit("game", "your turn");
  });

  socket.on('force-start', () => {
    const roomId = uuid();
    startGame(roomId);
  })
});

const startGame = (roomId) => {    
  console.log(`game started`)

  games[roomId] = { players: [...players], turn: 0, start: Date.now() };
  players = [];

  io.to(roomId).emit("game", "ready to start");
  io.to(games[roomId].players[0].id).emit("game", "your turn");
  
  games[roomId].players.forEach((playerSocket, i) => {
    playerSocket.join(roomId);
    io.to(playerSocket.id).emit("initialize", colors[i], roomId)
  });
}

const retireGames = () => {  
  Object.entries(games).forEach(([roomId, { start }]) => {
    if ((Date.now() - start) > MAX_GAME_TIME_MILLIS) {
      delete games[roomId];
    }
  })
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