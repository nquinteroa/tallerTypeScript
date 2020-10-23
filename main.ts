import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('students')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByRange: HTMLElement = document.getElementById("button-filterByRange")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const inputRango1: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box1")!;
const inputRango2: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box2")!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByRange.onclick = () => applyFilterByRange();

renderCoursesInTable(dataCourses);
renderDataInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
  

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}
function applyFilterByRange() { 
  let text = inputRango1.value;
  let text1 = inputRango2.value;
  text = (text == null) ? '' : text;
  text1 = (text1 == null) ? '' : text1;
  clearCoursesInTable();
  let coursesFiltered: Course[] = text === '' ? dataCourses : dataCourses.filter( c => 
    c.credits >= parseInt( text) && c.credits <= parseInt(text1)); ;
  renderCoursesInTable(coursesFiltered);
}
function renderDataInTable(students: Student[]): void {
  console.log('Desplegando Informacion del estudiante');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.name}</td>
                           <td>${student.descripcion}</td>`;
    studentTbody.appendChild(trElement);
  });
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}
