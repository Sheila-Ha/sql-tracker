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

async function processResponse(response) {
  if (response === "View all departments") {
    console.table(await server.getAllDepartments());
  }

  async function processResponse(response) {
    if (response === "View all roles") {
      console.table(await server.getAddRoles());
    }
  }

  async function processResponse(response) {
    if (response === "View all employees") {
      console.table(await server.getAllEmployees());
    }
  }

  async function processResponse(response) {
    if (response === "View Add department") {
      console.table(await server.getAddDepartment());
    }
  }

  async function processResponse(response) {
    if (response === "View Add role") {
      console.table(await server.getAddRole());
    }
  }

  async function processResponse(response) {
    if (response === "View Add employee") {
      console.table(await server.getAddEmployee());
    }
  }

  async function processResponse(response) {
    if (response === "View Update employee role") {
      console.table(await server.getUpdateEmployeeRole());
    }
  }

  async function processResponse(response) {
    if (response === "View Remove department") {
      console.table(await server.getRemoveDepartment());
    }
  }

  async function processResponse(response) {
    if (response === "View Remove role") {
      console.table(await server.getRemoveRole());
    }
  }

  async function processResponse(response) {
    if (response === "View Remove employee") {
      console.table(await server.getRemoveEmployee());
    }
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
