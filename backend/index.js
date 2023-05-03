// Modules have a type attribute:
// 0 == lesson
// 1 == assignment
// 2 == assessment

const SQLQueries = {
    ModuleTypes: ["lesson", "assignment", "assessment"],
    // SELECT
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
    GetModuleInfo(module_id) {
        return `
        SELECT title, due_date, total_points
        FROM module
        WHERE id = ${module_id};
        `
    },
    GetCourse(course_id) {
        return `
        SELECT * 
        FROM course 
        WHERE course.id = ${course_id};
        `
    },
    GetUser(tableName, username) {
        return `
        SELECT * 
        FROM ${tableName}
        WHERE username = ${username}
        `
    },
    GetHashedPWFromUser(tableName, username) {
        if (tableName != "student" && tableName != "teacher") return;

        return `
        SELECT hashed_pw
        FROM ${tableName}
        WHERE username = ${username};
        `
    },
    GetAllModules() {
        return `
        SELECT *
        FROM module;
        `
    },

    // INSERT
    AddCourse(course_id, course_title, teacher_id) {
        return `
        INSERT INTO course
        VALUES (${course_id}, ${course_title}, ${teacher_id});
        `
    },
    AddUser(tableName, username, hashed_pw, first_name, last_name) {
        if (tableName != "student" && tableName != "teacher") return;
        
        return `
        INSERT INTO ${tableName}
        VALUES (${username}, ${hashed_pw}, ${first_name}, ${last_name});
        `
    },
    AddModule(module_id, course_id, module_type, optional, due_date, title, file_loc, total_points) {
        return `
        INSERT INTO module
        VALUES (${module_id}, ${course_id}, ${module_type}, ${optional}, ${due_date}, ${title}, ${file_loc}, ${total_points});
        `
    }
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
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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
    let course_id = req.body.course_id;
    let modules = QuerySQL(SQLQueries.GetAllModulesInCourse(course_id));
    res.send(modules);
});

// Sends the grades of all students in a course as a JSON object to the client
app.get('/course/get_grades', function(req, res) {
    let course_id = req.body.course_id;
    let grades = QuerySQL(SQLQueries.GetAllGradesInCourse(course_id));
    res.send(grades);
});

// Sends all courses a student is currently in as a JSON object
app.get('/student/courses', function(req, res) {
    let student_id = req.body.student_id;
    let courses = QuerySQL(SQLQueries.GetAllCoursesFromStudent(student_id));
    res.send(courses);
});

// Sends the grades of one student in a course as a JSON object to the client
app.get('/student/get_grades_for_course', function(req, res) {
    let student_id = req.body.student_id;
    let course_id = req.body.course_id;
    let grades = QuerySQL(SQLQueries.GetGradesInCourseFromStudent(course_id, student_id));
    res.send(grades);
});

// Sends the modules of all courses a student is in as a JSON object to the client
app.get('student/get_modules', function(req, res) {
    let student_id = req.body.student_id;
    let modules = QuerySQL(SQLQueries.GetAllModulesFromStudent(student_id));
    res.send(modules);
});

app.get('/module/get_info', (req, res) => {
    let module_id = req.body.module_id;
    res.send(QuerySQL(SQLQueries.GetModuleInfo(module_id))[0]);
});

// Sends the content of a module to the client
app.get('/module/get_content', function(req, res) {
    let module_id = req.body.module_id;
    let file_loc = QuerySQL(SQLQueries.GetModuleFileLocation(module_id))[0].file_loc;
    const data = fs.readFileSync(file_loc);
    res.send(data);
});

app.get('/student/login', (req, res) => {
    res.send(LoginUser("student", req.body.id));
});

app.get('/teacher/login', (req, res) => {
    res.send(LoginUser("teacher", req.body.id));
});

