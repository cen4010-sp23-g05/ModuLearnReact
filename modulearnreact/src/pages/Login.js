import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';

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
    
      

    <div style={{ textAlign: "center" }} class="container">
      <h1 class="mt-5 mb-3">Welcome to ModuLearn</h1>
      <div>
        

        <div className="error-message">
        {failedUsername && <p style={{color: 'red'}}>The username was incorrect, please try again!</p>}
        {failedPassword && <p style={{color: 'red'}}>The password was incorrect, please try again!</p>}
        </div>
        <div class="row">
          <div class="col-sm-5"></div>


          <input type="text" id="username" name="username" placeholder="username" class="col-sm-2 text-center m-1" onChange={(e) => setUsername(e.target.value)}/>
          <div class="col-sm-5"></div>
        </div>
        <div class="row text-center">
          <div class="col-sm-5"></div>
          <input type="password" id="password" name="password" placeholder="password" class="col-sm-2 text-center m-1" onChange={(e) => setPassword(e.target.value)}/>
          <div class="col-sm-5"></div>
        </div>
        <div className="login-button">
        <button onClick={() => OnInvalidUsername() } class="rounded col m-1">Test Failed Username </button>
        <button onClick={() => OnInvalidPassword() } class="rounded col m-1">Test Failed Password  </button>
          <button onClick={() => StudentLogin() } class="rounded col m-1">Log In (Student)</button>
          
          
          <button onClick={() => TeacherLogin()} class="rounded col m-1">Log In (Teacher)</button>
          
          <div class="col-sm-4"></div>
        </div>
        <div className="register-button">
          <button type="button" onClick={() => window.location.href = "./registration"}  class="rounded m-1">Register Account</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
