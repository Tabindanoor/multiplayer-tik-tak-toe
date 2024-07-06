// import './Waiting.css'
// const Waiting = () => {
//   return (
// <div> 
//   <div className='ripple-background'>
//       <div className='circle xxlarge shade1'></div>
//       <div className='circle xlarge shade2'></div>
//       <div className='circle large shade3'></div>
//       <div className='circle medium shade4'></div>
//       <div className='circle small shade5'></div>
//   </div>
//   <button className='bg-black text-white mx-auto '>Waiting for Opponent</button>
    

// </div>
   

//     // <>
//     // <div className='circle xxlarge  shade1'></div>
//     // <div className='circle xlarge shade2'></div>
//     // <div className='circle large shade3'></div>
//     // <div className='circle medium shade4'></div>
//     // <div className='circle small shade5'></div>
//     // </>
  

//   )
// }

// export default Waiting



import './Waiting.css';

const Waiting = () => {
  return (
    <div className="ripple-background">
      <div className="circle xxlarge shade1"></div>
      <div className="circle xlarge shade2"></div>
      <div className="circle large shade3"></div>
      <div className="circle medium shade4"></div>
      <div className="circle small shade5"></div>
      <p className="bg-black text-white waiting mx-auto p-2 border-2 rounded">Waiting for Opponent</p>
    </div>
  );
}

export default Waiting;