function LoginUser(userType, username) {
    let data = QuerySQL(SQLQueries.GetHashedPWFromUser(userType, username));
    if (data.length == 0) {
        return {bUsername: false, bPassword: false};
    }
    if (data[0].hashed_pw == HashPassword(req.body.password)) {
        return {bUsername: true, bPassword: true};
    } else {
        return {bUsername: true, bPassword: false};
    }
}

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
            {"id" : 0, "title" : "Calculus 2"},
            {"id" : 1, "title" : "History of Histories"},
            {"id" : 2, "title" : "Discrete computational theory of Mathematics & Linear Algebra"},
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
              "title": "Lesson 1",
              "total_points": 50
            },
            {
              "course_id": 1,
              "id": 2,
              "module_type": 1,
              "optional": true,
              "due_date": "2022-05-15",
              "title": "Assignment 1",
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

app.post('/test/module/get_content', function (req, res) {
    switch (req.body.module_type) {
        case 0:
            lessonTest(res, req.body.module_id);
            break;
        case 1:
            assignmentTest(res, req.body.module_id);
            break;
        case 2:
            assessmentTest(res);
            break;
        default:
            console.log("Invalid module type: " + req.body.module_type.toString());
    }
});

app.post('/test/module/get_info', (req, res) => {
    if (req.body.module_id > 4) {
        console.log("Info ID was out of range!");
    }

    res.send(
        ([
            {
              "course_id": 0,
              "id": 1,
              "module_type": 0,
              "optional": false,
              "due_date": "2023-05-01",
              "title": "Lesson 1",
              "total_points": 50
            },
            {
              "course_id": 1,
              "id": 2,
              "module_type": 1,
              "optional": true,
              "due_date": "2023-05-15",
              "title": "Assignment 1",
              "total_points": 20
            },
            {
              "course_id": 2,
              "id": 3,
              "module_type": 1,
              "optional": false,
              "due_date": "2023-06-01",
              "title": "Homework 2",
              "total_points": 50
            },
            {
              "course_id": 2,
              "id": 4,
              "module_type": 2,
              "optional": false,
              "due_date": "2023-06-15",
              "title": "Midterm Exam",
              "total_points": 100
            }
        ])[req.body.module_id-1]
    );
});

function lessonTest(res, module_id) {
    if (module_id == 1) {
        res.send([
            { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
            { content: 'Fusce consequat accumsan tellus, id tincidunt elit tempus ut.' },
            { content: 'Cras vehicula, magna at auctor tincidunt, sapien turpis sodales odio, vel volutpat lorem magna sed metus.' },
        ]);
    } else {
        res.send([
            { content: 'This is some lesson content' },
            { content: 'This is even more lesson content' },
            { content: 'This is the most lesson content (that I can think of)' }
        ])
    }
}

function assignmentTest(res, module_id) {
    if (module_id == 2) {
        res.send({
            content: "Assignment description"
        });
    } else {
        res.send({
            content: "A different assignment description"
        })
    }
}

function assessmentTest(res) {
    res.send([
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
}

// ------------
// POST REQUESTS
// ------------

app.post('/student/create', (req, res) => {
    let userData = QuerySQL(SQLQueries.GetUser("student", req.body.username));
    if (userData.length != 0) {
        res.json({bUsername: false});
        return;
    }

    QuerySQL(SQLQueries.AddUser(
        "student", 
        req.body.username,
        HashPassword(req.body.password),
        req.body.first_name,
        req.body.last_name
    ));
    res.json({bUsername: true});
});

app.post('/teacher/create', (req, res) => {
    let userData = QuerySQL(SQLQueries.GetUser("teacher", req.body.username));
    if (userData.length != 0) {
        res.json({bUsername: false});
        return;
    }

    QuerySQL(SQLQueries.AddUser(
        "teacher", 
        req.body.username,
        HashPassword(req.body.password),
        req.body.first_name,
        req.body.last_name
    ));
    res.json({bUsername: true});
});

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
    let course_id = req.body.course_id,
        content = req.body.content,
        module_type = req.body.module_type;

    let module_id = QuerySQL(SQLQueries.GetAllModules()).length;
    fs.writeFile("/data/" + module_id.toString() + ".json", content, 'utf-8');

    QuerySQL(SQLQueries.AddModule(module_id, course_id, module_type, false, "","","FILE_LOC",0))
});

// -----------
// FINAL STEPS
// -----------

if (false) {
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
          }
        console.log('Connected to the database');
    })
}

app.listen(5000, () => {
    console.log("Server started on port 5000.");
});