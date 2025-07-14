import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const server = createServer(app);


const __filename =fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));



// making the connection with the front-end 
const io= new Server(server,{
    cors:"http://localhost:5173",
    methods: ["GET", "POST"]
})

const allUsers ={};
const allRooms =[];

io.on('connection',(socket)=>{
    console.log("connection eatabilished");
    // console.log("id generated",socket.id)

    allUsers[socket.id]  = {
            socket:socket,
            online:true
        }

        // console.log("this this")

    socket.on('request_to_play',(data)=>{
        // console.log(data)
        const currentUser = allUsers[socket.id];
        currentUser.playerName = data.playerName;
        let opponentPlayer;

        for (const key in allUsers) {
            const user = allUsers[key];
            if(user.online && !user.playing && socket.id !== key){
                opponentPlayer= user;
                break;
            }
        }


        console.log(opponentPlayer)
        if(opponentPlayer){
            console.log("opponent found")

          allRooms.push({
            player1:opponentPlayer,
            player2:currentUser
          })
            currentUser.socket.emit("opponent_found", {
                opponentName: opponentPlayer.playerName,
                playingAs: "tick",
              });
        
              opponentPlayer.socket.emit("opponent_found", {
                opponentName: currentUser.playerName,
                playingAs: "cross",
              });

            currentUser.socket.on('playerMoveFromClient',(data)=>{
                console.log(data)
                opponentPlayer.socket.emit('playerMoveFromServer',{
                   ...data
                })
            })

            opponentPlayer.socket.on('playerMoveFromClient',(data)=>{
                // console.log(data)
                currentUser.socket.emit('playerMoveFromServer',{
                   ...data

                 })
            })

        }
        else{
            console.log("opponent not found")
            currentUser.socket.emit("opponent_not_found")
        }
    })

    socket.on('disconnect',(function(){
       const currentUser = allUsers[socket.id];
    //    currentUser.ononline= false
       if (currentUser) {
        currentUser.online = false;
        currentUser.playing=false
      }

      for (let index = 0; index < allRooms.length; index++) {
        const {player1,player2} = allRooms[index];

        if(player1.socket.id===socket.id){
            player2.socket.emit("opponent_left_match")
            break;
        }
        if(player2.socket.id===socket.id){
            player1.socket.emit("opponent_left_match")
            break;
        }
        
      }


    }))

}
)

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

