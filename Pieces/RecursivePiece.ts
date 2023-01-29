import { Color } from "../Enums/Color";
import { Piece } from "./PIece";
import { PieceTypes } from "../Enums/PieceTypes"
import { Board } from "../BoardState/Board"
import { Position } from "../BoardState/Position"
import { Move } from "../BoardState/Move"

export abstract class RecursivePiece extends Piece {
    recurseMoves(dx : number, dy : number, accx: number, accy: number, board : Board): Move[] {
        const result : Move[] = [];

        accx += dx
        accy += dy

        let x = this.posn.x
        let y = this.posn.y
        let nx = x + accx
        let ny = y + accy
        if( this.outOfBounds(nx, ny)) {
            return result
        } 
        
        else if (this.isFriendly(nx, ny, board)) {
            return result
        } 
        
        else if (this.isEnemy(nx, ny, board)) {
            let m = this.makeMove(accx, accy)
            if (m) result.push(m)
            return result
        } 

        else {
            let m = this.makeMove(accx, accy)
            if (m) result.push(m)
            return result.concat(this.recurseMoves(dx, dy, accx, accy, board))
        }
        

        
    }
}