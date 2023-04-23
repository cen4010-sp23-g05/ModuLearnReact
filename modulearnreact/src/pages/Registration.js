import React from 'react';

function Registration() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>registration</h1>
      <form>
        {/* using style display block so I can stack invite, username, password */}
        <div style={{ display: 'block' }}>
          <input type="text" id="invite" name="invite" placeholder="invite" />
        </div>
        <div style={{ display: 'block' }}>
          <input type="text" id="username" name="username" placeholder="username" />
        </div>
        <div style={{ display: 'block' }}>
          <input type="password" id="password" name="password" placeholder="password" />
        </div>
        <div>
          <select name="role">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div>
          <button type="button" onClick={() => window.location.href = './'}>cancel</button>
          <button type="submit" onClick={() => window.location.href = './'}>create</button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
