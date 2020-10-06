<template>
<div v-if="loaded">
        <v-row v-for="(row, x) in game.board.points" :key="x" class="d-flex">
            <input v-for="(point, y) in row" :key="y" type="button" :style="'width:3%; border-style: solid; border-width: 2px; background-color:'+point.render()" @click="player.playStone(point)"/>

        </v-row>
        <v-btn @click="switchPlayer()" :color="player.stoneColor">
            Switch Player
        </v-btn>
        <v-btn v-if="player.activePlayer == true" @click="player.passTurn()"> 
            Pass Turn
        </v-btn>
</div>
</template>

<script>
import Stone from '../classes/Stone.ts'
import Game from '../classes/Game.ts'
import goboard from '../components/goboard.vue'
import axios from 'axios'


export default {
    name: 'goboard',
    data() {
        return {
            game: undefined,
            player: undefined,
            loaded: true
        }
    },
    methods: {
        updateGame() {
            axios.get('http://localhost:3000/game').then((res) => {
                this.game = (res.data)
                console.log(this.game)
            })
        },

        switchPlayer(){
            if(this.player == this.game.playerWhite) {
                this.player = this.game.playerBlack
            } else {
                this.player = this.game.playerWhite
            }
        },

        newStone(){
            return new Stone('black')
        },

    },
    computed: {

    },

    mounted() {
        axios.get('http://localhost:3000/game').then((res) => {
            let newVals = res.data
            console.log(newVals)
            let newGame = plainToClass(Game, newVals)
            console.log(newGame)
            this.game = newGame
        })
       
        this.game = new Game()
        this.player = this.game.playerBlack
        this.loaded = true
        // this.game.imnaughty('jumped')
        // Game.prototype.imnaughty = function(thing) {
        //     console.log("I really shouln't have "+ thing)
        // }
        // this.game.imnaughty("you really shouldn't have edited the prototype")
    }
}

</script>
