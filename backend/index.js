// Modules have a type attribute:
// 0 == lesson
// 1 == assignment
// 2 == assessment

const SQLQueries = {
    ModuleTypes: ["lesson", "assignment", "assessment"],
    GetAllStudentsInCourse(course_id) {
        return `
        SELECT student.username, student.first_name, student.last_name
        FROM student
        JOIN student_course_profile ON student_course_profile.student_id = student.username
        WHERE student_course_profile.course_id = ${course_id};
        `
    },
    GetAllGradesInCourse(course_id) {
        return `
        SELECT student_course_profile.student_id, grade_cell.module_id, grade_cell.earned_points, module.total_points
        FROM student_course_profile
        WHERE student_course_profile.course_id = ${course_id}
        JOIN grade_cell ON grade_cell.scp_id = student_course_profile.id
        JOIN module ON module.id = grade_cell.module_id;
        `
    },
    GetAllModulesInCourse(course_id) {
        return `
        SELECT module.id, module.module_type, module.optional, module.due_date, module.title 
        FROM module
        WHERE module.course_id = ${course_id};
        `
    },
    GetAllCoursesFromStudent(student_id) {
        return `
        SELECT course.id, course.title
        FROM course
        JOIN student_course_profile ON student_course_profile.course_id = course.id
        WHERE student_course_profile.student_id = ${student_id};
        `
    },
    GetGradesInCourseFromStudent(course_id, student_id) {
        return `
        SELECT grade_cell.module_id, grade_cell.earned_points, module.total_points, module.title
        FROM student_course_profile
        WHERE 
            student_course_profile.course_id = ${course_id} AND
            student_course_profile.student_id = ${student_id}
        JOIN grade_cell ON grade_cell.scp_id = student_course_profile.id
        JOIN module ON module.id = grade_cell.module_id;
        `
    }
};

var mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "=8zNhyCJ6%=5d*_)",
    database: "project_database",
    debug: true
});

function GetDataFromSQL(myQuery) {
    if (err) throw err;
    con.query(myQuery, function (err, result, fields) {
        if (err) throw err;
        return(result);
    });
}

const express = require("express");
const app = express();

app.get('/get_modules', function(req, res) {
    let student_id = req.params.student_id;
    let lessons = GetDataFromSQL(SQLQueries.GetAllModulesOfTypeFromStudent(student_id, 0)),
        assigns = GetDataFromSQL(SQLQueries.GetAllModulesOfTypeFromStudent(student_id, 1)),
        assesss = GetDataFromSQL(SQLQueries.GetAllModulesOfTypeFromStudent(student_id, 2));

    res.send({...lessons, ...assigns, ...assesss});
});

app.get('/course/get_grades', function(req, res) {
    let course_id = req.params.course_id;
    let grades = SQLQueries.GetAllGradesInCourse(course_id);
    res.send(grades);
});

app.get('/student/get_grades', function(req, res) {
    let student_id = req.params.student_id;
    let grades = SQLQueries.GetGradesFromStudent(student_id);
    res.send(grades);
});

// INSERT INTO teacher (username, hashed_pw, first_name, last_name) values ("TeacherZero", "xxx", "Aproctoflecticus", "Blubberman");
// INSERT INTO course (id, first_module_id, title, teacher_id, gradebook_id) values (1, 1, "Cool Course", "TeacherZero", 1);
// INSERT INTO module (id, course_id, module_type, content_id) values (1, 1, 0, 0);