import React from 'react';


function CreateClass() {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>Creation of class</h1>
      <div className="identity" id="identity" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <input type="text" placeholder="Your Invite Code" style={{backgroundColor: 'whitesmoke', width: '200px'}} /> <br/><br/>
        <input type="text" placeholder="New Class Name" style={{backgroundColor: 'whitesmoke', width: '200px'}} />
      </div>
      <div className="summary" id="summary" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h3>Class summary:</h3>
        <textarea style={{backgroundColor: 'whitesmoke', width: '500px', height: '200px', border: '1px solid #000', padding: '10px', resize: 'none'}}></textarea>
      </div>
      <div style={{textAlign: 'center', marginTop: '20px'}}>
        <button type="button" onClick={() => window.location.href='./welcome.html'}>cancel</button>
        <button type="submit">create</button>
      </div>
    </>
  );
}

export default CreateClass;
