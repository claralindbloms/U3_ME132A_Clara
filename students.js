"use strict";

//let students = DATABASE.students;
//let student = [DATABASE.students[0], DATABASE.students[1]];

function getStudent(id) {
    let div = document.createElement("div");
    let student = DATABASE.students[id];
    div.id = "box";
    div.innerHTML = `
    <header> ${student.firstName} ${student.lastName} (total: ${totalCredits(student)} credits)</header>
    <div>
    <div id="course">
    <h3>Courses: </h3>
    <div id="courses">${getCourses(student)}</div>
    </div>
    </div>`
    return div;
}

function totalCredits(student) {
    let credit = [];
    for (let course of student.courses) {
        credit.push(course.passedCredits)
    }
    let totalSum = 0;
    for (let i = 0; i < credit.length; i++) {
        totalSum += credit[i];
    }
    return totalSum;
}

function getStudents(students, searchedName) {
    let studentsElement = document.getElementById("result");
    if (searchedName != undefined) {
        let info = searchedName.toLowerCase();
        document.getElementById("result").innerHTML = "";
        for (let student of students) {
            let field = student.lastName.toLowerCase();
            if (field.includes(info)) {
                let studentElement = getStudent(student.studentID);
                studentsElement.appendChild(studentElement);
            }
        }
    }
    //seems unnessary but keeps just in case
    if (searchedName == undefined) {
        for (let student of students) {
            let studentElement = getStudent(student.studentID);
            studentsElement.appendChild(studentElement);
        }
    }
}

function getCourses(student) {
    let courseDatabase = DATABASE.courses;
    let courses = [];
    for (let i = 0; i < student.courses.length; i++) {
        let id = student.courses[i].courseId;
        courses.push(courseDatabase[id]);
    }
    let courseDiv = [];
    for (let i = 0; i < courses.length; i++) {
        let div = document.createElement("div");
        if (student.courses[i].passedCredits == courseDatabase[courses[i].courseId].totalCredits) {
            let text = div.innerHTML = `
            <div class = "finished"><h4>${courses[i].title}</h4>
            <p>${student.courses[i].started.semester} ${student.courses[i].started.year} (${student.courses[i].passedCredits} of ${courseDatabase[courses[i].courseId].totalCredits} credits)</p></div>`
            courseDiv.push(text);
        } else {
            let text = div.innerHTML = `
            <div><h4>${courses[i].title}</h4>
            <p>${student.courses[i].started.semester} ${student.courses[i].started.year} (${student.courses[i].passedCredits} of ${courseDatabase[courses[i].courseId].totalCredits} credits)</p></div>`
            courseDiv.push(text);
        }
    }
    return courseDiv.toString().split(",").join("");
}

function onKeyUp() {
    let searchedName = this.value;
    getStudents(DATABASE.students, searchedName);
    console.log(this.value);
}

function input() {
    let search = document.getElementById("students_search");
    search.addEventListener("keyup", onKeyUp);
}


//!!!!!!!!!!!!!!!!!!!!!!!!
let darkMode = false;

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkMode = true;
}

if (localStorage.getItem('theme') === 'dark') {
    darkMode = true;
} else if (localStorage.getItem('theme') === 'light') {
    darkMode = false;
}

if (darkMode) {
    document.body.classList.toggle('dark');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
});

///maybe delete everything inbetween

getStudents(DATABASE.students); //uncomment to show everyone from beginning
input();





