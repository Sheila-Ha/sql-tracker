//Dependencies//
const inquirer = require("inquirer");
const server = require("./utils/server");
//const mysql = require('mysql2');

//const PORT = process.env.PORT || 3001;
//const app = express();

//User prompted for choices
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

function processResponse(response) {
  if (response === "View all departments") {
    console.table(server.getAllDepartments());
  }
  if (response === "View all roles") {
    console.table(server.getAllRoles());
  }
  if (response === "View all employees") {
    console.table(server.getAllEmployees());
  }
  if (response === "Add department") {
    addDepartment();
  }
  if (response === "Add role") {
    addRole();
  }
  if (response === "Add employee") {
    addEmployee();
  }
  if (response === "Update employee role") {
    console.table(server.updateEmployeeRole());
  }
  if (response === "Remove department") {
    console.table(server.removeDepartment());
  }
  if (response === "Remove role") {
    console.table(server.removeRole());
  }
  if (response === "Remove employee") {
    console.table(server.removeEmployee());
  }
}

function addDepartment() {
  const addDepartmentQuestions = [
    {
      type: "input",
      name: "departmentName",
      message: "Department name:"
    }
  ];
  // Prompt the user for department information
  inquirer
  .prompt(addDepartmentQuestions)
  .then((response) => {
    console.log("add department - " + response.departmentName);
    // Pass the response to server.addDepartment
    console.table(server.addDepartment(response.departmentName));
  })
  .catch((err) => {
    console.log(err);
  });  
}

function addRole() {
  // First, get all the current departments from the server
  const departments = server.getAllDepartments();
  console.log(departments);
  // Loop through the department names to create a list of choices
  let choicesList = [];
  for (let i = 0; i < departments.length; i++) {
    choicesList.push(departments[i].department_name);
  }
  const addRoleQuestions = [
    {
      type: "input",
      name: "title",
      message: "Role name:"
    },
    {
      type: "input",
      name: "salary",
      message: "Role salary:"
    },
    {
      type: "rawlist",
      name: "department",
      message: "Which department does the role belong to?",
      choices: choicesList
    }  
  ];
  // Second, prompt the user for the role info (using the departments list)
  inquirer
  .prompt(addRoleQuestions)
  .then((response) => {
    // Third, insert the role
    // Pass the response to server.addRole
    console.table(server.addRole(response));
  })
  .catch((err) => {
    console.log(err);
  });  
}

function addEmployee() {
  // First, get all the current roles from the server
  const roles = server.getAllRoles();
  //console.log(roles);
  // Loop through the role names to create a list of choices
  let roleChoicesList = [];
  for (let i = 0; i < roles.length; i++) {
    roleChoicesList.push(roles[i].title);
  }
  // Second, get all the current employees from the server
  const employees = server.getAllEmployees();
  //console.log(employees);
  // Loop through the employee names to create a list of choices
  let managerChoicesList = [];
  for (let i = 0; i < employees.length; i++) {
    // Concat first/last name
    managerChoicesList.push(employees[i].first_name + " " + employees[i].last_name);
  }
  const addEmployeeQuestions = [
    {
      type: "input",
      name: "firstName",
      message: "Employee first name:"
    },
    {
      type: "input",
      name: "lastName",
      message: "Employee last name:"
    },
    {
      type: "rawlist",
      name: "role",
      message: "What is the employee's role?",
      choices: roleChoicesList
    },
    {
      type: "rawlist",
      name: "manager",
      message: "Who is the employee's manager?",
      choices: managerChoicesList
    }
  ];
  // Third, prompt the user for the role info (using the departments list)
  inquirer
  .prompt(addEmployeeQuestions)
  .then((response) => {
    // Fourth, insert the employee
    // Pass the response to server.addEmployee
    console.table(server.addEmployee(response));
  })
  .catch((err) => {
    console.log(err);
  });   
}

function init() {
  //Ask questions, then proceed with response
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
