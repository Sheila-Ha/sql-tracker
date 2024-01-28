//dependencies//
const inquirer = require("inquirer");
const server = require("./utils/server");
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
      "Add department",
      "Add role",
      "Add employee",
      "Update employee role",
      "Remove department",
      "Remove role",
      "Remove employee",
    ],
  },
];

const addDepartmentQuestions = [
  {
    type: "input",
    name: "departmentName",
    message: "Department name:"
  }
];

const addRoleQuestions = [
  {
    type: "input",
    name: "title",
    message: "Role name:"
  },
  {
    type: "input",
    name: "Salary",
    message: "Role salary:"
  },
  {
    type: "rawlist",
    name: "choices",
    message: "Which department does the role belong to?",
    choices: []
  }  
];

async function processResponse(response) {
  if (response === "View all departments") {
    console.table(await server.getAllDepartments());
  }
  if (response === "View all roles") {
    console.table(await server.getAllRoles());
  }
  if (response === "View all employees") {
    console.table(await server.getAllEmployees());
  }
  if (response === "Add department") {
    // Prompt the user for department information
    inquirer
    .prompt(addDepartmentQuestions)
    .then(async (response) => {
      console.log("add department - " + response.departmentName);
      // Pass the response to server.addDepartment
      console.table(await server.addDepartment(response.departmentName));
    })
    .catch((err) => {
      console.log(err);
    });
  }
  if (response === "Add role") {
    console.table(await server.addRole());
  }
  if (response === "Add employee") {
    console.table(await server.addEmployee());
  }
  if (response === "Update employee role") {
    console.table(await server.updateEmployeeRole());
  }
  if (response === "Remove department") {
    console.table(await server.removeDepartment());
  }
  if (response === "Remove role") {
    console.table(await server.removeRole());
  }
  if (response === "Remove employee") {
    console.table(await server.removeEmployee());
  }
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
