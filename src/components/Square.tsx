// import { useState } from "react"


// const cross = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-24 my-auto flex text-white text-center mx-auto">
//   <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
// </svg>)


// const tick =(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 flex my-auto text-white text-center mx-auto">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
// </svg>)


// const Square = ({currentElement,
//                  id,
//                 setGame,
//                 currentPlayer,
//                 setCurentPlayer,
//                 finalPlayer,
//                 setFinalPlayer,
//                 state,
//                 socketState,
//                 game}) => {

//   const [icon, setIcon]= useState(null)

  

// const squareClick=()=>{

//   if(finalPlayer){
//     return;
//   }


//     if(!icon){
//       if(currentPlayer==='tick'){
//         setIcon(tick)
//       }
//       else
//       {
//         setIcon(cross)
//       }
//       const myCurrentPlayer = currentPlayer;  
//         socketState.emit('playerMoveFromClient',{
//           state:{
//             id,
//             sign: myCurrentPlayer,
//           }
//         })
//       setCurentPlayer(currentPlayer === 'tick'?'cross':'tick')

//       setGame(prevState=>{
//         let newState = [...prevState]
//         const rowIndex = Math.floor(id/3);
//         const columnIndex = id%3;
//         newState[rowIndex][columnIndex]=myCurrentPlayer;
//         // console.log(newState);
//         return newState;

//       }
//       )
//       // console.log(id)
//     }

// }



//   return (
//     <div onClick={squareClick}
//      className={`w-24 h-24 bg-black 
//        rounded-lg cursor-pointer text-center
//         ${finalPlayer ? 'cursor-not-allowed':"cursor-pointer"}
       
//          ${state.includes(id) ? finalPlayer +"bg-green-700" : ''}

//      `} >{currentElement === 'tick'
//       ?  tick 
//       : currentElement === 'cross' 
//       ? cross 
//       : icon}</div>
//   )
// }

// export default Square


// ${state.includes(id) ? (finalPlayer === 'tick' ? 'bg-green-700' : finalPlayer === 'cross' ? 'bg-pink-500' : '') : ""}


// import { useEffect, useState } from 'react';

// const cross = (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-24 my-auto flex text-white text-center mx-auto">
//     <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//   </svg>
// );

// const tick = (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 flex my-auto text-white text-center mx-auto">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//   </svg>
// );

// const Square = ({
//   currentElement,
//   id,
//   setGame,
//   currentPlayer,
//   setCurentPlayer,
//   finalPlayer,
//   setFinalPlayer,
//   state,
//   socketState,
//   game
// }) => {
//   const [icon, setIcon] = useState(null);

//   useEffect(() => {
//     if (currentElement === 'tick') {
//       setIcon(tick);
//     } else if (currentElement === 'cross') {
//       setIcon(cross);
//     }
//   }, [currentElement]);

//   const squareClick = () => {
//     if (finalPlayer) {
//       return;
//     }

//     if (!icon) {
//       const myCurrentPlayer = currentPlayer;
//       if (currentPlayer === 'tick') {
//         setIcon(tick);
//       } else {
//         setIcon(cross);
//       }

//       socketState.emit('playerMoveFromClient', {
//         state: {
//           id,
//           sign: myCurrentPlayer,
//         }
//       });

//       setCurentPlayer(currentPlayer === 'tick' ? 'cross' : 'tick');

//       setGame((prevState) => {
//         let newState = [...prevState];
//         const rowIndex = Math.floor(id / 3);
//         const columnIndex = id % 3;
//         newState[rowIndex][columnIndex] = myCurrentPlayer;
//         return newState;
//       });
//     }
//   };

//   return (
//     <div
//       onClick={squareClick}
//       className={`w-24 h-24 bg-black 
//         rounded-lg cursor-pointer text-center
//         ${finalPlayer ? 'cursor-not-allowed' : "cursor-pointer"}
//         ${state.includes(id) ? finalPlayer + " bg-green-700" : ''}
//       `}
//     >
//       {icon}
//     </div>
//   );
// };

// export default Square;



import { useState } from "react"


const cross = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-24 my-auto flex text-white text-center mx-auto">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>)


const tick =(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 flex my-auto text-white text-center mx-auto">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>)


const Square = ({
                currentElement,
                id,
                setGame,
                currentPlayer,
                setCurentPlayer,
                finalPlayer,
                setFinalPlayer,
                state,
                socketState,
                game,
                playingAs}) => {

  const [icon, setIcon]= useState(null)


const squareClick=()=>{

  if(playingAs !== currentPlayer){
    return;
  }

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
        socketState.emit('playerMoveFromClient',{
          state:{
            id,
            sign: myCurrentPlayer,
          }
        })
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



  return (
    // <div onClick={squareClick}
    //  className={w-24 h-24 bg-black 
    //    rounded-lg cursor-pointer text-center
    //     ${finalPlayer ? 'cursor-not-allowed':"cursor-pointer"}
       
    //      ${state.includes(id) ? finalPlayer +"bg-green-700" : ''}

    //  } >
    //   {currentElement === 'tick'?  tick : currentElement === 'cross' ? cross  : icon}
    //   </div>

    <div
      onClick={squareClick}
      className={`w-24 h-24 bg-black 
        rounded-lg cursor-pointer text-center
        ${finalPlayer ? 'cursor-not-allowed' : "cursor-pointer"}
        ${currentPlayer !== playingAs ? "cursor-not-allowed":""}
        ${finalPlayer  && finalPlayer !== playingAs ? "bg-gray-500":""}
        ${state.includes(id) ? finalPlayer + " bg-green-700" : ''}
  
      `}
    >
      {/* {icon} */}
       {currentElement === 'tick'?  tick : currentElement === 'cross' ? cross  : icon}

    </div>
  )
}

export default Square

