import { Color } from "../Enums/Color";
import { PieceTypes } from "../Enums/PieceTypes"
import { Board } from "../BoardState/Board"
import { Position } from "../BoardState/Position"
import { Move } from "../BoardState/Move"
import { RecursivePiece } from "./RecursivePiece";

export class King extends RecursivePiece {

    constructor(color : Color, posn : Position) {
        super(color, PieceTypes.KING, posn)
    }

    getMoves(board: Board): Move[] {
        const result : Move[] = [];

        var valid_moves: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]

        for(let i = 0; i < valid_moves.length; i++) {
            var v = valid_moves[i]
            if (this.getValid(v[0], v[1], board)){
                let m =this.makeMove(v[0], v[1])
                if (m) result.push(m)
            }
        }

        return result;
    }

    
}