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

var checkPlacePiece = (board, piece, x, y) => {
    for (let i = 0; i < piece.mass.length; i++) {
        var xDisplace = x + piece.mass[i][0] - piece.center[0];
        var yDisplace = y + piece.mass[i][1] - piece.center[1];
        if (isUppercase(board[xDisplace][yDisplace])) {
            return false; // BODY COLLISION
        } else if (hasBorderCollision(board, piece, x, y)) {
            return false; // SAME COLOR BORDER COLLISION
        } else if (!hasFriendlyCorner(board, piece, x, y)) {
            return false; // HAS NO CORNER COLLISION
        } else if (!board[xDisplace] || 
            board[xDisplace][yDisplace] === undefined) {
            // OUT OF BOUNDARIES            
            return false;
        }
    }
    return true;
}

export { 
    isUppercase, 
    findMass, 
    hasBorderCollision,
    hasFriendlyCorner,
    checkPlacePiece
} 
// TODO IMPLEMENT WITHOUT SIDE EFFECTS