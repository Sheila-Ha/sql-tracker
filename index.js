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
    server.getAllDepartments().then((results) => {
      console.table(results[0]);
      //console.log('test 1');
      // TO DO -- see if the first column marked (index) can be removed
      // or if there's a better way to return this or something to get rid of that
      //Setting the conditions to call the questions again
      init();
    });
  }
  //console.log('test 2');
  if (response === "View all roles") {
    server.getAllRoles().then((results) => {
      console.table(results[0]);
      // Show the menu again
      init();
    });
  }
  if (response === "View all employees") {
    server.getAllEmployees().then((results) => {
      console.table(results[0]);
      // Show the menu again
      init();
    });
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
      message: "Department name:",
    },
  ];
  // Prompt the user for department information
  inquirer
    .prompt(addDepartmentQuestions)
    .then((response) => {
      console.log("add department - " + response.departmentName);
      // Pass the response to server.addDepartment
      // console.table(server.addDepartment(response.departmentName));
      server.addDepartment(response.departmentName).then((results) => {
        // console.table(results[0]);
        // init();
        console.log(results);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function addRole() {
  // First, get all the current departments from the server
  server.getAllDepartments().then((dep) => {
    console.log(dep);
    // Loop through the department names to create a list of choices
    let choicesList = [];
    for (let i = 0; i < dep.length; i++) {
      choicesList.push(dep[i].department_name);
    }
    const addRoleQuestions = [
      {
        type: "input",
        name: "title",
        message: "Role name:",
      },
      {
        type: "input",
        name: "salary",
        message: "Role salary:",
      },
      {
        type: "rawlist",
        name: "department",
        message: "Which department does the role belong to?",
        choices: choicesList,
      },
    ];
    // Second, prompt the user for the role info (using the departments list)
    // inquirer
    //   .prompt(addRoleQuestions)
    //   .then((response) => {
    //     // Third, insert the role
    //     // Pass the response to server.addRole
    //     console.table(server.addRole(response));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
    managerChoicesList.push(
      employees[i].first_name + " " + employees[i].last_name
    );
  }
  const addEmployeeQuestions = [
    {
      type: "input",
      name: "firstName",
      message: "Employee first name:",
    },
    {
      type: "input",
      name: "lastName",
      message: "Employee last name:",
    },
    {
      type: "rawlist",
      name: "role",
      message: "What is the employee's role?",
      choices: roleChoicesList,
    },
    {
      type: "rawlist",
      name: "manager",
      message: "Who is the employee's manager?",
      choices: managerChoicesList,
    },
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







// setting/holding old server syntax here while reformat in new file

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
 
  return db.query("SELECT * FROM role"); 
}

function getAllEmployees() {
  console.log("bye");

  return db.query("SELECT * FROM employee");
}

function addDepartment(departmentName) {
  console.log("hola");
 
  return db.query("SELECT * FROM departmentName");
}

function addRole(roleInfo) {
  console.log("good day");
  console.log(roleInfo);
  // Get department ID (primary key)
  db.query(
    `SELECT id FROM department WHERE department_name="${roleInfo.department}"`
  ).then(result => {
    console.log(result);
  });
  // const departmentId = rows1[0].id;
  // console.log(departmentId);
  // // The department ID is a foreign key in the role table
  // const [rows, fields] =
  //   db.execute(`INSERT INTO role (title, department_id, salary) 
  //                                          VALUES ("${roleInfo.title}",
  //                                          ${departmentId},
  //                                          "${roleInfo.salary}")`);
  // return rows;
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
