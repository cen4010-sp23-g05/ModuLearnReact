import React from "react";
import { Link } from 'react-router-dom';
import "../styles/home.css";
import { useState, useEffect } from "react";

function HomeTeacher() {

  const [ownedClasses, setOwnedClasses] = useState([]);
  const [userName, setUserName] = useState("");
  //const [userProfileImage, setUserProfileImage] = //useState...?
  // ^ what data type would an image stored in an sql database be?

  useEffect( () => {

    //fetch classes owned by a teacher from sql db, assign it to ownedClasses
    //Ideally that data would be an array that has as its elements classes,
    // and each class should have a name, and an array of assignments (this does not cover every single field that the class has).



    //fetch data of logged in user, assign the fields to userName, userProfileImage
    // Note that userProfileImage's useState has not been set up correctly yet.



  });

  return (
    <>
      {/* Navigation Bar */}
      <nav>
        <div className="navbar">
          <div className="navbar-left">
            <Link reloadDocument>Home</Link>
            <Link to="./schedule">Schedule</Link>
            <a href="#">Class</a>
            <a href="#">Grades</a>
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
          <h3>Welcome back, {userName}</h3>
        </div>
      </div>

      {/*

      <div className="profile-container">
        <div className="profile-pic"></div>
        <div className="welcome-message">
          <h3>Welcome back, John Doe</h3>
        </div>
      </div>

      */}

      {/* Class Boxes */}



      <div className="classes-container">
        {/* use map on array of classes */}
        {ownedClasses.map((ownedClass) => (
          <div ClassName="class">
            <h3>{ownedClass.name}</h3>
            <div style={{ border: "2px solid black", padding: "10px", height: "80px", width: "100%" }}>


            {/* use map on array of assignments of a class */}
            {ownedClass.assignments.map((assignment) => (

              <div style={{ border: "2px solid black", padding: "10px", height: "60px", width: "100%" }}>

                <h2>assignment.name</h2>
                <p>due: {assignment.dueDate}</p>
                <p>{assignment.summary}</p>

              </div>

            ))}

            </div>
          </div>        

        ))}

        {/* 

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

        */}

      </div>
    </>
  );
}

export default HomeTeacher;