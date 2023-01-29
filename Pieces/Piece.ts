import { Color } from "../Enums/Color";
import { Empty } from "../Enums/Empty"
import { PieceTypes } from "../Enums/PieceTypes"
import { Board } from "../BoardState/Board"
import { Move } from "../BoardState/Move"
import { Position } from "../BoardState/Position"


export abstract class Piece {
    color: Color;
    type: PieceTypes;
    posn: Position;

    constructor(color: Color, type: PieceTypes, posn: Position) {
        this.color = color;
        this.type = type;
        this.posn = posn;
    }

    getColor() : Color {
        return this.color;
    }

    getType() : PieceTypes{
        return this.type;
    }

    getPosn() : Position{
        return this.posn;
    }

    doMove(move : Move) : void{
        this.posn = move.now;
    }

    getValid(x : number, y : number, board : Board) : Boolean {
       return !this.isFriendly(x, y, board)
    }

    isEmpty(x : number, y : number, board : Board) : Boolean {
        if (this.outOfBounds(x, y)) {
            return false
        }
        return board.state[y][x] === Empty.EMPTY;
    }

    isEnemy(x : number, y : number, board : Board) : Boolean{
        if (this.outOfBounds(x, y)) {
            return false
        }
        if (!this.isEmpty(x, y, board)) {
            return board.state[y][x].color != this.color
        }
        return false;
    }

    isFriendly(x : number, y : number, board : Board) : Boolean{
        if (this.outOfBounds(x, y)) {
            return false
        }
        if (!this.isEmpty(x, y, board)) {
            return board.state[y][x].color == this.color
        }
        return false;
    }

    getSpace(dx : number, dy : number, board : Board) : Piece|Empty {
        return board.state[this.posn.y + dy][this.posn.x + dx]
    }

    makeMove(dx : number, dy : number) : Move|undefined {
        let x = this.posn.x
        let y = this.posn.y
        let nx = this.posn.x + dx
        let ny = this.posn.y = dy 
        if( this.outOfBounds(nx, ny)) {
            return undefined
        }

        return new Move(x, y, nx, ny)
    }

    outOfBounds(x : number, y :number) {
        return 0 > x || 7 < x || 0 > y || 7 < y
    }

    abstract getMoves(board : Board) : Array<Move>

}