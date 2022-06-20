var isUppercase = str => typeof str === 'string' && str === str.toUpperCase();

var findMass = piece => {
    var mass = [];
    piece.forEach((row, r) => {
        row.forEach((e, c) => { 
            if (isUppercase(e)) mass.push([r, c]);
        })
    })    
    return mass;
}

var hasBorderCollision = (board, piece, x, y) => {
    var directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    var collision = false;
    for (let i = 0; i < piece.mass.length; i++) {
        var xDisplace = piece.mass[i][0] - piece.center[0];
        var yDisplace = piece.mass[i][1] - piece.center[1]; 
        directions.forEach(d => {
            try {
                if (board[x + xDisplace + d[0]][y + yDisplace + d[1]] === piece.color) {
                    collision = true;
                }
            } catch {
                // ignore beyond board edge checks
            }
        })       
    }
    return collision;
}

var hasFriendlyCorner = (board, piece, x, y) => {
    var directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    var collision = false;
    for (let i = 0; i < piece.corners.length; i++) {
        var xDisplace = piece.corners[i][0] - piece.center[0];
        var yDisplace = piece.corners[i][1] - piece.center[1];
        try {
            if (board[x + xDisplace][y + yDisplace] === piece.color) {
                collision = true;
            } 
        } catch {
            // ignore beyond board edge checks
        }
    }
    return collision;
}

var checkPlacePiece = (board, piece, x, y, dx, dy) => {
    if (dx !== undefined  && dy !== undefined) {
      piece.center = [dx, dy];
    }
    for (let i = 0; i < piece.mass.length; i++) {
        var xDisplace = x + piece.mass[i][0] - piece.center[0];
        var yDisplace = y + piece.mass[i][1] - piece.center[1];
        if (isUppercase(board[xDisplace][yDisplace])) {
            return false; // BODY COLLISION
        } else if (hasBorderCollision(board, piece, x, y)) {
            return false; // SAME COLOR BORDER COLLISION
        } else if (!hasFriendlyCorner(board, piece, x, y)) {
            return false; // HAS NO FRIENDLY CORNER
        } else if (!board[xDisplace] || 
            board[xDisplace][yDisplace] === undefined) {
            // OUT OF BOUNDARIES            
            return false;
        }
    }
    return true;
}

var findCorners = piece => {
    var corners = new Set();
    var adjacents = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    var diagonals = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
    piece.forEach((row, y) => {
        row.forEach((p, x) => {
            if (p) {
                diagonals.forEach(diag => {
                    var hasEdgeConflict = false;
                    for (let i = 0; i < adjacents.length; i++) {
                        try {
                            if (piece[y + diag[0] + adjacents[i][0]][x + diag[1] + adjacents[i][1]]) {
                                hasEdgeConflict = true;
                            }
                        } catch {
                            // can't have edge conflict outside bounds
                        }
                    } 
                    var isValidDiagonal;
                    try {
                        if (!(piece[y + diag[0]][x + diag[1]])) {
                            isValidDiagonal = true;
                        } else {
                            isValidDiagonal = false;
                        }
                    } catch {
                        isValidDiagonal = true; // tiles outside bounds are valid
                    }
                    if (isValidDiagonal && !hasEdgeConflict) {
                        corners.add(JSON.stringify([y + diag[0], x + diag[1]]));
                    }
                })
            }
        })
    })
    return Array.from(corners).map(e => JSON.parse(e));
}

export { 
    isUppercase, 
    findMass, 
    findCorners,
    hasBorderCollision,
    hasFriendlyCorner,
    checkPlacePiece
} 
// TODO IMPLEMENT WITHOUT SIDE EFFECTS