import React, {useRef} from 'react';
import CanvasDraw from 'react-canvas-draw';
import firebase from './firebase';
import { Button, Container, Row, Col } from 'react-bootstrap';

function App() {
  const [signatures, setSignatures] = React.useState([]);

  React.useEffect(() =>{
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('signatures').get()
      setSignatures(data.docs.map(doc => doc.data()))
    }
    fetchData()
  }, [])
  const signature = useRef(null);
  const handleClick = () =>{
    const data = signature.current.getSaveData();
    //data debe ser guardada en BD
    addSign(data);
  }

  const addSign = (data)=>{
    const date = new Date();
    const db = firebase.firestore();
    db.collection('signatures').add({signature: data, date: date, user: 'Eduardo1590@gmail.com'});
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
