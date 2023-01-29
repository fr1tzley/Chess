import { Color } from "../Enums/Color";
import { Piece } from "./PIece";
import { PieceTypes } from "../Enums/PieceTypes"
import { Board } from "../BoardState/Board"
import { Position } from "../BoardState/Position"
import { Move } from "../BoardState/Move"

export class Pawn extends Piece {
    
    constructor(color : Color, posn : Position) {
        super(color, PieceTypes.PAWN, posn)
    }
    
    getMoves(board : Board) : Move[] {
        if (this.color == Color.BLACK) {
            return this.getMovesBlack(board);
        } else {
            return this.getMovesWhite(board);
        }
    }

    getMovesBlack(board: Board): Move[] {
        const result : Move[] = [];
        
        if (this.isEmpty(0, -1, board)) {
            let m = this.makeMove(0, 1)
            if (m) result.push(m)   
        }

        if (this.posn.y === 1 && this.isEmpty(0, -2, board)) {
            let m = this.makeMove(0, 2)
            if (m) result.push(m)
        }

        if (this.isEnemy(-1, -1, board)){
            let m = this.makeMove(-1, 1)
            if (m) result.push(m)
        }

        if (this.isEnemy(1, 1, board)){
            let m = this.makeMove(1, -1)
            if (m) result.push(m)
        }

        return result;
    }
    
    
    getMovesWhite(board: Board): Move[] {
        const result : Move[] = [];
        
        if (this.isEmpty(0, 1, board)) {
            let m = this.makeMove(0, 1)
            if (m) result.push(m)   
        }

        if (this.posn.y === 6 && this.isEmpty(0, 2, board)) {
            let m = this.makeMove(0, 2)
            if (m) result.push(m)
        }

        if (this.isEnemy(-1, 1, board)){
            let m = this.makeMove(-1, 1)
            if (m) result.push(m)
        }

        if (this.isEnemy(1, 1, board)){
            let m = this.makeMove(1, 1)
            if (m) result.push(m)
        }

        return result;
    }
}


