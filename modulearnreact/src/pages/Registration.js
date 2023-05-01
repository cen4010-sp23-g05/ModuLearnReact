import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import './styles/register.css'
import {Link, useNavigate} from "react-router-dom"
import moduLearnLogo from './resources/moduLearnLogo.png'

function Registration() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  function Submit() {
    // Go to login page
    Register((data) => {
      
    });
  }

  function Register(responseFunc) {
    useEffect(() => {
      fetch('/' + userType + '/create', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
          first_name: "",
          last_name: ""
        })
        .then(response => response.json())
        .then(data => {
          if (!data.bUsername) OnInvalidUsername();
          else {
            responseFunc(data);
          }
        })
        .catch(error => console.error(error))
      });
    });
  }

  function OnInvalidUsername() {

  }

  // !!!
  // ADD FIRST NAME, LAST NAME BOXES
  // !!!
  return (
    <div id="mainBox">
      <div id="logo">
        <img className="mainTitle" src={moduLearnLogo} alt="ModuLearnLogo" />
      </div>

        <div id="signup">
        <div id="title">
          <h1>Register for Free</h1>
        </div>
          <div id="signup-form-div">
  <Form onSubmit={Submit} id="signup-form">
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

<Form.Group className="mb-3" >
  <Form.Label>Account Type</Form.Label>
<Form.Select 
id= "signup-user-password"  value={userType}
onChange={(e) => { setUserType(e.target.value) }} 
aria-label="Default select example">
      <option selected disabled value>Select an option</option>
      <option value="student">Student</option>
      <option value="teacher">Teacher</option>
    </Form.Select>
</Form.Group>

<Button  type="submit">Submit</Button>

<div id="signup-feedback"></div>
</Form>
<div className="alreadyHaveAccount">
<Link to="/Login">
<Button variant="primary">Already have an account?</Button>   
</Link>             
</div>
</div>
</div>


</div>
  );
}

export default Registration;
