import { 
  isUppercase, 
  findMass, 
  hasBorderCollision,
  hasFriendlyCorner,
  checkPlacePiece
}  from './util.js';

var piece = color => {
  var C = color.toUpperCase();
  var p = [
     [C, C]
  ];
  p.mass = findMass(p);
  p.corners = [[-1, -1], [1, -1], [-1, 2], [1, 2]];
  p.center = [0, 0];
  p.color = C;
  return p;
}

var genBoard = (row, col) => {
  var board = Array(row).fill(0);
  board = board.map(e => Array(col).fill(0));
  return board;
}

var placePiece = (board, piece, x, y) => {
  if (checkPlacePiece(board, piece, x, y)) {
    piece.forEach((row, r) => {
      row.forEach((e, c) => {
        var xDisplace = x + r - piece.center[0];
        var yDisplace = y + c - piece.center[1];
        board[xDisplace][yDisplace] = e;
      })
    })
    return true;        
  }
  return false;
}

export { piece, genBoard, placePiece };