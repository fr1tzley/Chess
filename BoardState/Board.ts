import { Piece } from "../Pieces/Piece"
import { Pawn } from "../Pieces/Pawn"
import { Knight } from "../Pieces/Knight"
import { Bishop } from "../Pieces/Bishop"
import { Rook } from "../Pieces/Rook"
import { Queen } from "../Pieces/Queen"
import { King } from "../Pieces/King"
import { PieceTypes } from "../Enums/PieceTypes"
import {Empty} from "../Enums/Empty"
import {Color} from "../Enums/Color"
import { Position } from "./Position"

export class Board {
    state : any[];

    constructor() {
        let r0 = this.makePieces(Color.BLACK)
        let r1 = this.makePawns(Color.BLACK)
        let r2 = [Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY]
        let r3 = [Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY]
        let r4 = [Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY]
        let r5 = [Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY, Empty.EMPTY]
        let r6 = this.makePawns(Color.WHITE)
        let r7 = this.makePieces(Color.WHITE)

        this.state = [r0, r1, r2, r3, r4, r5, r6, r7]
    }

    makePawns(color : Color) : Piece[] {
        const result : Piece[] = []

        let y = 6

        if (color === Color.BLACK) {
            y = 1
        } 

        for(let i = 0; i < 7; i++) {
            result.push(new Pawn(color, new Position(i, y)))
        }

        return result
    }

    makePieces(color : Color) : Piece[] {
        const result : Piece [] = []

        let y = 7

        if (color === Color.BLACK) {
            y = 0
        } 

        result.push(new Rook(color, new Position(0, y)))
        result.push(new Knight(color, new Position(1, y)))
        result.push(new Bishop(color, new Position(2, y)))
        result.push(new Queen(color,  new Position(3, y)))
        result.push(new King(color, new Position(4, y)))
        result.push(new Bishop(color, new Position(5, y)))
        result.push(new Knight(color, new Position(6, y)))
        result.push(new Rook(color, new Position(7, y)))

        return result
    }


}