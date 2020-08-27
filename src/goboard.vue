<template>
<div>
    <h1> Go Board </h1>
    <div>
        <v-row v-for="(row, x) in board.points" :key="x" class="d-flex">
            <input v-for="(point, y) in row" :key="y" type="button" :style="'width:3%;background-color:'+point.render()" @click="point.playStone(newStone())" />

        </v-row>
    </div>
</div>
</template>

<script>
import Board from './classes/Board'
import Stone from './classes/Stone'

export default {
    data() {
        return {
            board: new Board(9)
        }
    },
    methods: {
        changeStatus(x, y) {
            if (this.color[x][y] == 'black') {
                this.color[x].splice(y, 1, 'white') // instead of-> this.color[x][y] = 'white'
            } else {
                this.color[x].splice(y, 1, 'black')
            }
        },
        newStone(){
            return new Stone('black')
        }
    },
    computed: {
    

    },
    mounted() {
        for (let i = 0; i < 19; i++) {
            this.color.push([])
            for (let k = 0; k < 19; k++) {
                this.color[i].push('black')
            }
        }
        console.log(this.color)
        this.loaded = true

        let board = new Board(3)

    }

}
</script>
