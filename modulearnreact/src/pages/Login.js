import React from "react";

function Login() {
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
          <button type="submit" onClick={() => window.location.href = "./"}>Log In (Student)</button>
          <button type="submit" onClick={() => window.location.href = "./home_teacher"}>Log In (Teacher)</button>
        </div>
        <div className="register-button">
          <button type="button" onClick={() => window.location.href = "./registration"}>Register Account</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
