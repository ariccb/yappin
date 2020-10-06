import Player from './Player'
import Board from './Board'
export default class Game {
    turn: number
    playerBlack: Player
    playerWhite: Player
    board: Board
    end: boolean
    passCount: number
    loser: Player | undefined = undefined
    
    constructor(){
        this.board = new Board(9)
        this.playerWhite = new Player('Player 1', 'white', this)
        this.playerBlack = new Player('Player 2', 'black', this)
        this.turn = 1
        console.log(this.playerWhite)
        this.playerBlack.setTurn()
        console.log(this.playerWhite)
        console.log(this.playerBlack)
        this.end = false
        this.passCount = 0
    }

    changeTurn(){
        this.turn += 1
        if(this.turn % 2 == 0) {
            this.playerWhite.setTurn()
        } else {
            this.playerBlack.setTurn()
        }
    }
    endGame(){
        this.end = true
        this.playerBlack.activePlayer = false
        this.playerWhite.activePlayer = false
        console.log("game ended")
    }
    passcounter(){
        this.passCount += 1
        if (this.passCount == 3) {
            this.endGame()
        } 
    }

}