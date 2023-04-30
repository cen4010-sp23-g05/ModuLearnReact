import React, { useState } from 'react';

function CreateAssessment() {
  const [questions, setQuestions] = useState([{ question: '', answers: [], correctAnswers: [] }]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: [], correctAnswers: [] }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const addAnswer = (questionIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].answers.length < 9) {
      newQuestions[questionIndex].answers.push('');
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(questions); // or send data to server or do other processing
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <label>
              Question {questionIndex + 1}
              <input
                type="text"
                value={question.question}
                onChange={(event) => handleQuestionChange(event, questionIndex)}
              />
            </label>
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <label>
                  Answer {answerIndex + 1}
                  <input
                    type="text"
                    value={answer}
                    onChange={(event) => handleAnswerChange(event, questionIndex, answerIndex)}
                  />
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={question.correctAnswers.includes(answerIndex)}
                    onChange={(event) => handleCheckboxChange(event, questionIndex, answerIndex)}
                  />
                  Correct answer
                </label>
                <button
                  type="button"
                  onClick={() => removeAnswer(questionIndex, answerIndex)}
                  disabled={question.answers.length === 2}
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
    );
  }
  
  export default CreateAssessment;
  
