"use strict";

/*function getCourse(id) {
    let div = document.createElement("div");
    let course = DATABASE.courses[id];
    div.id = "box";
    div.innerHTML = `
    <header> ${course.title} (${course.totalCredits})</header>
    <div>
    <div id="course_responsible"
    <h3>Course Responsible:</h3>
    <h3>Teachers:</h3>
    div id ="teachers">${getTeachers(course)}</div>
    </div>
    </div>`
    return div;
}

//get back to later
function totalCredits(course) {
    let credit = [];
    for ( let  )
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

function getTeachers(course) {
    let teacherDatabase = DATABASE.teachers;
    let teachers = [];
    for (let i = 0; i < course.teachers.length; i++) {
        let id = course.teachers[i].teacherId;
        teachers.push(teacherDatabase[id]);
    }
    let teacherDiv = [];
    for (let i = 0; i < teachers.length; i++) {
        let div = document.createElement("div");
        if (course.teachers[i].post == teacherDatabase[teachers[i].teacherId].teachers) {
            let text = div.innerHTML = `
           <div class = "realTeacher><h4>${teachers[i].firstName} ${teachers[i].lastName} (${teachers[i].post})</h4>`
            teacherDiv.push(text);
        } else {
            let text = div.innerHTML = `
               <div><h4>${teachers[i].firstName} ${teachers[i].lastName} (${teachers[i].post}</h4></div>`
            //behöver nog inte ha både div och h4, undersök
            teacherDiv.push(text);
        }
    }
    return teacherDiv.toString().split(",").join("");
}

getCourses(DATABASE.courses);
*/

//anteckning till mig själv: sätt på aviseringar på datorn igen

function getCourse(id) {
    let div = document.createElement("div");
    let course = DATABASE.courses[id];
    div.id = "box";
    div.innerHTML = `
    <header> ${course.title} (${course.totalCredits} credits)</header>
     <div id="course_responsible">
    <h3>Course Responsible:</h3>
    <div id ="teachers"><h3>Teachers:</h3></div>
    </div>
    <div id="students"><h3>Students:</h3></div>
    </div>`
    return div;
}

//fungerar ej än
//?  <div id="students"><h3>Students:</h3>${getStudents(course)}</div>


//denna funktionen fungerar ej
function getStudents(course) {
    let studentDatabase = DATABASE.students;
    let students = [];
    for (let i = 0; i < course.students.length; i++) {
        let id = course.students[i].studentID;
        students.push(studentDatabase[id]);
    }
    let studentDiv = [];
    for (let i = 0; i < students.length; i++) {
        let div = document.createElement("div");
        if (course.students[i].courseId == studentDatabase[students[i].studentID].courseId) {
            let text = div.innerHTML = `
            <div><p>${students[i].firstName} ${students[i].lastName} ${students.courses[i].passedCredits}</p>
            <p> ${students.courses[i].started.semester}</p></div>`
            studentDiv.push(text);
        }
    }
    return studentDiv.toString().split(",").join("");
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
