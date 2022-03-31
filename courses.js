"use strict";

//Github Link:
//https://github.com/claralindbloms/U3_ME132A_Clara.git

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
}

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

function findTeachers(courses) {
    let teacherBox = []
    for (let i = 0; i < DATABASE.teachers.length; i++) {
        let div = document.createElement("div")
        for (let x = 0; x < courses.teachers.length; x++) {
            if (DATABASE.teachers[i].teacherId == courses.teachers[x]) {
                let text = div.innerHTML = `
            <h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</h4>`
                teacherBox.push(text);
            }
        }
    }
    return teacherBox.toString().split(",").join("");
}

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

//darkmode

let darkMode = false;
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    darkMode = true;
} if (localStorage.getItem("theme") === "dark") {
    darkMode = true;
} else if (localStorage.getItem("theme") === "light") {
    darkMode = false;
} if (darkMode) {
    document.body.classList.toggle("dark");
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("theme-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });
});

//getCourses(DATABASE.courses); //uncomment to show everyone from beginning
input();
