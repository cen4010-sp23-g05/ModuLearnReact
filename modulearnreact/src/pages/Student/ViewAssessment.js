import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { Link } from 'react-router-dom';

function ViewAssessment() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("--:--");
  const [totalPoints, setTotalPoints] = useState("");

  // add code to download info

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
        module_type: 2,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => console.error(error));
  });

  const handleAnswerChange = (event, questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    const selectedAnswers = newQuestions[questionIndex].selectedAnswers || [];

    if (event.target.checked) {
      selectedAnswers.push(answerIndex);
    } else {
      const index = selectedAnswers.indexOf(answerIndex);
      if (index !== -1) {
        selectedAnswers.splice(index, 1);
      }
    }

    newQuestions[questionIndex].selectedAnswers = selectedAnswers;
    setQuestions(newQuestions);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    console.log(questions);
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
            <button onClick={() => window.location.href = "../"} class="rounded m-1">Log Out</button>
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
          <form onSubmit={HandleSubmit}>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex}>
                <p>{question.question}</p>
                {question.answers.map((answer, answerIndex) => (
                  <div key={answerIndex}>
                    <label>
                      <input
                        type="checkbox"
                        checked={(question.selectedAnswers || []).includes(
                          answerIndex
                        )}
                        onChange={(event) =>
                          handleAnswerChange(event, questionIndex, answerIndex)
                        }
                      />
                      {answer}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button type="submit">Submit answers</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ViewAssessment;
