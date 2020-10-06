import Point from './Point'
export default class Board {
    
    points: Array<Array<Point>>
    
    constructor(boardSize:Number) {
        this.points = []
        
        for (let i = 0; i < boardSize; i++) {
            this.points.push([])
            for (let k = 0; k < boardSize; k++) {
                this.points[i].push(new Point())
           }
        }        
    }

    serialize(){
    
    }

    deserialize(){

    }
}

