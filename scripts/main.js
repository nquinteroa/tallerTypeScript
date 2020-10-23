import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('students');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByRange = document.getElementById("button-filterByRange");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var inputRango1 = document.getElementById("search-box1");
var inputRango2 = document.getElementById("search-box2");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByRange.onclick = function () { return applyFilterByRange(); };
renderCoursesInTable(dataCourses);
renderDataInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByRange() {
    var text = inputRango1.value;
    var text1 = inputRango2.value;
    text = (text == null) ? '' : text;
    text1 = (text1 == null) ? '' : text1;
    clearCoursesInTable();
    var coursesFiltered = text === '' ? dataCourses : dataCourses.filter(function (c) {
        return c.credits >= parseInt(text) && c.credits <= parseInt(text1);
    });
    ;
    renderCoursesInTable(coursesFiltered);
}
function renderDataInTable(students) {
    console.log('Desplegando Informacion del estudiante');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.name + "</td>\n                           <td>" + student.descripcion + "</td>";
        studentTbody.appendChild(trElement);
    });
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
