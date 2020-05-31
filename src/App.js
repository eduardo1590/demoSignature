import React, {useRef} from 'react';
import CanvasDraw from 'react-canvas-draw';
import 'firebase/firestore';
import { Button, Row, Col } from 'react-bootstrap';
import { useFirebaseApp } from 'reactfire';

function App() {
  const fb = useFirebaseApp();
  const signature = useRef(null);
  const handleClick = () =>{
    const data = signature.current.getSaveData();
    //data debe ser guardada en BD
    addSign(data);
  }

  const addSign = (data)=>{
    const date = new Date();
    fb.firestore().collection('signatures').add({signature: data, date: date, user: 'Eduardo1590@gmail.com'});
    clear();
  }

  const clear = ()=>{
    signature.current.clear();
  }

  return (
    <div> 
      <CanvasDraw brushRadius={.3} ref={signature} canvasHeight={550}/> 
      <br/>
      <Row className="justify-content-xs-center">
        <Col xs={3} md={1}><Button variant="danger" size="lg" onClick={clear}>Delete</Button></Col>
        <Col xs={3} md={1}><Button variant="success" size="lg" onClick={handleClick}>Save</Button></Col>
      </Row>
     
    </div>
  );
}

export default App;
