function createBoard() {
    var row1 = ["BR", "BN", "BB", "BK", "BQ", "BB", "BN", "BR"]
    var row2 = ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"]
    var emptyrow = ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "]
    var row7 = ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"]
    var row8 = ["WR", "WN", "WB", "WK", "WQ", "WB", "WN", "WR"]

    var board = []
    board.push(row1)
    board.push(row2)
    for(let i = 0; i < 4; i++) {
        board.push(emptyrow.slice())
    }
    board.push(row7)
    board.push(row8)
    return board

}

const prompt = require("prompt-sync")();

const board = createBoard()
const pieceVals = {
    "P": 0,
    "N": 1,
    "B": 2,
    "R": 3,
    "Q": 4,
    "K": 5

}

function outOfBounds(x, y) {
    if(x < 0 || x > board[0].length - 1) {
        return true;
    }
    if (y < 0 || y > board.length - 1) {
        return true;
    }

    return false;
}

function getColor(x, y) {
    
    if(outOfBounds(x, y)) {
        return "  ";
    }
    else {
        return board[y][x].substring(0,1)
    }
}

function getMovesPawn(x, y, color) {
    var moves = []

    if (color == "B") {
        
        if (outOfBounds(x, y + 1)) {
            //return if pawn is at edge of board
        //implement getting pieces back later
            return moves;
        }
        //if pawn is not at edge of board, moving forward 1 space is first valid move
        moves.push([x, y + 1])
        if (y == 1) {
            //if pawn is in starting position, should be able to move forward by 2 spaces as well
            moves.push([x, y + 2])
        }
        if (getColor(x + 1, y + 1) == "W") {
            //if piece diagionally in front is a white piece, black pawn can take it
            moves.push([x + 1, y + 1])
        }
        if (getColor(x - 1, y + 1) == "W") {
            //ditto
            moves.push([x - 1, y + 1])
        }
    } else if (color == "W") {
        //all of this is the same as above, just changed to work for white pawns instead of black
        if (outOfBounds(x, y - 1)) {
            return moves;
        }
        moves.push([x, y - 1])
        if (y == 6) {
            moves.push([x, y - 2])
        }
        if (getColor(x + 1, y - 1) == "B") {
            moves.push([x + 1, y - 1])
        }
        if (getColor(x - 1, y - 1) == "B") {
            moves.push([x - 1, y - 1])
        }
    }

    return moves
}

function getMovesKnight(x, y, color) {
    //moves is populated with all possible moves the knight can make
    var moves = [[x+1, y+2], [x+2, y+1], [x-1, y+2], [x-2, y+1], [x+1, y-2], [x+2, y-1], [x-1, y-2,], [x-2, y-1]]

    //moves that are out of bounds are filtered out
    moves = moves.filter(move => !outOfBounds(move[0], move[1]))
    //moves into the spaces of friendly pieces are filtered out
    moves = moves.filter(move => getColor(move[0], move[1]) != color)

    return moves
}

function getMovesBishop(x, y, color) {
    var moves = []
    
    //diagonally up and to the left
    moves = moves.concat(moveRecursion(x, y, 1, 1, color))
    //up and to the right
    moves = moves.concat(moveRecursion(x, y, 1, -1, color))
    //down to the left
    moves = moves.concat(moveRecursion(x, y, -1, -1, color))
    //down to the right
    moves = moves.concat(moveRecursion(x, y, -1, 1, color))

    return moves
}

function getMovesRook(x, y, color) {
    var moves = [];

    //upwards line
    moves = moves.concat(moveRecursion(x, y, 0, 1, color))
    //to the right
    moves = moves.concat(moveRecursion(x, y, 1, 0, color))
    //downwards line
    moves = moves.concat(moveRecursion(x, y, 0, -1, color))
    //to the left
    moves = moves.concat(moveRecursion(x, y, -1, 0, color))

    return moves
}

function getMovesQueen(x, y, color) {
    moves = []

    //the queen's moves can be calculated by finding the valid moves for both a bishop and a rook on the same space
    moves = moves.concat(getMovesBishop(x, y, color))
    moves = moves.concat(getMovesRook(x, y, color))

    return moves
}

