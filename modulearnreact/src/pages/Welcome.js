import React from "react";
function Welcome() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to ModuLearn</h1>
      <form>
        <div>
          <input type="text" id="username" name="username" placeholder="username" />
        </div>
        <div>
          <input type="password" id="password" name="password" placeholder="password" />
        </div>
        <div className="login-button">
          <button type="submit">Log In (Student)</button>
          <button type="submit">Log In (Teacher)</button>
        </div>
        <div className="register-button">
          <button type="button" onClick={() => window.location.href = "./schedule"}>Register Account</button>
        </div>
      </form>
    </div>
  );
}

export default Welcome;
