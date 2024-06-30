
import './App.css'
import { useState } from 'react';
import Square from './components/Square';
// import Square from './components'/Square';
function App() {

  const mySquare =[
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ]

  const [game,setGame]= useState(mySquare)  
  const [currentPlayer, setCurentPlayer]= useState("tick")
 
  return (
<div className="cursor-pointer ripple-background h-screen flex items-center justify-center">
  <div className="flex flex-col items-center">
    <div className="flex space-x-4 justify-between ">
      <div className=" px-4 py-2  w-28 h-12 bg-gray-500  border-white text-white rounded-lg ">You</div>
      <div className="px-4 py-2  w-28 h-12 bg-gray-500  border-white text-white rounded-lg  "> Opponent</div>
    </div>
    <p className='text-2xl m-3 font-semibold text-black bg-gray-800 bg-opacity-10 w-full p-3 rounded-lg'>Tic Tac Toe</p>
    <div className="max-w-sm flex flex-col items-center justify-center min-h-fit p-7 rounded-lg bg-white z-10 opacity-75 text-center">
      <div className="grid grid-cols-3 gap-4 bg-transparent">
        {game.map((arr) =>
          arr.map((e) => {
            return <Square 
                   key={e} 
                   id={e}  
                   setGame={setGame}
                   currentPlayer={currentPlayer}
                   setCurentPlayer={setCurentPlayer} />;
          })
        )}
      </div>
    </div>
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