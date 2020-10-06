import Stone from './Stone'
import Game from './Game'
export default class Point {

    stone: Stone | undefined = undefined
    constructor(){
        console.log("new pont made")
    }

    render():string{
        if (this.stone != undefined) {
            return this.stone.color
        }
        else {
            return 'lightgray'
        }
    }

    playStone(stone:Stone){
        if(this.stone == undefined){
            this.stone = stone
        }
        
    }
}