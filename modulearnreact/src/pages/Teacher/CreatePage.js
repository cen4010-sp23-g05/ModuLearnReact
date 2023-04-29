import React, { useState, useEffect } from "react";
import {useNavigate, useLocation} from "react-router-dom"


// LOCAL TESTING REMOVE LATER
const server_ip = "http://localhost:4000";

function CreateClass() {


  //These are set by editing the form fields, and the values should be sent to the sql db by invoking this function (by pressing a button).
  const [inviteCode, setInviteCode] = useState("");
  const [className, setClassName] = useState("");
  const [summary, setSummary] = useState("");  
  let navigate = useNavigate();

  function SubmitClass() {


    //Write code to submit the following to the sql db:
    //inviteCode, className, summary
    useEffect(() =>  { 
      // Send POST request to server 
      fetch(server_ip + '/teacher/create_course', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          inviteCode: inviteCode,
          course_title : className,
          summary   : summary, // !!! NOT STORED IN DB !!!
          teacher_id: localStorage.getItem('username')
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) OnValidInviteCode();
          else OnDuplicateInviteCode();
        })
        .catch(error => console.error(error))
      });
    });
  
  } 

  // Add code which brings user to next page
  function OnValidInviteCode() {
    navigate('/teacher');
    //navigate("/inviteCodePage", {state:{inviteCode}});

  }
  
  const [failedCode, setFailedCode] = useState(false);

  // Add code which tells user to make a different invite code
  function OnDuplicateInviteCode() {
    setFailedCode(true);
  }

  return (
    <>
      <div className="container-fluid">
      <button className="rounded m-1 bg-danger" type="button" onClick={OnValidInviteCode}>OnValidInviteCode</button>
      <button className="rounded m-1 bg-danger" type="button" onClick={OnDuplicateInviteCode}>InvalidCode</button>

        <h1 className="m-4"style={{textAlign: 'center'}}>Creation of class</h1>
        <div className="identity " id="identity" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <div className="error-message">
        {failedCode && <p style={{color: 'red'}}>This code is invalid. Please use a different code.</p>}        </div>
          <input type="text" className="rounded" placeholder="Your Invite Code"style={{backgroundColor: 'whitesmoke', width: '200px'}} onChange={(e) => setInviteCode(e.target.value)} /> <br/>
          <input type="text" className="rounded" placeholder="New Class Name" style={{backgroundColor: 'whitesmoke', width: '200px'}} onChange={(e) => setClassName(e.target.value)} />
        </div>
        <div className="summary" id="summary" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h3 className="m-3">Class summary:</h3>
          <textarea className="rounded"style={{backgroundColor: 'whitesmoke', width: '500px', height: '200px', border: '1px solid #000', padding: '10px', resize: 'none'}} onChange={(e) => setSummary(e.target.value)}></textarea>
        </div>
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <button className="rounded m-1 bg-danger" type="button" onClick={() => window.location.href='./welcome.html'}>cancel</button>
          <button className="rounded m-1" type="submit" onClick={() => SubmitClass()}>create</button>
        </div>
      </div>
    </>
  );
}



export default CreateClass;