function getMovesKing(x, y, color) {
    //similar to the knight, all the kings possible moves are calculated, and the ones that would go out of bounds or attack a friendly are filtered out
    moves = [[x+1, y+1], [x+1, y], [x+1, y-1], [x, y+1], [x, y-1], [x-1, y+1], [x-1, y], [x-1, y-1]]

    moves = moves.filter(move => !outOfBounds(move[0], move[1]))
    moves = moves.filter(move => getColor(move[0], move[1]) != color)
    return moves
}



function moveRecursion(x, y, dx, dy, color) {
    //recursive method for finding moves for given pieces
    //x and y are changed by dx(delta x) and dy(delta y) each time
    //this lets the function be used for rooks, bishops and queens

    //by adding the delta each time, we can recursively add squares in a straight line to our list of valid moves
    //until we either hit an enemy or friendly piece, at which point recursion stops
    var moves = []
    x += dx;
    y += dy;

    //the next square in the current line 
    var thisMove = [x, y]
    
    if (outOfBounds(x, y)) {
        //x and y are out of bounds
        return moves
    } else if (board[y][x] == "  ") {
        //square is unoccupied, so we add it to moves and check the next one in line
        moves.push(thisMove)
        return moves.concat(moveRecursion(x, y, dx, dy, color))
    } else if (getColor(x, y) == color) {
        //piece on the square is friendly piece, so we stop recursion, and don't add the current move(you can't take your own piece!)
        return moves;
    } else {
        //piece on the square is enemy piece, so we add thisMove to valid moves, but don't check the next square
        moves.push(thisMove)
        return moves
    }
}

function getMoves(x, y, color){
    var piece = board[y][x]
    var pcolor = getColor(x, y)
    var ptype = piece.substring(1, 2)
    
    if (piece == "  ") {
        return -1
    }
    if (pcolor != color) {
        return -1
    }

    switch(pieceVals[ptype]) {
        case 0:
            return getMovesPawn(x, y, pcolor)
        case 1:
            return getMovesKnight(x, y, pcolor)
        case 2:
            return getMovesBishop(x, y, pcolor)
        case 3:
            return getMovesRook(x, y, pcolor)
        case 4:
            return getMovesQueen(x, y, pcolor)
        case 5:
            return getMovesKing(x, y, pcolor)
        default:
            console.log("fell to default")
            return -1
    }

}

function doMove(x, y, nx, ny) {
    //the piece at [x, y] is moved to [nx, ny], and [x, y] is left empty
    
    board[ny][nx] = board[y][x]
    board[y][x] = "  "
    
} 

function printBoard() {
    console.log(" | 0| 1| 2| 3| 4| 5| 6| 7|")
    for (let i = 0; i < board.length; i++) {
        var row = board[i]
        var printString = i.toString() + "|"
        for (let j = 0; j < row.length; j++) {
            printString += row[j]
            printString += "|"
        }
        console.log(printString)
    }
}

function printMoves(moves) {
    var printString = ""
    var next = ""
    for(let i = 0; i < moves.length; i++) {
        next = toString(i + 1) + ". " + toString(moves[i]) + " ,"
        printString += next
    }
    console.log(printString)
}

function acceptMoveInput(color) {
    var x = parseInt(prompt("What is the x of the desired piece?"))
    var y = parseInt(prompt("What is the y of the desired piece?"))
    var moves = getMoves(x, y, color)
    if(moves == -1) {
        console.log("This is not a valid selection. Please try again.")
        acceptMoveInput(color)
    if(moves == []) {
        console.log("This piece cannot move. Please try again.")
        acceptMoveInput(color)
    }
    } else {
        selectMove(x, y, moves)
    }
}

function selectMove(x, y, moves) {
    console.log(moves)
    var selection = parseInt(prompt("What is the number of the desired move?"))
    if (selection < 1 || selection > moves.length) {
        console.log("This is not a valid selection. Please try again")
        selectMove(moves)
    } else {
        var move = moves[selection - 1]
        doMove(x, y, move[0], move[1])
    }
}


function runGame() {
    var running = true;
   
    while(running) {
        printBoard()
        console.log("White's turn")
        acceptMoveInput("W")
        printBoard()
        console.log("Black's turn")
        movesAndCoords = acceptMoveInput("B")
        
    }
}



console.log(runGame())