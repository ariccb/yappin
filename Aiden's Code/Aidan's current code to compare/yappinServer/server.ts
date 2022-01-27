import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Game from './classes/Game'
import {plainToClass, classToPlain} from 'class-transformer'

const app = express()
let chats = []
let jsonParser = bodyParser.json()
let port 
let game = new Game()
let players =  0 

app.use(cors(
//   {origin: [
//   'http://localhost:8080',
//   'http://localhost:8080/*'
// ]}
))

app.get('/chat', (req, res)=> {
  res.send(chats)
})

app.get('/game', (req,res)=>{ 
  res.send(game.serialize())
  
})

app.post('/chat', jsonParser, (req, res)=>
{
  //console.log('got post')
  console.log(req)
  chats.push (req.body)
  console.log(chats)
  res.send(chats) 
})

app.post('/game', jsonParser, (req, res)=>{
  let newVals = req.body  
  console.log(newVals)                 
  let newGame = plainToClass(Game, newVals)
  newGame.deserialize()
  game = newGame
  console.log(game)
  res.send('updated')
})

app.post('/game/join', jsonParser, (req, res) => {

  if (players == 0){
    res.send('black')
    players += 1
  }
  else if(players == 1){
    res.send('white')
    players += 1
    }  

  else{
    res.send('Too many players')
  }
 
})

 if (port == undefined)
 {
     port = 3000
 }
app.listen(port)
console.log('listening on port ' + port)
