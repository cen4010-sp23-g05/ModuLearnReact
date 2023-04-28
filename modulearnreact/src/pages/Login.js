import React from "react";

function Login() {
  return (
    
      

    <div style={{ textAlign: "center" }} class="container">
      <h1 class="mt-5 mb-3">Welcome to ModuLearn</h1>
      <div>
        

        
        <div class="row">
          <div class="col-sm-5"></div>


          <input type="text" id="username" name="username" placeholder="username" class="col-sm-2 text-center m-1"/>
          <div class="col-sm-5"></div>
        </div>
        <div class="row text-center">
          <div class="col-sm-5"></div>
          <input type="password" id="password" name="password" placeholder="password" class="col-sm-2 text-center m-1"/>
          <div class="col-sm-5"></div>
        </div>
        <div className="login-button">
          
          <button onClick={() => window.location.href = "./student" } class="rounded col m-1">Log In (Student)</button>
          
          
          <button onClick={() => window.location.href = "./teacher"} class="rounded col m-1">Log In (Teacher)</button>
          
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
