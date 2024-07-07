import './Waiting.css';

const Waiting = () => {
  return (
    <div className="ripple-background h-screen">
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
