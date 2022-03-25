"use strict";



//anteckning till mig själv: sätt på aviseringar på datorn igen

function getCourse(id) {
    let div = document.createElement("div");
    let course = DATABASE.courses[id];
    //let teacher = DATABASE.teachers[id];
    //let student = DATABASE.students[id];
    div.id = "box";
    div.innerHTML = `
    <header> ${course.title} (${course.totalCredits} credits)</header>
     <div id="course_responsible">
    <h3>Course Responsible:</h3>${findResponsible(course)}
    <div id ="teachers"><h3>Teachers:</h3>${findTeacher(course)}</div>
    </div>
    <div id="students"><h3>Students:</h3>${getStudent(course)}</div>
    </div>`
    return div;
} //anropningen är inte rätt
//har inte lagt till ${findTeachers}

//fungerar ej än
//?  <div id="students"><h3>Students:</h3>${getStudents(course)}</div>

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

function findTeacher(courses) {
    let teacherBox = [];
    for (let i = 0; i < DATABASE.teachers.length; i++) {
        let div = document.createElement("div");
        if (DATABASE.teachers[i].teacherId == courses.teachers[i]) {
            let text = div.innerHTML = `
            <div class="assist"><h2>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</h2></div>`
            teacherBox.push(text);
        }
    }
    return teacherBox.toString().split(",").join("");
}

function getStudent(courses) {
    let studentBox = [];
    for (let i = 0; i < DATABASE.students.length; i++) {
        let div = document.createElement("div");
        if (DATABASE.students[i].courses.courseId == courses.courseId[i]) {
            let text = div.innerHTML = `
            <div class="student_"><h2>${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName} </h2></div>`
            studentBox.push(text);
       }  /*else {
            studentBox.filter(text); bla bla bla
        }*/
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

getCourses(DATABASE.courses);
input();
