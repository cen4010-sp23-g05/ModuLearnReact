import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { Link } from 'react-router-dom';

function ViewAssignment() {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("--:--");
  const [totalPoints, setTotalPoints] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const module_id = urlParams.get("module_id");

    fetch(`/test/module/get_info`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        module_id: module_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setDueDate("Due date: " + data.due_date);
        setTotalPoints("Total points: " + data.total_points.toString());
      })
      .catch((error) => console.error(error));

    fetch(`/test/module/get_content`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        module_id: module_id,
        module_type: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDescription(data.content);
      })
      .catch((error) => console.error(error));
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    return;
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav>
        <div className="navbar">
          <div className="navbar-left">
            <Link reloadDocument>Home</Link>
            <Link to="./student/schedule">Schedule</Link>
            <a href="#">Class</a>
            <Link to="./student/grades">Grades</Link>
          </div>
          <div className="navbar-right">
            <button
              onClick={() => (window.location.href = "../")}
              class="rounded m-1"
            >
              Log Out
            </button>
            <button className="rounded m-1">My Profile</button>
          </div>
        </div>
      </nav>

      <div style={{margin: "3vw"}}>
        <div>
          <h1>{title}</h1>
          <h2>{dueDate}</h2>
          <h2>{totalPoints}</h2>
        </div>
        <div>
          <p>{description}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ViewAssignment;
