import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./styles/home.css";

const server_ip = "http://localhost:4000"

function Home() {
  const [classes, set_classes] = useState([]);
  const [modules, set_modules] = useState([]);

  useEffect(() =>  {
    fetch(server_ip + "/test/student/courses")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        set_classes(data);
      })
      .catch(error => console.error(error));

    fetch(server_ip + "/test/student/get_modules")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        set_modules(data);
      })
      .catch(error => console.error(error));
  }, []);

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
            <button onClick={() => window.location.href = "./login"}>Log Out</button>
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
        {classes.map(course => {
          return (<div key={course.id} style={{width:"95vw"}}>
            <h3>{course.title}</h3>
            <div id={course.id} style={{ border: "2px solid black", padding: "10px", marginBottom:"10px", height: "80px", width: "100%", display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"baseline"}}>
              {modules.map(module => {
                if (module.course_id != course.id) return;
                return (<div key={module.id} style={{ width:"15vw", height:"100%", border:"1px solid black", margin:"1px", paddingRight: "10px"}}>
                  <div>{module.title}</div>
                </div>)
              })}
            </div>
          </div>)
        })}
      </div>
    </>
  );
}

export default Home;
