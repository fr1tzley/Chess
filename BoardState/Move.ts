export class Move {
    first : Position
    now : Position

    constructor (firstx : number, firsty : number, nowx : number, nowy : number) {
        this.first = new Position(firstx, firsty)
        this.now = new Position(nowx, nowy)
    }
}