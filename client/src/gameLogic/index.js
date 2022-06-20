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
      if (e) {
        var xDisplace = x + r - piece.center[0];
        var yDisplace = y + c - piece.center[1];
        newBoard[xDisplace][yDisplace] = e;
      }
    })
  })
  return newBoard;
}

const findAnchorPoints = (board, height, width, color) => {
  const anchorPoints = [];

  const C = color.toUpperCase();
  const checker = piece(color, [[C]]);
  
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (checkPlacePiece(board, checker, row, col)) {
        anchorPoints.push([row, col]);
      }
    }
  }

  return anchorPoints;
}

export { piece, genBoard, placePiece, findAnchorPoints };