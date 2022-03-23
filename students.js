"use strict";

/* När en användare söker på studenter ska varje student i 
listan innehålla följande information: studentens för- och 
efternamn, deras totala högskolepoäng (credits) och en lista
över alla kurser dom gått.Varje kurs ska innehålla följande 
information: kursens titel, vilken termin och år studenten gick 
kursen och antal högskolepoäng dom klarat av. Avklarade kurser, 
dvs. att dom fått alla högskolepoäng från kursen, ska markeras 
på något vis (t.ex. via en bak- eller förgrundsfärg). */

/*let form = document.getElementById("form");

function findStudent (){
    let filteredStudents = [];
    for (let i = 0; i < DATABASE.students.length; i++){
        let lastName = DATABASE.students[i].lastName;
        let student = DATABASE.students[i];
        if (lastName.includes(this.value)){
            filteredStudents.push(student);
        }
    }
}

function keyUp (){
    console.log(this.value);
}

form.addEventListener("keyup", findStudent);*/

/*function renderStudent (student){
    for (let i = 0; i < student.students.length; i++){
        let div = document.createElement("div");
        div.classList.add("container");

        div.innerHTML = `
        <header id ="studentNames"> ${student.students[i].firstName} ${student.students[i].lastName}</header>
        <h4>Courses:</h4>
        <div id ="grid>
        <div id ="box"></div>
        </div>`;
        document.querySelector("#wrapper").appendChild(div);
    }
}*/

/*function getStudentByLastName(student, lastName){
    let studentByLastName = [];
    for (let student of stidents){
        if (student.lastName.toLowerCase() == lastName.toLowerCase()){
            studentByLastName.push(student);
        }
        return studentByLastName;
    }
}

function placeStudent(student){
    let div = document.createElement("div");
    div.classList.add("student");
    div.id = student.id;
    div.innerHTML = `
    <div>${student.firstName} ${student.lastName}</div>
    `;
    return div;
}

function placeStudents(students){
    let studentsElement = document.querySelector("#results");
    studentsElement.innerHTML = "";

    for (let student of students ){
        let studentElement = placeStudent(student);
        studentsElement.appendChild(studentElement);
    }
}

function getStudent (event){
    event.preventDefault();
    let person = document.getElementById("form").value;
    let students = getStudentsByLastName(DATABASE, lastName);
    placeStudents(students);
}

placeStudents(DATABASE);
*/