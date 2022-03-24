"use strict";

/* När en användare söker på studenter ska varje student i 
listan innehålla följande information: studentens för- och 
efternamn, deras totala högskolepoäng (credits) och en lista
över alla kurser dom gått.Varje kurs ska innehålla följande 
information: kursens titel, vilken termin och år studenten gick 
kursen och antal högskolepoäng dom klarat av. Avklarade kurser, 
dvs. att dom fått alla högskolepoäng från kursen, ska markeras 
på något vis (t.ex. via en bak- eller förgrundsfärg). */

let students = DATABASE.students;
//let student = [DATABASE.students[0], DATABASE.students[1]];

function getStudent(id) {
    let div = document.createElement("div");
    let student = DATABASE.students[id];
    div.id = "box";
    div.innerHTML = `
    <header> ${student.firstName} ${student.lastName}(total credits: ${totalCredits(student)})</header>
    <div>
    <div id="course">
    <h3>Courses: </h3>
    <div id="courses">
    ${getCourses(student)}
    </div>
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

function getStudents(students) {
    let studentsElement = document.getElementById("result");
    for (let student of students) {
        let studentElement = getStudent(student.studentID);
        studentsElement.appendChild(studentElement);
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
            <p>(${student.courses[i].passedCredits} of ${courseDatabase[courses[i].courseId].totalCredits} credits)</p></div>`
            courseDiv.push(text);
        } else {
            let text = div.innerHTML = `
            <div><h4>${courses[i].title}</h4>
            <p>(${student.courses[i].passedCredits} of ${courseDatabase[courses[i].courseId].totalCredits} credits)</p></div>`
            courseDiv.push(text);
        }
        
    }
    return courseDiv.toString().split(",").join("");
}

getStudents(DATABASE.students);


