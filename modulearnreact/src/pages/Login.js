import moduLearnLogo from './resources/moduLearnLogo.png'
import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import './styles/login.css'
import {Link, useNavigate} from "react-router-dom"

// LOCAL TESTING REMOVE LATER
const server_ip = "http://localhost:4000";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function StudentLogin() {
    Login("/student/login", (data) => {
      // switch to student home page
    });
  }

  function TeacherLogin() {
    Login("/teacher/login", (data) => {
      // switch to teacher home page
    });
  }

  function Login(userType, responseFunc) {
    useEffect(() => {
      fetch(server_ip + userType, {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
        .then(response => response.json())
        .then(data => {
          if (!data.bUsername) OnInvalidUsername();
          else if (!data.bPassword) OnInvalidPassword();
          else {
            localStorage.setItem('username', username);
            responseFunc(data);
          }
        })
        .catch(error => console.error(error))
      });
    });
  }

  const [failedUsername, setFailedUsername] = useState(false);
  // Display that the username was incorrect
  function OnInvalidUsername() {
    setFailedUsername(true);
  }
  const [failedPassword, setFailedPassword] = useState(false);
  // Display that the password was incorrect
  function OnInvalidPassword() {
    setFailedPassword(true);
    
  }

  return (
    <div id="mainBox">
      <div id="logo">
        <img className="mainTitle" src={moduLearnLogo} alt="ModuLearnLogo" />
      </div>

<div className="signUpContainer">
        <div id="signup">
        <div id="title">
          <h1>Teacher Log In</h1>
        </div>
          <div id="signup-form-div">
  <Form onClick={TeacherLogin} id="signup-form">
  <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
              <Form.Control id="signup-user-email" type="text" placeholder="Enter username" value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
              />
</Form.Group>
<Form.Group className="mb-3" >
  <Form.Label>Password</Form.Label>
   <Form.Control id= "signup-user-password"  type="password" placeholder="Password" value={password} 
                 onChange={(e) => { setPassword(e.target.value) }}/>
</Form.Group>
<Button  type="submit">Submit</Button>



<div id="signup-feedback"></div>
</Form>
<div className="alreadyHaveAccount">
<Link to="/registration">
<Button variant="primary">Don't have an account?</Button>   
</Link>             
</div>
</div>
</div>




<div id="signup">
        <div id="title">
          <h1>Student Log In</h1>
        </div>
          <div id="signup-form-div">
  <Form onClick={StudentLogin} id="signup-form">
  <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
              <Form.Control id="signup-user-email" type="text" placeholder="Enter username" value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
              />
</Form.Group>
<Form.Group className="mb-3" >
  <Form.Label>Password</Form.Label>
   <Form.Control id= "signup-user-password"  type="password" placeholder="Password" value={password} 
                 onChange={(e) => { setPassword(e.target.value) }}/>
</Form.Group>
<Button  type="submit">Submit</Button>


<div id="signup-feedback"></div>
</Form>
<div className="alreadyHaveAccount">
<Link to="/registration">
<Button variant="primary">Don't have an account?</Button>   
</Link>             
</div>
</div>
</div>
</div>
</div>
      

      //  <div className="error-message">
       // {failedUsername && <p style={{color: 'red'}}>The username was incorrect, please try again!</p>}
       // {failedPassword && <p style={{color: 'red'}}>The password was incorrect, please try again!</p>}
      //  </div>

  );
}

export default Login;
