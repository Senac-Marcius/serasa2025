//Const CATCH_ID = document.getElementById("studentId");
const STUDENT_NAME = document.getElementById("studentName");
const AGE = document.getElementById("studentAge");
// const GRADE = document.getElementById("studentGrade");
// const CPF = document.getElementById("studentCPF");
// const RG = document.getElementById("studentRG");
// const CLASSES = document.getElementById("studentClasses");
// const USER_ID = document.getElementById("studentUserId");
// const LOGIN = document.getElementById("studentLogin");
const PASSWORD = document.getElementById("studentPassword");
// const ADDRESS = document.getElementById("studentAddress");
// const CEP = document.getElementById("studentCEP");
// const CITY = document.getElementById("studentCity");
// const STATE = document.getElementById("studentState");
// const PHONE = document.getElementById("studentPhone");
const EMAIL = document.getElementById("studentEmail");
const BTN_CADASTRAR = document
  .getElementById("btnEnviar")
  .addEventListener("click", () => {
    setStudent();

  });

let students = [];

function testaCep(cep) {
  const testeCep = /^\d{5}-\d{3}$/
  return testeCep.test(cep);
}

function testaRG(RG) {
  const testeRG = /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{1}[0-9]{1}$/;
  return testeRG.test(RG);
}

function testaCpf(CPF) {
  const testeCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return testeCPF.test(CPF);
}

function testaEmail(email) {
  const testeEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return testeEmail.test(email);
}

function setStudent() {
  //   if (!testaCep(CEP.value)) {
  //     alert("CEP em formato invalido");
  //     return;
  //   } else if (!testaRG(RG.value)) {
  //     alert("RG em formato invalido");
  //     return;
  //   } else if (!testaCpf(CPF.value)) {
  //     alert("CPF em formato invalido");
  //     return;}
  if (!testaEmail(EMAIL.value)) {
    alert("Email em formato invalido");
  }

  let student = {
    id: 1,
    name: STUDENT_NAME.value,
    age: AGE.value,
    // grade: GRADE.value,
    // CPF: CPF.value,
    // RG: RG.value,
    // classesId: CLASSES.value,
    // userId: USER_ID.value,
    // login: LOGIN.value,
    password: PASSWORD.value,
    // address: ADDRESS.value,
    // CEP: CEP.value,
    // city: CITY.value,
    // state: STATE.value,
    // phone: PHONE.value,
    email: EMAIL.value,
    createdAt: Date.now(),
  };
  students.push(student);
}

function getStudentById(id) {
  return students.find((student) => student.id == id);
}

function putStudent(req, id) {
  let idx = students.findIndex((student) => student.id == id);

  if (req.name != undefined) students[idx].name = req.name;
  if (req.age != undefined) students[idx].age = req.age;
  if (req.grade != undefined) students[idx].grade = req.grade;
  if (req.CPF != undefined) students[idx].CPF = req.CPF;
  if (req.RG != undefined) students[idx].RG = req.RG;
  if (req.classes != undefined) students[idx].classes = req.classes;
  if (req.userId != undefined) students[idx].userId = req.userId;
  if (req.login != undefined) students[idx].login = req.login;
  if (req.password != undefined) students[idx].password = req.password;
  if (req.address != undefined) students[idx].address = req.address;
}

function getStudents(req) {
  return students.filter(
    (student) =>
      student.name == req.studentName ||
      student.grade == req.grade ||
      student.CPF == req.CPF ||
      student.RG == req.RG ||
      student.classes == req.classes ||
      student.userId == req.userId ||
      student.login == req.login ||
      student.address == req.address ||
      student.CEP == req.CEP ||
      student.city == req.city ||
      student.state == req.state ||
      student.phone == req.phone ||
      student.email == req.email ||
      student.createdAt == createdAt
  );
}

function showStudent(req) {
  return students.filter(
    (student) =>
      req.name != undefined &&
      student.name == req.name &&
      req.age != undefined &&
      student.age == req.age &&
      req.grade != undefined &&
      student.grade == req.grade &&
      req.CPF != undefined &&
      student.CPF == req.CPF &&
      req.RG != undefined &&
      student.RG == req.RG &&
      req.classes != undefined &&
      student.classes == req.classes &&
      req.userId != undefined &&
      student.userId == req.userId &&
      req.login != undefined &&
      student.login == req.login &&
      req.address != undefined &&
      student.address == req.address &&
      req.CEP != undefined &&
      student.CEP == req.CEP &&
      req.city != undefined &&
      student.city == req.city &&
      req.state != undefined &&
      student.state == req.state &&
      req.phone != undefined &&
      student.phone == req.phone &&
      req.email != undefined &&
      student.email == req.email &&
      req.createdAt != undefined &&
      student.createdAt == req.createdAt
  );
}


let teste = {
  id: 2,
  name: "Jane Smith",
  age: 22,
  grade: "B",
  CPF: "456498413654",
  RG: "2354511651",
  classesId: [1, 2],
  userId: "user456",
  login: "janesmith",
  password: "password456",
  address: "456 Elm St",
  CEP: "98765-432",
  city: "Othertown",
  state: "NY",
  phone: "555-5678",
  email: "janesmith@example.com",
  createdAt: new Date(),
};

let update = {
  name: "Jane Smith updated",
  age: 22,
  grade: "B",
  CPF: "456498413654",
  RG: "2354511651",
  classesId: [1, 2],
  userId: "user456",
  login: "janesmithupdated",
  password: "password456updated",
  address: "456 Elm St",
};
