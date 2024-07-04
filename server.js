import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

// making the connection with the front-end 
const io= new Server(server,{
    cors:"http://localhost:5173",
    methods: ["GET", "POST"]
})

const allUsers ={};

io.on('connection',(socket)=>{
    console.log("connection eatabilished");
    // console.log("id generated",socket.id)

    allUsers[socket.id]  = {
            socket:socket,
            ononline:true
        }

        // console.log("this this")

    socket.on('request_to_play',(data)=>{
        // console.log(data)
        const currentUser = allUsers[socket.id];
        currentUser.playerName = data.playerName;
        let opponentPlayer;

        for (const key in allUsers) {
            const user = allUsers[key];
            if(user.ononline && !user.playing && socket.id !== key){
                opponentPlayer= user;
                break;
            }
        }

        if(opponentPlayer){
            
        }

        console.log(opponentPlayer)
        if(opponentPlayer){
            console.log("opponent found")

          
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
                    // game: data.game
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
       currentUser.ononline= false
    }))

}
)


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});



// import express from 'express';
// import { createServer } from 'node:http';
// import { Server } from 'socket.io';

// const app = express();
// const server = createServer(app);

// // Allowing CORS for the front-end
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   }
// });

// const allUsers = {};

// io.on('connection', (socket) => {
//   console.log("Connection established with ID:", socket.id);

//   allUsers[socket.id] = {
//     socket: socket,
//     online: true
//   };

//   socket.on('request_to_play', (data) => {
//     const currentUser = allUsers[socket.id];
//     currentUser.playerName = data.playerName;
//     let opponentPlayer;

//     for (const key in allUsers) {
//       const user = allUsers[key];
//       if (user.online && !user.playing && socket.id !== key) {
//         opponentPlayer = user;
//         break;
//       }
//     }

//     if (opponentPlayer) {
//       console.log("Opponent found for", currentUser.playerName);

//       currentUser.socket.emit("opponent_found", {
//         opponentName: opponentPlayer.playerName,
//         playingAs: "tick",
//       });

//       opponentPlayer.socket.emit("opponent_found", {
//         opponentName: currentUser.playerName,
//         playingAs: "cross",
//       });

//       // Player move event listeners
//       currentUser.socket.on('playerMoveFromClient', (data) => {
//         console.log("Move from client:", data);
//         opponentPlayer.socket.emit('playerMoveFromServer', { ...data });
//       });

//       opponentPlayer.socket.on('playerMoveFromClient', (data) => {
//         console.log("Move from client:", data);
//         currentUser.socket.emit('playerMoveFromServer', { ...data });
//       });

//     } else {
//       console.log("No opponent found for", currentUser.playerName);
//       currentUser.socket.emit("opponent_not_found");
//     }
//   });

//   socket.on('disconnect', () => {
//     const currentUser = allUsers[socket.id];
//     if (currentUser) {
//       currentUser.online = false;
//     }
//     console.log("User disconnected:", socket.id);
//   });
// });

// server.listen(3000, () => {
//   console.log('Server running at http://localhost:3000');
// });
