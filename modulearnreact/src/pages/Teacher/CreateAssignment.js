import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

function CreateAssignment() {
  const [description, setDescription] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const course_id = urlParams.get("course_id");

  const HandleSubmit = (event) => {
    event.preventDefault();
    // do something with the description
    console.log(description);

    useEffect(() => {
      fetch("/teacher/create_module", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: description,
          course_id: course_id,
          module_type: 1,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.error(error)),
      });
    });
  };

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

      <div style={{ margin: "3vw" }}>
        <h1>Create Assignment</h1>
        <form onSubmit={HandleSubmit}>
          <h1>
            Enter assignment title:
            <input
              type="text"
              value={title}
              style={{ marginLeft: "20px" }}
              onChange={(event) => setTitle(event.target.value)}
            />
          </h1>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
}

export default CreateAssignment;
