import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./styles/home.css";

const server_ip = "http://localhost:4000"

function Home() {
  //Get list of classes from the backend given a student id
  fetch(server_ip + "/get_test")
    .then(response => response.json())
    .then(data => {

    })
    .catch(error => console.error(error));

  return (
    <>
      {/* Navigation Bar */}
      <nav>
        <div className="navbar">
          <div className="navbar-left">
            <Link reloadDocument>Home</Link>
            <Link to="./schedule">Schedule</Link>
            <a href="#">Class</a>
            <Link to="./grades">Grades</Link>
          </div>
          <div className="navbar-right">
            <button>Log Out</button>
            <button>My Profile</button>
          </div>
        </div>
      </nav>

      {/* User Information */}
      <div className="profile-container">
        <div className="profile-pic"></div>
        <div className="welcome-message">
          <h3>Welcome back, John Doe</h3>
        </div>
      </div>

      {/* Class Boxes */}
      <div className="classes-container">
        <div className="class">
          <h3>Calculus 2</h3>
          <div style={{ border: "2px solid black", padding: "10px", height: "80px", width: "100%" }}>

          </div>
        </div>
        <div className="class">
          <h3>Physics 1</h3>
          <div style={{ border: "2px solid black", padding: "10px", height: "80px", width: "100%" }}>
          </div>
        </div>
        <div className="class">
          <h3>Introduction to Psychology</h3>
          <div style={{ border: "2px solid black", padding: "10px", height: "80px", width: "100%" }}>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
