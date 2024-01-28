// Include packages needed for this application
const inquirer = require("inquirer"); //npm special software - const variable can not be reassigned
const mysql = require("mysql2/promise");
const express = require("express");

const PORT = process.env.PORT || 3301;
const app = express();

let roleChoices = [];

function getDBConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
  });
}

async function getAllDepartments() {
  console.log("hi");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute("SELECT * FROM department");
  return rows;
}

async function getAllRoles() {
  console.log("test");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute("SELECT * FROM role");
  return rows;
}

async function getAllEmployees() {
  console.log("bye");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute("SELECT * FROM employee");
  return rows;
}

async function getDepartmentNames() {
  console.log("ahoy");
  const db = await getDBConnection();
  //GROUP_CONCAT: https://stackoverflow.com/questions/662207/mysql-results-as-comma-separated-list
  const [rows, fields] = await db.execute("SELECT department_name FROM department");
  return rows;
}

async function addDepartment(departmentName) {
  console.log("hola");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute(`INSERT INTO department (department_name) VALUES ("${departmentName}");`);
  return rows;
}

async function addRole(roleInfo) {
  console.log("good day");
  console.log(roleInfo);
  const db = await getDBConnection();

  const [rows1, fields1] = await db.execute(`SELECT id FROM department WHERE department_name="${roleInfo.choices}"`);
  const departmentId = rows1[0].id;
  console.log(departmentId);
  const [rows, fields] = await db.execute(`INSERT INTO role (title, department_id, salary) 
                                           VALUES ("${roleInfo.title}",
                                           ${departmentId},
                                           "${roleInfo.salary}")`);
  return rows;
}

async function addEmployee() {
  console.log("good bye");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute("SELECT * FROM add employee");
  return rows;
}

async function updateEmployeeRole() {
  console.log("adios");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute("SELECT * FROM update employee role");
  return rows;
}

async function removeDepartment() {
  console.log("bueno");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute("SELECT * FROM remove department");
  return rows;
}

async function removeRole() {
  console.log("mahalo");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute("SELECT * FROM remove role");
  return rows;
}

async function removeEmployee() {
  console.log("good night");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute("SELECT * FROM remove employee");
  return rows;
};

// //add employee function
// function addEmployee() {
//   const query = "";

//   inquirer.prompt([
//     {
//       type: "input",
//       name: "firstName",
//       message: "What is the employee's first name?",
//     },
//     {
//       type: "input",
//       name: "lastName",
//       message: "What is the employee's last name?",
//     },
//     {
//       type: "list",
//       name: "role",
//       message: "What is the employee's role?",
//       choices: roleChoices,
//     },
//     {
//       type: "confirm",
//       name: "supervisor",
//       message: "Does the employee have a manager?",
//     } /*,
//     {
//       type: "list",
//       name: "manager",
//       message: "Who is the employee's manager?",
//       choices: name,
//       when: (answers) => answers.supervisor,
//     },*/,
//   ]);
// }


//default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = {
  getAllDepartments: getAllDepartments,
  getAllRoles: getAllRoles,
  getAllEmployees: getAllEmployees,
  getDepartmentNames: getDepartmentNames,
  addDepartment: addDepartment,
  addRole: addRole,
  addEmployee: addEmployee,
  updateEmployeeRole: updateEmployeeRole,
  removeDepartment: removeDepartment,
  removeRole: removeRole,
  removeEmployee: removeEmployee,
};
