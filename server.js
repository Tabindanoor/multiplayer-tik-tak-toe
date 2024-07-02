import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

// making the connection with the front-end 
const io= new Server(server,{
    cors:"http://localhost:5173"
})

const allUsers ={};

io.on('connection',(socket)=>{
    console.log("connection eatabilished");
    // console.log("id generated",socket.id)

    allUsers[socket.id]  = {
            socket:socket,
            ononline:true
        }


    socket.on('request_to_play',(data)=>{
        console.log(data)
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

     
        console.log(opponentPlayer)
        if(opponentPlayer){
            console.log("opponent found")
        }
        else{
            console.log("opponent not found")

        }
    })

    socket.on('disconnect',(function(){
        // for (let index = 0; index < allUsers.length; index++) {
        //     const user = allUsers[index];
        //     if(user.id===socket.id){
        //         user.ononline = false
        //     } 
        // }

        allUsers[socket.id]= {
            socket:{...socket,ononline:false},
            ononline:true,
        }
    }))


}
)








server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});