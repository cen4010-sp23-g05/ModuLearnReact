import React, { useState, useEffect } from "react";

function ViewAssessment() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("--:--");
  const [totalPoints, setTotalPoints] = useState("");

  // add code to download info
  const urlParams = new URLSearchParams(window.location.search);
  const module_id = urlParams.get("module_id");

  useEffect(() => {
    fetch(`/module/get_info/${module_id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.tile);
        setDueDate(data.due_date);
        setTotalPoints(data.total_points);
      })
      .catch((error) => console.error(error));

    fetch(`/module/get_content/${module_id}`)
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
    <div>
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
  );
}

export default ViewAssessment;
