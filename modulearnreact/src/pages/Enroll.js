import React from 'react';

const Enroll = () => {
  return (
    <>
      <div style={{ display: 'inline-flex' }}>
        <p style={{ marginRight: '10px' }}>Code Register:</p>
        <input type="text" placeholder="Enter invite code" style={{ backgroundColor: 'whitesmoke', width: '200px' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
        <h1 style={{ marginBottom: '20px' }}>Enrolling in:</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ border: '2px solid black', padding: '10px', margin: '10px', display: 'inline-block', width: '600px' }}>
            <div style={{ border: '2px solid black', display: 'inline-block', width: 'fit-content' }}>calculus</div>
            <p style={{ float: 'right' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu quam odio. Aliquam euismod lacinia purus. Nulla facilisi.</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="button" onClick={() => window.location.href='./welcome.html'}>cancel</button>
            <button type="submit">join</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enroll;
