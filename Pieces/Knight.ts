import { Color } from "../Enums/Color";
import { Piece } from "./PIece";
import { PieceTypes } from "../Enums/PieceTypes"
import { Board } from "../BoardState/Board"
import { Position } from "../BoardState/Position"
import { Move } from "../BoardState/Move"

export class Knight extends Piece {
   
    constructor(color : Color, posn : Position) {
        super(color, PieceTypes.KNIGHT, posn)
    }

    getMoves(board: Board): Move[] {
        const result : Move[] = []

        var valid_moves: [number, number][] = [[2, 1], [1, 2], [-2,1], [-1,2], [-2,-1], [-1,-2], [2,-1], [1,-2]]

        for(let i = 0; i < valid_moves.length; i++) {
            var v = valid_moves[i]
            if (this.getValid(v[0], v[1], board)){
                let m =this.makeMove(v[0], v[1])
                if (m) result.push(m)
            }
        }

        return result
    }
}