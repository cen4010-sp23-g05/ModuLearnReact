// Modules have a type attribute:
// 0 == lesson
// 1 == assignment
// 2 == assessment

const SQLQueries = {
    ModuleTypes: ["lesson", "assignment", "assessment"],
    // GET
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
    GetAllModulesFromStudent(student_id) {
        return `
        SELECT module.course_id, module.id, module.module_type, module.optional, module.due_date, module.title, module.total_points
        FROM module
        JOIN student_course_profile ON module.course_id = student_course_profile.course_id
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
    GetCourse(course_id) {
        return `
        SELECT * 
        FROM course 
        WHERE course.id = ${course_id};
        `
    },
    GetHashedPWFromUser(tableName, id) {
        return `
        SELECT hashed_pw
        FROM ${tableName}
        WHERE id = ${id};
        `
    },

    // UPDATE TABLE
    AddCourse(course_id, course_title, teacher_id) {
        return `
        INSERT INTO course
        VALUES (${course_id}, ${course_title}, ${teacher_id});
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

function QuerySQL(myQuery) {
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

// CORS for debugging
const cors = require('cors');
app.use(cors({
    origin: "http://localhost:3000"
}));

// hashing stuff
const crypto = require('crypto');
const { log, table } = require("console");

function CreateInviteHash(inviteCode) {
    return crypto.createHash('sha256').update(inviteCode).digest().readUInt32BE(0);
}

function HashPassword(password) {
    return crypto.createHash('md5').update(password).digest("hex");
}

// ------------
// GET REQUESTS
// ------------

// Sends the information of all modules in a course as a JSON object to the client
app.get('/course/get_modules', function(req, res) {
    let course_id = req.params.course_id;
    let modules = QuerySQL(SQLQueries.GetAllModulesInCourse(course_id));
    res.send(modules);
});

// Sends the grades of all students in a course as a JSON object to the client
app.get('/course/get_grades', function(req, res) {
    let course_id = req.params.course_id;
    let grades = QuerySQL(SQLQueries.GetAllGradesInCourse(course_id));
    res.send(grades);
});

// Sends all courses a student is currently in as a JSON object
app.get('/student/courses', function(req, res) {
    let student_id = req.params.student_id;
    let courses = QuerySQL(SQLQueries.GetAllCoursesFromStudent(student_id));
    res.send(courses);
});

// Sends the grades of one student in a course as a JSON object to the client
app.get('/student/get_grades_for_course', function(req, res) {
    let student_id = req.params.student_id;
    let course_id = req.params.course_id;
    let grades = QuerySQL(SQLQueries.GetGradesInCourseFromStudent(course_id, student_id));
    res.send(grades);
});

// Sends the modules of all courses a student is in as a JSON object to the client
app.get('student/get_modules', function(req, res) {
    let student_id = req.params.student_id;
    let modules = QuerySQL(SQLQueries.GetAllModulesFromStudent(student_id));
    res.send(modules);
});

// Sends the content of a module to the client
app.get('/module/get_content', function(req, res) {
    let module_id = req.params.module_id;
    let file_loc = QuerySQL(SQLQueries.GetModuleFileLocation(module_id))[0].file_loc;
    const data = fs.readFileSync(file_loc);
    res.send(data);
});

app.get('/student/login', (req, res) => {
    let data = QuerySQL(SQLQueries.GetHashedPWFromUser("student", req.body.id));
    if (data.length == 0) {
        res.send({bUsername: false, bPassword: false});
    }
    if (data[0].hashed_pw == HashPassword(req.body.password)) {
        res.send({bUsername: true, bPassword: true});
    } else {
        res.send({bUsername: true, bPassword: false});
    }
});

app.get('/teacher/login', (req, res) => {
    let data = QuerySQL(SQLQueries.GetHashedPWFromUser("teacher", req.body.id));
    if (data.length == 0) {
        res.send({bUsername: false, bPassword: false});
    }
    if (data[0].hashed_pw == HashPassword(req.body.password)) {
        res.send({bUsername: true, bPassword: true});
    } else {
        res.send({bUsername: true, bPassword: false});
    }
});

// tests

app.get('/test/get_test', cors(), function(req, res) {
    console.log("Received call to the test case");
    res.send({
        "sample": "data"
    });
});

app.get("/test/student/courses", cors(), function(req, res) {
    console.log("Received test call to /test/student/courses");
    res.send(
        [
            {"id" : 0, "title" : "calculus 3"},
            {"id" : 1, "title" : "history of history"},
            {"id" : 2, "title" : "discrete computational theory of mathematics"},
        ]
    );
});

app.get('/test/student/get_modules', function(req, res) {
    console.log("Received test call to /test/student/get_modules");
    res.send(
        [
            {
              "course_id": 0,
              "id": 1,
              "module_type": 0,
              "optional": false,
              "due_date": "2022-05-01",
              "title": "Homework 1",
              "total_points": 50
            },
            {
              "course_id": 1,
              "id": 2,
              "module_type": 1,
              "optional": true,
              "due_date": "2022-05-15",
              "title": "Quiz 1",
              "total_points": 20
            },
            {
              "course_id": 2,
              "id": 3,
              "module_type": 1,
              "optional": false,
              "due_date": "2022-06-01",
              "title": "Homework 2",
              "total_points": 50
            },
            {
              "course_id": 2,
              "id": 4,
              "module_type": 2,
              "optional": false,
              "due_date": "2022-06-15",
              "title": "Midterm Exam",
              "total_points": 100
            }
          ]
          
    );
});

// ------------
// POST REQUESTS
// ------------

app.post('/teacher/create_course', (req, res) => {
    let course_id = CreateInviteHash(req.body.inviteCode);
    let course_data = QuerySQL(SQLQueries.GetCourse(course_id));

    if (course_data.length == 0) {
        QuerySQL(SQLQueries.AddCourse(course_id, req.body.course_title, req.body.teacher_id));

        res.json({success: true});
    } else {
        res.json({success: false});
    }
});

app.post('/teacher/create_module', (req, res) => {
    // Add handling
    console.log();
});

// -----------
// FINAL STEPS
// -----------

app.listen(4000, () => {
    console.log("Server started on port 4000.");
});