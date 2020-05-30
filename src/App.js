import React, {useRef} from 'react';
import CanvasDraw from 'react-canvas-draw';

function App() {

  const signature = useRef(null);
  const handleClick = () =>{
    const data = signature.current.getSaveData();
    //data debe ser guardada en BD
    
  }

  const clear = ()=>{
    signature.current.clear();
  }

  return (
    <div>
      <button onClick={handleClick}>Save</button>
      <button onClick={clear}>Clear</button>
      <CanvasDraw brushRadius={.3} ref={signature}/>
    </div>
  );
}

export default App;
