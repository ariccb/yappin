<template>
<div>
    <h1> Go Board </h1>
    <div v-if="loaded">
        <v-row v-for="n in 19" :key="n" class="d-flex">
            <input v-for="k in 19" :key="k" type="button" :style="'width:3%;background-color:'+color[n][k]" @click="changeStatus(n,k)" />

        </v-row>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            color: [],
            loaded: false
        }
    },
    methods: {
        changeStatus(x, y) {
            if (this.color[x][y] == 'black') {
                this.color[x][y] = 'white'
            } else {
                this.color[x][y] = 'black'
            }
        }
    },
    computed: {

    },
    mounted() {
        let colorState = []
        for (let i = 0; i < 19; i++) {
            colorState.push([])
            for (let k = 0; k < 19; k++) {
                colorState[i].push('black')

            }
        }
        this.color = colorState
        console.log(this.color)
        this.loaded = true
    }
}
</script>
