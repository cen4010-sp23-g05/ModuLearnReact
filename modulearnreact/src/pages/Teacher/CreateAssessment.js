import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

function CreateAssessment() {
  const [questions, setQuestions] = useState([
    { question: "", answers: [], correctAnswers: [] },
  ]);
  const [title, setTitle] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const course_id = urlParams.get("course_id");

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", answers: [], correctAnswers: [] },
    ]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const addAnswer = (questionIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].answers.length < 9) {
      newQuestions[questionIndex].answers.push("");
      setQuestions(newQuestions);
    }
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (event, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (event, questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCheckboxChange = (event, questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    const correctAnswers = newQuestions[questionIndex].correctAnswers;

    if (event.target.checked) {
      correctAnswers.push(answerIndex);
    } else {
      const index = correctAnswers.indexOf(answerIndex);
      if (index !== -1) {
        correctAnswers.splice(index, 1);
      }
    }

    setQuestions(newQuestions);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    console.log(questions); // or send data to server or do other processing

    useEffect(() => {
      fetch("/teacher/create_module", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: questions,
          course_id: course_id,
          module_type: 2,
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
            Enter assessment title:
            <input
              type="text"
              value={title}
              style={{ marginLeft: "20px" }}
              onChange={(event) => setTitle(event.target.value)}
            />
          </h1>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>
                Question {questionIndex + 1}
                <input
                  type="text"
                  value={question.question}
                  style={{ marginLeft: "6px" }}
                  onChange={(event) =>
                    handleQuestionChange(event, questionIndex)
                  }
                />
              </label>
              {question.answers.map((answer, answerIndex) => (
                <div key={answerIndex} style={{ marginBottom: "5px" }}>
                  <label>
                    Answer {answerIndex + 1}
                    <input
                      type="text"
                      value={answer}
                      style={{ marginLeft: "20px" }}
                      onChange={(event) =>
                        handleAnswerChange(event, questionIndex, answerIndex)
                      }
                    />
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={question.correctAnswers.includes(answerIndex)}
                      onChange={(event) =>
                        handleCheckboxChange(event, questionIndex, answerIndex)
                      }
                    />
                    Correct answer
                  </label>
                  <button
                    type="button"
                    onClick={() => removeAnswer(questionIndex, answerIndex)}
                    disabled={question.answers.length === 2}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete answer
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addAnswer(questionIndex)}
                disabled={question.answers.length === 9}
              >
                Add answer
              </button>
              <button
                type="button"
                onClick={() => removeQuestion(questionIndex)}
                disabled={questions.length === 1}
                style={{ marginLeft: "10px" }}
              >
                Delete question
              </button>
            </div>
          ))}
          <button type="button" onClick={addQuestion}>
            Add question
          </button>
          <button type="submit">Submit assessment</button>
        </form>
      </div>
    </>
  );
}

export default CreateAssessment;
