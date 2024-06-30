import { useState } from "react"

const Square = ({id,setGame,currentPlayer,setCurentPlayer}) => {
  const cross = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>)


const tick =(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>)

const squareClick=()=>{
    if(!icon){
      if(currentPlayer==='tick'){
        setIcon(tick)
      }
      else
      {
        setIcon(cross)
      }
      setCurentPlayer(currentPlayer === 'tick'?'cross':'tick')
    }
}

const [icon, setIcon]= useState(null)
  return (
    <div onClick={squareClick} className="w-24 h-24 bg-black opacity-50 rounded-lg cursor-pointer">{icon}</div>
  )
}

export default Square