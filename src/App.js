import React, {useRef, useState} from 'react';
import CanvasDraw from 'react-canvas-draw';
import 'firebase/firestore';
import 'firebase/auth';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useFirebaseApp, useUser } from 'reactfire';

function App() {
  const firebase = useFirebaseApp();
  const signature = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useUser();

  const handleClick = () =>{
    const data = signature.current.getSaveData();
    //data debe ser guardada en BD
    addSign(data);
  }

  const addSign = (data)=>{
    const date = new Date();
    firebase.firestore().collection(`${user.email}-signatures`).add({signature: data, date: date, user: user.email});
    clear();
  }

  const clear = ()=>{
    signature.current.clear();
  }

  const login = async ()=>{ 
    try{
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err){
      alert("Datos Invalidos");
    }
    
  }

  const register = async ()=>{ 
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  const logout = async ()=>{
    await firebase.auth().signOut();
  }

  return (
    <div>
      {
        !user &&
        <>
        <Container>
          <Row>
            <Col className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
              <h5 className="card-title text-center">Caring Transportation</h5>
                <div className="form-label-group">
                    <input type="email" id="email" className="form-control" placeholder="Email address" required autoFocus onChange={(ev)=> setEmail(ev.target.value)}/>
                    <label htmlFor="email">Email address</label>
                </div>

                <div className="form-label-group">
                    <input type="password" id="password" className="form-control" placeholder="Password" required onChange={(ev)=> setPassword(ev.target.value)}/>
                    <label htmlFor="password">Password</label>
                </div>
                <Button onClick={login} className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Login</Button>
                <hr className="my-4"></hr>
                <Button onClick={register} className="btn btn-lg btn-success btn-block text-uppercase" type="submit">Sign in</Button>
              </div>
            </div>
            </Col>
          </Row>
        </Container>
        </>
      }
      {
        user &&
        <>
        <CanvasDraw brushRadius={.3} ref={signature} canvasHeight={550}/> 
        <br/>
        <Row className="justify-content-xs-center">
          <Col xs={3} md={1}><Button variant="danger" size="lg" onClick={clear}>Delete</Button></Col>
          <Col xs={3} md={1}><Button variant="success" size="lg" onClick={handleClick}>Save</Button></Col>
          <Col xs={3} md={1}><Button variant="warning" size="lg" onClick={logout}>Logout</Button></Col>
        </Row>
        </>
      }
     
    </div>
  );
}

export default App;
