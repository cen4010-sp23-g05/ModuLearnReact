import React from "react";
import { Link } from 'react-router-dom';
import "./styles/gradespage.css";
import {Button} from 'react-bootstrap';

function GradesPage() {
  return (
    <>
      {/* Navigation Bar */}
      <nav>
        <div className="navbar">
          <div className="navbar-left">
            <Link to="/">Home</Link>
            <Link to="/schedule">Schedule</Link>
            <a href="#">Class</a>
            <Link to="/grades">Grades</Link>
          </div>
          <div className="navbar-right">
            <button>Log Out</button>
            <button>My Profile</button>
          </div>
        </div>
      </nav>

      {/* User Information */}
      <div className="studentPage">

<div className="studentPageLeftSide">

    <div className="studentPageLeftTopContent">

<div className="studentPageLeftTopContentImage" >
<img className="userProfileImageLeft" src={require('./resources/AI-stock-image.jpg')} alt="Online Education Image" />
</div>
<div className="studentPageLeftTopContentText">
<h1 className="studentPageLeftTopContentTextName">Jeffrey Wilson</h1>
<h1 className="studentPageLeftTopContentTextGrade">Grade: 12</h1>
</div>

<div className="">
<h1 className="studentPageLeftTopContentLetterGrade"> A</h1>
<h3 className="studentPageLeftTopContentTextLetterGrade"> 92%</h3>
</div>
        </div>

<div className="studentPageBottomLeftContent">
<h1 className="studentPageLeftTopContentLetterGrade"> Select Class: </h1>
<Button className="studentPageBottomLeftContentButton"  color="primary">Calculus I</Button>
<Button className="studentPageBottomLeftContentButton"  color="primary">C++</Button>
<div className="studentReportBottom">

<div className="ratingStudentPage">
    <div className="ratingIconAndStatus">
    </div>
</div>



</div>

</div>
</div>

<div className="studentPageRightSide">  
<div class="chart-container">
</div>
<div className="studentPageRightContent">


    <div className="assignmentTableList">
    <div className="assignmentTableTitle">
        <h1 className="assignmentTableTitleText">Assignments</h1>
    </div>

        <table className="assignmentTable">
            <tr>
                <th>Assignment</th>
                <th>Grade</th>

            </tr>
            <tr>
                <td>English Exam</td>
                <td>90%</td>
            </tr>   
            <tr>
                <td>Science Homework</td>
                <td>96%</td>
            </tr>
            <tr>
                <td>Math Quiz</td>
                <td>100%</td>
            </tr>
        </table>

</div>
</div>

</div>
</div>
    </>

  );
}

export default GradesPage;