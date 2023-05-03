import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

function CreateLesson() {
  const [textboxes, setTextboxes] = useState([]);
  const [title, setTitle] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const course_id = urlParams.get("course_id");

  const addTextbox = () => {
    setTextboxes([...textboxes, ""]);
  };

  const removeTextbox = (index) => {
    const newTextBoxes = [...textboxes];
    newTextBoxes.splice(index, 1);
    setTextboxes(newTextBoxes);
  };

  const handleChange = (event, index) => {
    const newTextBoxes = [...textboxes];
    newTextBoxes[index] = event.target.value;
    setTextboxes(newTextBoxes);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();

    return;

    useEffect(() => {
      fetch("/teacher/create_module", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: textboxes,
          course_id: course_id,
          module_type: 0,
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
        <form onSubmit={HandleSubmit}>
          <h1>
            Enter lesson title:
            <input
              type="text"
              value={title}
              style={{ marginLeft: "20px" }}
              onChange={(event) => setTitle(event.target.value)}
            />
          </h1>
          {textboxes.map((textbox, index) => (
            <div
              key={index}
              style={{
                margin: "1vw",
                width: "90vw",
              }}
            >
              <input
                type="text"
                value={textbox}
                onChange={(event) => handleChange(event, index)}
                style={{ width: "100%", minHeight: "70px" }}
              />
              <button type="button" onClick={() => removeTextbox(index)}>
                Delete
              </button>
            </div>
          ))}
          <div style={{ width: "90vw", height: "100px", margin: "auto" }}>
            <button type="button" onClick={addTextbox}>
              Add Textbox
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateLesson;
