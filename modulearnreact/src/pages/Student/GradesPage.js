import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../styles/gradespage.css";
import { Button, Table } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function GradesPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let [resonse, setResponse] = useState(null);
  let [studentList, setStudentList] = useState("");
  let [display_name, setDisplayName] = useState("");
  let navigate = useNavigate();
  let location = useLocation();




  function loadProfile() {
    setLoading(true);
    axios.get("localhost:3000/test/student/get_modules", {
    }).then(function (response) {
        setStudentList(response.data.student);
        console.log(studentList);
        setResponse(response.data);
        setError(null);
        setLoading(false);
        console.log(studentList);
        // handle success
    }).catch(function (error) {
        // handle error
        console.log(error);
    })
        .then(function (response) {
        });
}



    useEffect(() => {
        loadProfile();
    }, []);

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
            <div className="studentPageLeftTopContentImage">
              <img
                className="userProfileImageLeft"
                src={require("../resources/AI-stock-image.jpg")}
                alt="Online Education Image"
              />
            </div>
            <div className="studentPageLeftTopContentText">
              <h1 className="studentPageLeftTopContentTextName">
                Jeffrey Wilson
              </h1>
              <h1 className="studentPageLeftTopContentTextGrade">Grade: 12</h1>
            </div>

            <div className="">
              <h1 className="studentPageLeftTopContentLetterGrade"> A</h1>
              <h3 className="studentPageLeftTopContentTextLetterGrade"> 92%</h3>
            </div>
          </div>

          <div className="studentPageBottomLeftContent">
            <h1 className="studentPageLeftTopContentLetterGrade">
              {" "}
              Select Class:{" "}
            </h1>
            <Button
              className="studentPageBottomLeftContentButton"
              color="primary"
            >
              Calculus I
            </Button>
            <Button
              className="studentPageBottomLeftContentButton"
              color="primary"
            >
              C++
            </Button>
            <div className="studentReportBottom">
              <div className="ratingStudentPage">
                <div className="ratingIconAndStatus"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="studentPageRightSide">
          <div class="chart-container"></div>
          <div className="studentPageRightContent">
            <div className="assignmentTableList">
              <div className="assignmentTableTitle">
                <h1 className="assignmentTableTitleText">Assignments</h1>
              </div>

              <Table className="assignmentTable"> 
                    <tbody>
                        
                        {studentList && studentList.map(searchResults => {    
                                     console.log(studentList);        
                                     return (
                        <tr>
                            <td key={searchResults.id}>
                                <div className="studentGrade" >
                                <h1 className="studentGradeText"> {searchResults.due_date} </h1>
                                </div>
                            </td>
                            <td>
                        <h1 className="studentNameText">{searchResults.title}</h1>
                        <div className="studentGradeLevel">
                            <h1 className="studentGradeLevelText">{searchResults.total_points}</h1>

                        </div>  
                            </td>
                            <td>
                     </td>
                     </tr>
                            )
                                    })}

                    </tbody>
                    </Table>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GradesPage;
