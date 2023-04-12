// Modules have a type attribute:
// 0 == lesson
// 1 == assignment
// 2 == assessment

const SQLQueries = {
    ModuleTypes: ["lesson", "assignment", "assessment"],
    GetAllStudentsInCourse(course_id) {
        return `SELECT student.username, student.first_name, student.last_name 
        FROM grade_cell 
        JOIN student 
        ON grade_cell.student_id = student.username 
        WHERE grade_cell.course_id = ${course_id};`
    },
    GetAllGradesInCourse(course_id) {
        return `SELECT grade_cell.earned_points, grade_cell.total_points, grade_cell.student_id, grade_cell.module_id 
        FROM grade_cell 
        WHERE grade_cell.course_id = ${course_id};`;
    },
    GetAllModulesOfTypeInCourse(course_id, module_type) {
        if (module_type != 0 || module_type != 1 || module_type != 2) {
            throw new Error("SQLQueries: Module type out of range.");
        }
        return `SELECT * FROM ${this.ModuleTypes[module_type]} JOIN module 
        ON 
            module.type = ${module_type} AND 
            module.content_id = ${this.ModuleTypes[module_type]}.id 
        WHERE module.course_id = ${course_id};`;
    },
    GetAllCoursesFromStudent(student_id) {
        return `SELECT * FROM course 
        JOIN grade_cell ON grade_cell.course_id = course.id
        JOIN student ON student.username = grade_cell.student_id
        WHERE student_id = ${student_id};`;
    },
    GetAllModulesOfTypeFromStudent(student_id, module_type) {
        if (module_type != 0 || module_type != 1 || module_type != 2) {
            throw new Error("SQLQueries: Module type out of range.");
        }
        modName = this.ModuleTypes[module_type];

        return `
        SELECT ${modName}.title, ${modName}.dueDate
        FROM ${modName}
        JOIN module ON module.content_id = ${modName}.id
        JOIN grade_cell ON grade_cell.module_id = module.id
        JOIN student ON student.username = grade_cell.student_id
        WHERE student.username = ${student_id};
        `;
    },
    GetGradesFromStudent(student_id) {
        return `
        SELECT grade_cell.total_points, grade_cell.earned_points
        FROM grade_cell
        WHERE grade_cell.student_id = ${student_id};
        `;
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