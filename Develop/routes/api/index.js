//dependencies//
const inquirer = require("inquirer");
const server = require("../../../utils/server");
//const mysql = require('mysql2');

//const PORT = process.env.PORT || 3001;
//const app = express();

//user prompted for choices
const questions = [
  {
    type: "rawlist",
    name: "choices",
    message: "What would you like to do?", 
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Remove a department",
      "Remove a role",
      "Remove an employee",
    ],
  },
];

function processResponse(response) {
  if (response === "View all departments") {
    server.getAllDepartments();
  }
  if (response === "View all roles") {
    server.getAllRoles();
  }
  if (response === "View all employees") {
    server.getAllEmployees();
  }
  if (response === "Add a department") {
    server.addADepartment();
  }
  if (response === "Add a role") {
    server.addARole();
  }
  if (response === "Add an employee") {
    server.addAnEmployee();
  }
  if (response === "Update an employee role") {
    server.updateAnEmployeeRole();
  }
  if (response === "Remove a department") {
    server.removeADepartment();
  }
  if (response === "Remove a role") {
    server.removeARole();
  }
  if (response === "Remove an employee") {
    server.removeAnEmployee();
  }
  init();
}

function init() {
  //ask questions, then proceed with response
  inquirer
    .prompt(questions)
    .then((response) => {
      //console.log(response.choices);
      processResponse(response.choices);
    })
    .catch((err) => {
      console.log(err);
    });
}

// To run: node index.js
init();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
/*const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);*/

// // Query database
// db.query('SELECT * FROM students', function (err, results) {
//   console.log(results);
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });