import { Color } from "../Enums/Color";
import { PieceTypes } from "../Enums/PieceTypes"
import { Board } from "../BoardState/Board"
import { Position } from "../BoardState/Position"
import { Move } from "../BoardState/Move"
import { RecursivePiece } from "./RecursivePiece";

export class Queen extends RecursivePiece {

    constructor(color : Color, posn : Position) {
        super(color, PieceTypes.QUEEN, posn)
    }

    getMoves(board: Board): Move[] {
        const result : Move[] = [];

        result.concat(this.recurseMoves(1, 0, 0, 0, board))
        result.concat(this.recurseMoves(-1, 0, 0, 0, board))
        result.concat(this.recurseMoves(0, 1, 0, 0, board))
        result.concat(this.recurseMoves(0, -1, 0, 0, board))

        result.concat(this.recurseMoves(1, 1, 0, 0, board))
        result.concat(this.recurseMoves(-1, -1, 0, 0, board))
        result.concat(this.recurseMoves(-1, 1, 0, 0, board))
        result.concat(this.recurseMoves(1, -1, 0, 0, board))

        return result;
    }

    
}