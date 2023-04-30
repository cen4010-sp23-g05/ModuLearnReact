import React, { useState } from 'react';
import CreateAssessment from '../Teacher/CreateAssessment';

function ViewAssessment() {
  const [questions, setQuestions] = useState([]);

    // add code to download info

  const loadSample = () => {
    setQuestions([
      {
        question: 'What is the capital of France?',
        answers: ['Paris', 'London', 'Berlin'],
        correctAnswers: [0],
      },
      {
        question: 'What is the largest planet in our solar system?',
        answers: ['Mars', 'Jupiter', 'Saturn'],
        correctAnswers: [1],
      },
      {
        question: 'Who invented the telephone?',
        answers: ['Alexander Graham Bell', 'Thomas Edison', 'Nikola Tesla'],
        correctAnswers: [0],
      },
    ]);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(questions); // or send data to server or do other processing
  };

  return (
    <div>
      <button type="button" onClick={loadSample}>
        Load sample assessment
      </button>
      <form onSubmit={handleSubmit}>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <p>{question.question}</p>
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <label>
                  <input
                    type="checkbox"
                    checked={(question.selectedAnswers || []).includes(answerIndex)}
                    onChange={(event) => handleAnswerChange(event, questionIndex, answerIndex)}
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
  );
}

export default ViewAssessment;
