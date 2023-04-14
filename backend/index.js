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
    },
    GetModuleFileLocation(module_id) {
        return `
        SELECT module.file_loc
        FROM module
        WHERE module.id = ${module_id};
        `
    },

};

// MySQL stuff
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
// File system for loading files
var fs = require('fs');

// Express
const express = require("express");
const app = express();

// ------------
// GET REQUESTS
// ------------

// Sends the information of all modules in a course as a JSON object to the client
app.get('/course/get_modules', function(req, res) {
    let course_id = req.params.course_id;
    let modules = GetDataFromSQL(SQLQueries.GetAllModulesInCourse(course_id));
    res.send(modules);
});

// Sends the grades of all students in a course as a JSON object to the client
app.get('/course/get_grades', function(req, res) {
    let course_id = req.params.course_id;
    let grades = GetDataFromSQL(SQLQueries.GetAllGradesInCourse(course_id));
    res.send(grades);
});

// Sends all courses a student is currently in as a JSON object
app.get('/student/courses', function(req, res) {
    let student_id = req.params.student_id;
    let courses = GetDataFromSQL(SQLQueries.GetAllCoursesFromStudent(student_id));
    res.send(courses);
});

// Sends the grades of one student in a course as a JSON object to the client
app.get('/student/get_grades_for_course', function(req, res) {
    let student_id = req.params.student_id;
    let course_id = req.params.course_id;
    let grades = GetDataFromSQL(SQLQueries.GetGradesInCourseFromStudent(course_id, student_id));
    res.send(grades);
});

// Sends the content of a module to the client
app.get('/module/get_content', function(req, res) {
    let module_id = req.params.module_id;
    let file_loc = GetDataFromSQL(SQLQueries.GetModuleFileLocation(module_id))[0].file_loc;
    const data = fs.readFileSync(file_loc);
    res.send(data);
});

// ------------
// SET REQUESTS
// ------------

