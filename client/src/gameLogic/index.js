import { 
  isUppercase, 
  findMass, 
  findCorners,
  hasBorderCollision,
  hasFriendlyCorner,
  checkPlacePiece
} from './util.js';

var piece = (color, shape = [['R', 'R']]) => {
  var C = color.toUpperCase();
  var p = shape || [[C, C]];
  p.mass = findMass(p);
  p.corners = findCorners(p);
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
  const newBoard = { ...board };
  piece.forEach((row, r) => {
    row.forEach((e, c) => {
      var xDisplace = x + r - piece.center[0];
      var yDisplace = y + c - piece.center[1];
      newBoard[xDisplace][yDisplace] = e;
    })
  })
  return newBoard;
}

export { piece, genBoard, placePiece };