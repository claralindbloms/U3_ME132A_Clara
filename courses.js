"use strict";



//anteckning till mig själv: sätt på aviseringar på datorn igen

function getCourse(id) {
    let div = document.createElement("div");
    let course = DATABASE.courses[id];
    div.id = "box";
    div.innerHTML = `
    <header> ${course.title} (${course.totalCredits} credits)</header>
    <div id ="all_teachers">
    <div id="course_responsible">
    <h3>Course Responsible:</h3>${findResponsible(course)}</div>
    <div id ="teachers"> <h3>Teachers:</h3>${findTeachers(course)}</div></div>
    <h3>Students:</h3> <div id="students">${getStudent(course)}</div>`
    return div;
} //anropningen är inte rätt
//har inte lagt till ${findTeachers}

//fungerar ej än
//?  <div id="students"><h3>Students:</h3>${getStudents(course)}</div>
//${getStudent(course)}

function getCourses(courses, searchedName) {
    let coursesElement = document.getElementById("result");
    if (searchedName != undefined) {
        let info = searchedName.toLowerCase();
        document.getElementById("result").innerHTML = "";
        for (let course of courses) {
            let field = course.title.toLowerCase();
            if (field.includes(info)) {
                let courseElement = getCourse(course.courseId);
                coursesElement.appendChild(courseElement);
            }
        }
    }
    //seems unnessary but keeps just in case
    if (searchedName == undefined) {
        for (let course of courses) {
            let courseElement = getCourse(course.courseId);
            coursesElement.appendChild(courseElement);
        }
    }
}

function findResponsible(courses) {
    let teacherBox = [];
    for (let i = 0; i < DATABASE.teachers.length; i++) {
        let div = document.createElement("div");
        if (DATABASE.teachers[i].teacherId == courses.courseResponsible) {
            let text = div.innerHTML = `
                <div class="done"><h2>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</h2></div>`
            teacherBox.push(text);
        }
    }
    return teacherBox.toString().split(",").join("");
}


//fungerar ej 
function findTeachers(courses) {
    let teacherBox = []
    for (let i = 0; i < DATABASE.teachers.length; i++) {
        let div = document.createElement("div")
        if (DATABASE.teachers[i].teacherId == courses.teachers[0]) {
            let text = div.innerHTML = `
            <h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</h4>`
            teacherBox.push(text);
        } else if (DATABASE.teachers[i].teacherId == courses.teachers[1]) {
            let text = div.innerHTML = `
            <h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</h4>`
            teacherBox.push(text);
        } else if (DATABASE.teachers[i].teacherId == courses.teachers[2]) {
            let text = div.innerHTML = `
            <h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</h4>`
            teacherBox.push(text);
        }
    }
    return teacherBox.toString().split(",").join("");
}


//students: en loop som loopar igenom studenter, i den loopen loopa igenom den studentens kurser så det blir student[i].courses.lenght 
//i den loopen ska vi ha en ifsats som kollar om sutdents[i].courses[i].courseId == courses.courseId


//fungerar ej
function getStudent(courses) {
    let studentBox = [];
    for (let i = 0; i < DATABASE.students.length; i++) {
        let div = document.createElement("div");
        for (let x = 0; x < DATABASE.students[i].courses.length; x++)
            if (DATABASE.students[i].courses[x].courseId == courses.courseId && DATABASE.students[i].courses[x].passedCredits == courses.totalCredits) {
                let text = div.innerHTML = `
            <div class="student_"><h2>${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName} (${DATABASE.students[i].courses[x].passedCredits} credits)  </h2>
            <p>${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}</div>`
                studentBox.push(text);
            } else if (DATABASE.students[i].courses[x].courseId == courses.courseId) {
                let text = div.innerHTML = `
            <div class="not_finished"><h2>${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName} (${DATABASE.students[i].courses[x].passedCredits} credits)  </h2>
            <p>${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}</div>`
                studentBox.push(text);
            }
    }
    return studentBox.toString().split(",").join("");
}


function onKeyUp() {
    let searchedName = this.value;
    getCourses(DATABASE.courses, searchedName);
    console.log(this.value);
}

function input() {
    let search = document.getElementById("courses_search");
    search.addEventListener("keyup", onKeyUp);
}

getCourses(DATABASE.courses); //uncomment to show everyone from beginning
input();
