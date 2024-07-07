
import './App.css'
import { useEffect, useState } from 'react';
import Square from './components/Square';
import { io } from 'socket.io-client'; 
import Swal from 'sweetalert2';
import PlayOnline from './components/PlayOnline';
import Waiting from './components/Waiting';

const mySquare =[
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

const App=()=> {

  const [game,setGame]= useState(mySquare)  
  const [currentPlayer, setCurentPlayer]= useState("tick")
  const [finalPlayer, setFinalPlayer]= useState(false)
  const [state,setState] =useState([])
  const [playOnline,setPlayOnline]=useState(false)
  const [socketState,setSocketState]= useState(null)
  const [playerName,setPlayerName] = useState("")
  const [opponentName,setOpponentsName] = useState()
  const [playingAs,setPlayingAs] = useState('')



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
  
      if(isDraw) return 'draw';
    


    return null;

  }

  useEffect(() => {
    const winner = getWinner()
    if(winner)
      {
        setFinalPlayer(winner)
      }
      
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
  });  
  return result

}



// //////////////////////////////////


socketState?.on("playerMoveFromServer",(data)=>{
  // setCurentPlayer(data.state.currentPlayer);
  const id = data.state.id;
  setGame((prevState)=>{
    let newState = [...prevState]
    const rowIndex = Math.floor(id/3);
    const columnIndex = id%3;
    newState[rowIndex][columnIndex]=data.state.sign;
    // console.log(newState);
    return newState;
    
  })


  setCurentPlayer(data.state.sign === "tick"?"cross":"tick");
 

})



  

socketState &&  socketState?.on('connect',function(){
  setPlayOnline(true);

})

socketState &&  socketState?.on('opponent_not_found',()=>{
    setOpponentsName(false)
})

socketState && socketState?.on('opponent_left_match',()=>{
  // alert("opponent_left_match")

  const result =  Swal.fire({
    title: "opponent left match",
    // input: "text",
    // inputLabel: "Your Name Here Please :)",
    // inputValue,
    // showCancelButton: true,
    // inputValidator: (value) => {
    //   if (!value) {
    //     return "You need to write something!";
    //   }
    // }
  });  
  setFinalPlayer('opponent_left_match')
  return result

})

socketState &&  socketState?.on('opponent_found',(data)=>{
  setPlayingAs(data.playingAs)
  setOpponentsName(data.opponentName);
})
    
// /////////////////////////////////////////////////////
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
//  <div>
// <button 
//     onClick={onlinePlayClick}
//     className='p-2 bg-yellow-600 border-2 border-black rounded-lg text-xl  '>Play Online</button>
// </div> 
    <PlayOnline onlinePlayClick={onlinePlayClick}  />

)
 




if(playOnline && !opponentName)
  return(
<div>
  <Waiting/>
     
</div>
)

  return (
<div className="cursor-pointer ripple-background h-screen flex items-center justify-center">
  <div className="flex flex-col items-center">
    <div className="flex space-x-4 justify-between ">
     
     <div className= {`px-4 py-2  w-28 h-12 bg-gray-500  border-white text-white rounded-lg   ${currentPlayer === playingAs? 'bg-pink-800 '+currentPlayer:""}`} >{playerName}</div>
      <div className={`px-4 py-2  w-28 h-12 bg-gray-500  border-white text-white rounded-lg    ${currentPlayer !== playingAs? 'bg-green-700 '+currentPlayer:""} `}> { opponentName}</div>
   
    </div>
    <p className='text-2xl m-3 font-semibold  bg-gray-800 text-white w-full p-3 rounded-lg'> Let's Play Tic Tac Toe </p>
   
    <div className="max-w-sm flex flex-col items-center justify-center min-h-fit p-7 rounded-lg bg-white z-10  text-center">
      <div className="grid grid-cols-3 gap-4 ">
        {game.map((arr,rowIndex) =>
          arr.map((e,colIndex) => {
            return (
                  <Square    
                  socketState={socketState}                
                  state={state}
                  key={rowIndex*3+colIndex} 
                  id={rowIndex*3+colIndex}  
                  setGame={setGame}
                  game={game}
                  currentPlayer={currentPlayer}
                  setCurentPlayer={setCurentPlayer} 
                  finalPlayer={finalPlayer}
                  setFinalPlayer={setFinalPlayer}
                  currentElement={e}
                  playingAs={playingAs}
                  />)
                
          })
        )}
      </div>
    </div>

{ finalPlayer && finalPlayer!==  'opponent_left_match' && finalPlayer !== 'draw' &&
       <p className='text-xl font-semibold font-serif  text-black '>{finalPlayer === playingAs ? "You":finalPlayer} won the game  </p>}


{ finalPlayer  &&  finalPlayer!==  'opponent_left_match' &&  finalPlayer === 'draw' &&
       <p className='text-xl font-semibold font-serif  text-black '>{finalPlayer} It's a Draw :)</p>}

{ !finalPlayer && opponentName &&
       <p className='text-xl font-semibold font-serif  text-black '>Your are playing against {opponentName} </p>}
{ finalPlayer  && finalPlayer === 'opponent_left_match' && opponentName &&
       <p className='text-xl font-semibold font-serif  text-black '>You WON !! opponent left match </p>}


  </div>


 
</div>

  
  )
}

export default App

