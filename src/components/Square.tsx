import { useState } from "react"

const Square = ({id,setGame,currentPlayer,setCurentPlayer,finalPlayer,setFinalPlayer,state}) => {

  const [icon, setIcon]= useState(null)

  const cross = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-24 my-auto flex text-white text-center mx-auto">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>)


const tick =(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 flex my-auto text-white text-center mx-auto">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>)

const squareClick=()=>{

  if(finalPlayer){
    return;
  }


    if(!icon){
      if(currentPlayer==='tick'){
        setIcon(tick)
      }
      else
      {
        setIcon(cross)
      }
      const myCurrentPlayer = currentPlayer;
      // console.log(myCurrentPlayer);
     
      setCurentPlayer(currentPlayer === 'tick'?'cross':'tick')
      setGame(prevState=>{
        let newState = [...prevState]
        const rowIndex = Math.floor(id/3);
        const columnIndex = id%3;
        newState[rowIndex][columnIndex]=myCurrentPlayer;
        // console.log(newState);
        return newState;

      }
      )
      // console.log(id)
    }

}


// console.log(state.includes(id),"state");

  return (
    <div onClick={squareClick}
     className={`w-24 h-24 bg-black 
       rounded-lg cursor-pointer text-center
        ${finalPlayer ? 'cursor-not-allowed':"cursor-pointer"}
        ${state.includes(id) ? (finalPlayer === 'tick' ? 'bg-green-700' : finalPlayer === 'cross' ? 'bg-pink-500' : '') : ""}

     `} >{icon}</div>
  )
}

export default Square

