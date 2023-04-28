import React, { useState, useEffect } from "react";


function CreateClass() {


  //These are set by editing the form fields, and the values should be sent to the sql db by invoking this function (by pressing a button).
  const [inviteCode, setInviteCode] = useState("");
  const [className, setClassName] = useState("");
  const [summary, setSummary] = useState("");  

  function submitClass() {

    console.log(inviteCode);
    
    //Write code to submit the following to the sql db:
    //inviteCode, className, summary

  
  } 

  return (
    <>
      
      <h1 style={{textAlign: 'center'}}>Creation of class</h1>
      <div className="identity" id="identity" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <input type="text" placeholder="Your Invite Code"style={{backgroundColor: 'whitesmoke', width: '200px'}} onChange={(e) => setInviteCode(e.target.value)} /> <br/><br/>
        <input type="text" placeholder="New Class Name" style={{backgroundColor: 'whitesmoke', width: '200px'}} onChange={(e) => setClassName(e.target.value)} />
      </div>
      <div className="summary" id="summary" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h3>Class summary:</h3>
        <textarea style={{backgroundColor: 'whitesmoke', width: '500px', height: '200px', border: '1px solid #000', padding: '10px', resize: 'none'}} onChange={(e) => setSummary(e.target.value)}></textarea>
      </div>
      <div style={{textAlign: 'center', marginTop: '20px'}}>
        <button type="button" onClick={() => window.location.href='./welcome.html'}>cancel</button>
        <button type="submit" onClick={() => submitClass()}>create</button>
      </div>
    </>
  );
}



export default CreateClass;
