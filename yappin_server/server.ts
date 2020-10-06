import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Game from './classes/Game'
import {plainToClass, classToPlain} from 'class-transformer'

const app = express()
let chats =[]
let jsonParser = bodyParser.json()
let port
let game = new Game()

app.use(cors({origin: [
    'http://localhost:8080',
    'http://192.168.1.12:8080'
]}))

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/chat', (req, res) => {
    res.send(chats)
})

app.get('/game', (req, res) => {
    let json = JSON.stringify(game, (key, value) => {
        if (key == 'game'){
            return 'I AM BROKEN'
        }
        else {
             return value
        }
    })
    res.send(json)
})

app.post('/game', jsonParser, (req, res)=>{
    game = (req.body)
    console.log(game)
    res.send(game)
})


app.post('/chat', jsonParser, (req, res)=>{
    chats.push(req.body)
    console.log(chats)
    res.send(chats)
})

if (port == undefined) {
    port = 3000
}

app.listen(port)
console.log('listening on port ' + port)