import Stone from './Stone'
export default class Point{  
    // constructor runs ONCE for every time the class is instantiated (instantiated mean taking a class and turning it into an object you can use)
    constructor(){   
        console.log('New point made')
    }
    stone: Stone | undefined

    render():string{
        if(this.stone != undefined){
            return this.stone.color
        } else{
            return 'lightgray'
        }

    }

    playStone(stone:Stone){
        this.stone = stone
    }

}