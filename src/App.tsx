
import './App.css'
import { useEffect, useRef, useState } from 'react';
import Square from './components/Square';
// import { initSocket, socket } from './socket';
import { io } from 'socket.io-client'; 
import Swal from 'sweetalert2';
const App=()=> {


  // socket connection code is here 
  // const socket = io('http://localhost:3000',{
  //   autoConnect:true
  // })

  const mySquare =[
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ]


  const [game,setGame]= useState(mySquare)  
  const [currentPlayer, setCurentPlayer]= useState("tick")
  const [finalPlayer, setFinalPlayer]= useState(false)
  const [state,setState] =useState([])
  const [playOnline,setPlayOnline]=useState(false)
  const [socketState,setSocketState]= useState(null)
  const [playerName,setPlayerName] = useState("")
  const [opponentName,setOpponentsName] = useState("")
  const getWinner=()=>{
    
    for (let row = 0; row < game.length; row++) {
      if(game[row][0] === game[row][1] && game[row][1] === game[row][2]  )
      {
        // console.log(game[row][0])
        setState([row*3 + 0 , row*3 +1 , row*3 +2 ])
        return game[row][0]
      }
    }
    for (let col = 0; col < game.length; col++) {
      if(game[0][col] === game[1][col] && game[1][col] === game[2][col]  )
      {
        // console.log(game[0][col])
        setState([0*3 + col , 1 * 3 + col  , 2 *3 + col])
        return game[0][col]
      }
    }

    if(game[0][0] === game[1][1] && game[1][1] === game[2][2]  )

      {
        // console.log(game[0][0])
         setState([0 * 3 + 0, 1 * 3 + 1, 2 * 3 + 2]);
        return game[0][0]
      }


       if(game[0][2] === game[1][1] && game[1][1] === game[2][0]  )
      {
        // console.log(game[0][2])
        setState([0 * 3 + 2, 1 * 3 + 1, 2 * 3 + 0]);
        return game[0][2]
      }

      const isDraw = game.flat().every((e)=>{
        if(e === 'cross' || e ==='tick') return true;
      })
      // console.log(isDraw);
  
      if(isDraw)return 'draw';
    


    return null;

  }

  useEffect(() => {
    const winner = getWinner()
    if(winner)
      {
        setFinalPlayer(winner)
      }
    // if(winner === 'tick' || winner === 'cross'){
    //   setFinalPlayer(winner)
    // }
// console.log(getWinner)
    
  }, [game])


const takePlayername = async()=>{
  const result = await Swal.fire({
    title: "Enter name",
    input: "text",
    inputLabel: "Your Name Here Please :)",
    // inputValue,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    }
  }


);
  // if (ipAddress) {
  //   Swal.fire(`Your IP address is ${ipAddress}`);
  // }
  // console.log(result);
  
  return result

}

socketState &&  socketState?.on('connect',()=>{
  setPlayOnline(true)

})
    
 
// useEffect(() => {

// socketState && socketState?.on('connect',function(){
//   // setPlayOnline(true)
//   // alert("connected to server")
//   setPlayOnline(socketState)
// })
// }, [socketState])



const onlinePlayClick=async()=>{
  const result = await takePlayername()
  if(!result.isConfirmed){
    return;
  }

  const username = result.value;
  setPlayerName(username)
  // console.log(result,"res")


  const newState = io('http://localhost:3000',{
    autoConnect:true
  })

  // emitting the fucntion to the backend socket io 
  newState?.emit("request_to_play",{
    playerName:username
  }
)
  setSocketState(newState)
}


if(!playOnline)
  return(
<div>
<button 
    onClick={onlinePlayClick}
    className='p-2 bg-yellow-600 border-2 border-black rounded-lg text-xl  '>Play Online</button>
</div>
)
 


if(playOnline && !opponentName)
  return(
<div>
<p  className='p-2 bg-purple-600 border-2 border-black rounded-lg text-xl  '>Waiting for opponent</p>
</div>
)

  return (
<div className="cursor-pointer ripple-background h-screen flex items-center justify-center">
  <div className="flex flex-col items-center">
    <div className="flex space-x-4 justify-between ">
      <div className=" px-4 py-2  w-28 h-12 bg-gray-500  border-white text-white rounded-lg ">You</div>
      <div className="px-4 py-2  w-28 h-12 bg-gray-500  border-white text-white rounded-lg  "> Opponent</div>
    </div>
    <p className='text-2xl m-3 font-semibold text-black bg-gray-800 bg-opacity-10 w-full p-3 rounded-lg'>Tic Tac Toe</p>
   
    <div className="max-w-sm flex flex-col items-center justify-center min-h-fit p-7 rounded-lg bg-white z-10  text-center">
      <div className="grid grid-cols-3 gap-4 ">
        {game.map((arr,rowIndex) =>
          arr.map((e,colIndex) => {
            return <Square                    
                    state={state}
                   key={rowIndex*3+colIndex} 
                   id={rowIndex*3+colIndex}  
                   setGame={setGame}
                   currentPlayer={currentPlayer}
                   setCurentPlayer={setCurentPlayer} 
                   finalPlayer={finalPlayer}
                   setFinalPlayer={setFinalPlayer}/>;
          })
        )}
      </div>
    </div>
    { finalPlayer && finalPlayer !== 'draw' &&
       <p>{finalPlayer} won the game</p>}


{ finalPlayer && finalPlayer === 'draw' &&
       <p>{finalPlayer} It's a Draw :)</p>}
  </div>
</div>

  
  )
}

export default App
{/* <div className='circle xxlarge shade1'></div>
  <div className='circle xlarge shade2'></div>
  <div className='circle large shade3'></div>
  <div className='circle mediun shade4'></div>
  <div className='circle small shade5'></div> */}