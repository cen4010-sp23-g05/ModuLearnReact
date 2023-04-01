// SQLQueries.js - Ethan Curtis, 2023

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
        return `SELECT grade_cell.earned_points, grade_cell.total_points 
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
    }
}