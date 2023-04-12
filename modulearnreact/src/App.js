import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState('');
  let textEdited = 0;

  function handleButtonClick(event) {
    const url = event.target.value;
    fetch(url)
      .then(response => response.json())
      .then(data => setResponse(JSON.stringify(data)))
      .catch(error => console.error(error));
  }

  function getGrades() {
    setResponse(JSON.stringify(
      {
        "grade_cell":[
          {"student_id" : 0, "gradebook_id": 0, "module_id": 0, "total_points": 100, "earned_points": 100},
          {"student_id" : 1, "gradebook_id": 0, "module_id": 0, "total_points": 100, "earned_points": 100},
          {"student_id" : 2, "gradebook_id": 0, "module_id": 0, "total_points": 100, "earned_points": 90},
          {"student_id" : 0, "gradebook_id": 0, "module_id": 1, "total_points": 100, "earned_points": 70}
        ]
      }
    ));
  }

  function getStudents() {
    if (textEdited !== 0) {
      setResponse(JSON.stringify(
        {
          "student":[
            {"student_id" : 0, "username" : "BBRATT", "first_name" : "Balthazar", "last_name" : "Bratt"},
            {"student_id" : 1, "username" : "MthBstrz", "first_name" : "Jamie", "last_name" : "Hineman"},
            {"student_id" : 2, "username" : "TheBlubb", "first_name" : "Aproctoflecticus", "last_name" : "Blubberman"},
            {"student_id" : 2, "username" : "NewStudent", "first_name" : "Me", "last_name" : "Person"}
          ]
        }
      ))
      return;
    }

    setResponse(JSON.stringify(
      {
        "student":[
          {"student_id" : 0, "username" : "BBRATT", "first_name" : "Balthazar", "last_name" : "Bratt"},
          {"student_id" : 1, "username" : "MthBstrz", "first_name" : "Jamie", "last_name" : "Hineman"},
          {"student_id" : 2, "username" : "TheBlubb", "first_name" : "Aproctoflecticus", "last_name" : "Blubberman"},
        ]
      }
    ))
  }

  function getTeachers() {
    setResponse(JSON.stringify(
      {
        "teacher":[
          {"teacher_id" : 0, "username" : "cheesey_bratt", "first_name" : "Cheesey", "last_name" : "Bratt"},
          {"teacher_id" : 1, "username" : "xxKxx", "first_name" : "Jason", "last_name" : "Kei"},
          {"teacher_id" : 2, "username" : "NotFamilyGuy", "first_name" : "Marge", "last_name" : "Simpson"},
        ]
      }
    ))
  }

  function getModules() {
    setResponse(JSON.stringify({
      "module":[
        {"module_id" : 0, "course_id" : 0, "module_type" : 0, "title" : "Lesson 1", "due_date" : "2023-12-10T23:59:00.000Z"},
        {"module_id" : 1, "course_id" : 0, "module_type" : 1, "title" : "Assignment 1", "due_date" : "2023-12-11T23:59:00.000Z"},
        {"module_id" : 2, "course_id" : 0, "module_type" : 2, "title" : "Assessment 1", "due_date" : "2023-12-12T23:59:00.000Z"},
        {"module_id" : 3, "course_id" : 1, "module_type" : 0, "title" : "Lesson 1", "due_date" : "2023-12-08T23:59:00.000Z"}
      ]
    }));
  }

  function getLessons() {
    setResponse(JSON.stringify({
      "module":[
        {"module_id" : 0, "course_id" : 0, "module_type" : 0, "title" : "Lesson 1", "due_date" : "2023-12-10T23:59:00.000Z"}
      ]
    }));
  }

  function getAssignments() {
    setResponse(JSON.stringify({
      "module":[
        {"module_id" : 1, "course_id" : 0, "module_type" : 1, "title" : "Assignment 1", "due_date" : "2023-12-11T23:59:00.000Z"}
      ]
    }));
  }

  function getAssessments() {
    setResponse(JSON.stringify({
      "module":[
        {"module_id" : 2, "course_id" : 0, "module_type" : 2, "title" : "Assessment 1", "due_date" : "2023-12-12T23:59:00.000Z"}
      ]
    }));
  }

  function handleChange(event) {
    textEdited += 1;
    console.log(textEdited);
  }

  return (
    <div>
      <div>
        <button onClick={getGrades}>GET /grades</button>
        <button onClick={handleButtonClick} value="/grades" method="POST">POST /grades</button>
        <button onClick={getStudents}>GET /students/:id</button>
        <button onClick={handleButtonClick} value="/students" method="POST">POST /students</button>
        <button onClick={handleButtonClick} value="/students/123" method="PUT">PUT /students/:id</button>
        <button onClick={getTeachers} value="/teachers/123">GET /teachers/:id</button>
        <button onClick={handleButtonClick} value="/teachers" method="POST">POST /teachers</button>
        <button onClick={handleButtonClick} value="/teachers/123" method="PUT">PUT /teachers/:id</button>
        <button onClick={handleButtonClick} value="/courses">GET /courses</button>
        <button onClick={handleButtonClick} value="/courses/123">GET /courses/:id</button>
        <button onClick={handleButtonClick} value="/courses" method="POST">POST /courses</button>
      <button onClick={handleButtonClick} value="/courses/123" method="PUT">PUT /courses/:id</button>
      <button onClick={getModules}>GET /modules/:id</button>
      <button onClick={handleButtonClick} value="/modules" method="POST">POST /modules</button>
      <button onClick={handleButtonClick} value="/modules/123" method="PUT">PUT /modules/:id</button>
      <button onClick={getAssignments}>GET /assignments/:id</button>
      <button onClick={getAssessments}>GET /assessments/:id</button>
      <button onClick={getLessons}>GET /lessons/:id</button>
      </div>
      <div>
        <h2>Input </h2>
        <input type='text' onChange={handleChange}></input>
      </div>
      <div>
        <h2>Output</h2>
        {response}
      </div>
    </div>
  );
}

export default App;
