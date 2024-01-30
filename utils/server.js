// Include packages needed for this application
//const inquirer = require("inquirer"); //npm special software - const variable can not be reassigned
const mysql = require("mysql2");
const db = require("mysql-promise")();
//const express = require("express");

const options = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees_db",
};
db.configure(options, mysql);

// const PORT = process.env.PORT || 3301;
// const app = express();

// let roleChoices = [];

function getAllDepartments() {
  console.log("hi");
  //console.log(db.query("SELECT * FROM department"));
  return db.query("SELECT * FROM department");
}

function getAllRoles() {
  console.log("test");
  const db = getDBConnection();

  const [rows, fields] = db.execute("SELECT * FROM role");
  return rows;
}

function getAllEmployees() {
  console.log("bye");
  const db = getDBConnection();

  const [rows, fields] = db.execute("SELECT * FROM employee");
  return rows;
}

function addDepartment(departmentName) {
  console.log("hola");
  const db = getDBConnection();

  const [rows, fields] = db.execute(
    `INSERT INTO department (department_name) VALUES ("${departmentName}");`
  );
  return rows;
}

function addRole(roleInfo) {
  console.log("good day");
  console.log(roleInfo);
  const db = getDBConnection();
  // Get department ID (primary key)
  const [rows1, fields1] = db.execute(
    `SELECT id FROM department WHERE department_name="${roleInfo.department}"`
  );
  const departmentId = rows1[0].id;
  console.log(departmentId);
  // The department ID is a foreign key in the role table
  const [rows, fields] =
    db.execute(`INSERT INTO role (title, department_id, salary) 
                                           VALUES ("${roleInfo.title}",
                                           ${departmentId},
                                           "${roleInfo.salary}")`);
  return rows;
}

function addEmployee(employeeInfo) {
  console.log("good bye");
  const db = getDBConnection();

  // Get role ID (primary key)
  const [rows1, fields1] = db.execute(
    `SELECT id FROM role WHERE title="${employeeInfo.role}";`
  );
  const roleId = rows1[0].id;
  console.log(roleId);
  // Get manager ID (primary key)
  // Escape tick \`
  // Concat first/last name
  const [rows2, fields2] = db.execute(
    `SELECT id FROM employee WHERE CONCAT(\`first_name\`, ' ', \`last_name\`) = "${employeeInfo.manager}";`
  );
  const managerId = rows2[0].id;
  console.log(managerId);

  const [rows, fields] =
    db.execute(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                           VALUES (${employee.firstName},
                                                   ${employee.lastName},
                                                   ${roleId},
                                                   ${managerId});`);
  return rows;
}

function updateEmployeeRole() {
  console.log("adios");
  const db = getDBConnection();

  const [rows, fields] = db.execute(``);
  // UPDATE EMPLOYEE
  // SET role_id = whatever the new role ID is
  // WHERE id = the id of the employee you want to update
  return rows;
}

function removeDepartment() {
  console.log("bueno");
  const db = getDBConnection();

  const [rows, fields] = db.execute(``);
  // DELETE FROM department
  // WHERE id = the id of the department you want to delete
  return rows;
}

function removeRole() {
  console.log("mahalo");
  const db = getDBConnection();

  const [rows, fields] = db.execute(``);
  // DELETE FROM role
  // WHERE id = the id of the role you want to delete
  return rows;
}

function removeEmployee() {
  console.log("good night");
  const db = getDBConnection();

  const [rows, fields] = db.execute(``);
  // DELETE FROM employee
  // WHERE id = the id of the employee you want to delete

  // You will want to test this to see what happens if you try to delete a manager
  // Remember their ID is a foreign key on other employee's records (manager_id)
  return rows;
}

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
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports = {
  getAllDepartments: getAllDepartments,
  getAllRoles: getAllRoles,
  getAllEmployees: getAllEmployees,
  addDepartment: addDepartment,
  addRole: addRole,
  addEmployee: addEmployee,
  updateEmployeeRole: updateEmployeeRole,
  removeDepartment: removeDepartment,
  removeRole: removeRole,
  removeEmployee: removeEmployee,
};
