import React, { useState, useEffect } from "react";

const server_ip = "http://localhost:4000";

function Registration() {
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
      fetch(server_ip + '/' + userType + '/create', {
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

  // !!!
  // ADD FIRST NAME, LAST NAME BOXES
  // !!!
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>registration</h1>
      <form>
        {/* using style display block so I can stack invite, username, password */}
        <div style={{ display: 'block' }}>
          <input type="text" id="invite" name="invite" placeholder="invite" />
        </div>
        <div style={{ display: 'block' }}>
          <input type="text" id="username" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div style={{ display: 'block' }}>
          <input type="password" id="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <select name="role" onChange={(e) => setUserType(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div>
          <button type="button" onClick={() => window.location.href = './'}>cancel</button>
          <button type="button" onClick={Submit}>create</button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
