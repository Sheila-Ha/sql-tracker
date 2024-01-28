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
  // Get department ID (primary key)
  const [rows1, fields1] = await db.execute(`SELECT id FROM department WHERE department_name="${roleInfo.department}"`);
  const departmentId = rows1[0].id;
  console.log(departmentId);
  // The department ID is a foreign key in the role table
  const [rows, fields] = await db.execute(`INSERT INTO role (title, department_id, salary) 
                                           VALUES ("${roleInfo.title}",
                                           ${departmentId},
                                           "${roleInfo.salary}")`);
  return rows;
}

async function addEmployee(employeeInfo) {
  console.log("good bye");
  const db = await getDBConnection();

  // Get role ID (primary key)
  const [rows1, fields1] = await db.execute(`SELECT id FROM role WHERE title="${employeeInfo.role}";`);
  const roleId = rows1[0].id;
  console.log(roleId);
  // Get manager ID (primary key)
  // Escape tick \`
  const [rows2, fields2] = await db.execute(`SELECT id FROM employee WHERE CONCAT(\`first_name\`, ' ', \`last_name\`) = "${employeeInfo.manager}";`);
  const managerId = rows2[0].id;
  console.log(managerId);

  const [rows, fields] = await db.execute(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                           VALUES (${employee.firstName},
                                                   ${employee.lastName},
                                                   ${roleId},
                                                   ${managerId});`);
  return rows;
}

async function updateEmployeeRole() {
  console.log("adios");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute(``);
  // UPDATE EMPLOYEE
  // SET role_id = whatever the new role ID is
  // WHERE id = the id of the employee you want to update
  return rows;
}

async function removeDepartment() {
  console.log("bueno");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute(``);
  // DELETE FROM department
  // WHERE id = the id of the department you want to delete
  return rows;
}

async function removeRole() {
  console.log("mahalo");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute(``);
  // DELETE FROM role
  // WHERE id = the id of the role you want to delete
  return rows;
}

async function removeEmployee() {
  console.log("good night");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute(``);
  // DELETE FROM employee
  // WHERE id = the id of the employee you want to delete

  // You will want to test this to see what happens if you try to delete a manager
  // Remember their ID is a foreign key on other employee's records (manager_id)
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
  addDepartment: addDepartment,
  addRole: addRole,
  addEmployee: addEmployee,
  updateEmployeeRole: updateEmployeeRole,
  removeDepartment: removeDepartment,
  removeRole: removeRole,
  removeEmployee: removeEmployee,
};
