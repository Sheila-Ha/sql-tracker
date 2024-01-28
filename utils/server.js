// Include packages needed for this application
const inquirer = require("inquirer"); //npm special software - const variable can not be reassigned
const mysql = require("mysql2/promise");
const express = require("express");

const PORT = process.env.PORT || 3301;
const app = express();

let roleChoices = [];

//sql connection to database
// const db = mysql.createConnection(
//   {
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "employees_db",
//   },
//   console.log(`Connected to the employees_db database.`)
// );

// //connect to server and launch app
// db.connect((err) => {
//   if (err) throw err;
//   console.log("Hello, welcome to the Employee Tracker.");
//   //start();
// });

// db.query("SELECT * FROM role", function (err, results) {
//   console.log(results);
//   roleChoices = results;
// });

// // create a new employee
// app.post('/api/new-employee', ({ body }, res) => {
//   const sql = `INSERT INTO employee (employee_name)
//     VALUES (?)`;
//   const params = [body.employee_name];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body,
//    });
//   });
// });

// // delete a employee
// app.delete('/api/employee/:id', (req, res) => {
//   const sql = `DELETE FROM employee WHERE id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//       message: 'Employee not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

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

async function addRole() {
  console.log("good day");
  const db = await getDBConnection();

  const [rows, fields] = await db.execute("SELECT * FROM add role");
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

// const viewAllDepartments

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

// // TODO: Create a function to write README file
// function writeToFile(fileName, data) { // function
//   fs.writeFileSync(fileName, data); // write file (synchronous version)
// }

// // TODO: Create a function to initialize app
// function init() {
//   inquirer.prompt(questions).then((responses) => { //ask questions, then proceed with responses
//     //console.log(responses);
//     //console.log(responses.description);
//     writeToFile("dist/README.md", generateEmployee(responses)); //write a new readme file from responses using generateMarkdown
//     //console.log("Creating your Employee File...");
//   }).catch((err) => {
//     //console.log(err);
//   });
// }
// //function call to initialize
// init();
//console.log('initializing the app...');

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
