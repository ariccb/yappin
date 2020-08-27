import Point from './Point'
export default class Board{
    points: Array<Array<Point>>

    constructor(boardSize:Number) {
        this.points = []

        for(let i = 0; i < boardSize; i++){
            this.points.push([])
            for(let j = 0; j < boardSize; j++){
                this.points[i].push(new Point())

            }
        }
    }
}