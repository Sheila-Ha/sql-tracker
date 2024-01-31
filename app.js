//Dependencies / packages needed for this application
const inquirer = require("inquirer");
const db = require("./utils/server");

function init() {
  //User prompted with a list of choices
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "menu",
        message: "What would you like to do?",
        //An array of choices to select from
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add department",
          "Add role",
          "Add employee",
          "Update employee role",
          "Delete department",
          "Delete role",
          "Delete employee",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      // console.log(response);
      //View all departments
      if (response.menu == "View all departments") {
        viewAllDepartments();
      }
      //View all roles
      else if (response.menu == "View all roles") {
        viewAllRoles();
      }
      //View all employees
      else if (response.menu == "View all employees") {
        viewAllEmployees();
      }
      //Add a department
      else if (response.menu == "Add department") {
        addDepartment();
      }
      //Add a role
      else if (response.menu == "Add role") {
        addRole();
      }
      //Add an employee
      else if (response.menu == "Add employee") {
        addEmployee();
      }
      //Delete department
      else if (response.menu == "Delete department") {
        deleteDepartment();
      }
      //Delete role
      else if (response.menu == "Delete role") {
        deleteRole();
      }
      //Delete employee
      else if (response.menu == "Delete employee") {
        deleteEmployee();
      }
      //Choose to update employee role
      else if (response.menu == "Update employee role") {
        updateEmployeeRole();
      }
    });
}

//Query database
// let deleteDepartment = "";
// //Choose to delete department
// db.query(
//   `DELETE FROM department WHERE id =?`,
//   deleteDepartment,
//   (err, result) => {
//     if (err) {
//       console.log(result);
//     }
//   }
// );

// //Query database
// let deleteRole = "";
// //Choose to delete role
// db.query(`DELETE FROM role WHERE id =?`, deleteRole, (err, result) => {
//   if (err) {
//     console.log(result);
//   }
// });

// // Query database
// let deleteEmployee = "";
// //Choose to delete employee
// db.query(`DELETE FROM employee WHERE id = ?`, deleteEmployee, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//See departments
function viewAllDepartments() {
  //Query database
  db.query(`SELECT * FROM department`, (err, results) => {
    // console.log(results);
    //If err, log it and restart prompt
    if (err) {
      console.log(err);
      // init();
    }
    //Display result and restart prompts
    console.table(results);
    init();
  });
}

// See roles
function viewAllRoles() {
  //Query database
  db.query(`SELECT * FROM role`, (err, results) => {
    // console.log(results);
    //If err, log it and restart prompt
    if (err) {
      console.log(err);
      // init();
    }
    //Display result and restart prompts
    console.table(results);
    init();
  });
}

// See employees
function viewAllEmployees() {
  //Query database
  db.query(`SELECT * FROM employee`, (err, results) => {
    // console.log(results);
    //If err, log it and restart prompt
    if (err) {
      console.log(err);
      // init();
    }
    //Display result and restart prompts
    console.table(results);
    init();
  });
}
//Add a new department
function addDepartment() {
  const addDepartment = [
    {
      type: "input",
      name: "departmentName",
      message: "What is the new department name?",
    },
  ];
  inquirer.prompt(addDepartment).then((deptNameResponse) => {
    //Query database
    //console.log(deptNameResponse.departmentName);
    db.query(
      `INSERT INTO department (department_name)
          VALUES ("${deptNameResponse.departmentName}");`,
      (err, results) => {
        //If err, log it and restart prompt
        if (err) {
          console.log(err);
          // init();
        }
        db.query(`SELECT * FROM department`, (err, results) => {
          // console.log(results);
          //If err, log it and restart prompt
          if (err) {
            console.log(err);
            // init();
          }
          //Display result and restart prompts
          console.table(results);
          init();
        });
      }
    );
  });
}

//Add a new role
function addRole() {
  const addRole = [
    {
      type: "input",
      name: "roleName",
      message: "What is the new role name?",
    },
  ];
  inquirer.prompt(addRole).then((roleNameResponse) => {
    //Query database
    // console.log(roleNameResponse.roleName);
    db.query(
      `INSERT INTO role (role_name)
          VALUES ("${roleNameResponse.roleName}");`,
      (err, results) => {
        //If err, log it and restart prompt
        if (err) {
          console.log(err);
          // init();
        }
        db.query(`SELECT * FROM role`, (err, results) => {
          console.log(results);
          //If err, log it and restart prompt
          if (err) {
            console.log(err);
            // init();
          }
          //Display result and restart prompts
          console.table(results);
          init();
        });
      }
    );
  });
}

//Add new employee
function addEmployee() {
  //Get all roles from the database
  db.query(`SELECT id, title FROM role`, (err, results) => {
    // console.log(results);
    //If err, log it and restart prompt
    if (err) {
      console.log(err);
      // init();
    }
    // Create a list of roles for the user to choose from - for loop
    let roleList = [];
    for (let i = 0; i < results.length; i++) {
      roleList.push({ value: results[i].id, name: results[i].title });
    }
    //Get all employees form the database
    db.query(
      `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`,
      (err, results) => {
        //console.log(results);
        //If err, log it and restart prompt
        if (err) {
          console.log(err);
          // init();
        }
        // Create a list of employees for the user to choose from - for loop
        let employeeList = [];
        for (let i = 0; i < results.length; i++) {
          employeeList.push({ value: results[i].id, name: results[i].name });
        }

        const addEmployee = [
          //Employee first name
          {
            type: "input",
            name: "employeeFirstName",
            message: "What is the first name of the new employee?",
          },
          //Employee last name
          {
            type: "input",
            name: "employeeLastName",
            message: "What is the last name of the new employee?",
          },
          //Role selection
          {
            type: "rawlist",
            name: "role",
            message: "Which role would you like to assign to the employee?",
            choices: roleList,
          },
          //Manager selection
          {
            type: "rawlist",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: employeeList,
          },
  
        ];
        inquirer.prompt(addEmployee).then((newEmployeeResponse) => {
          console.log(newEmployeeResponse);
          //Query database
          // console.log(employeeNameResponse.employeeName);
          // db.query(
          //   `INSERT INTO employee (first_name, last_name, role_id, manager_id)
          // VALUES ("${employeeNameResponse.employeeName}");`,
          //   (err, results) => {
          //     //If err, log it and restart prompt
          //     if (err) {
          //       console.log(err);
          //       // init();
          //     }
          //     db.query(`SELECT * FROM employee`, (err, results) => {
          //       console.log(results);
          //       //If err, log it and restart prompt
          //       if (err) {
          //         console.log(err);
          //         // init();
          //       }
          //       //Display result and restart prompts
          //       console.table(results);
          //       init();
          //     });
          //   }
          // );
        });
      }
    );
  });
}

//Update an employee
function updateEmployeeRole() {
  // Get all employees from the database
  db.query(
    `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`,
    (err, results) => {
      //console.log(results);
      //If err, log it and restart prompt
      if (err) {
        console.log(err);
        // init();
      }
      // Create a list of employees for the user to choose from - for loop
      let employeeList = [];
      for (let i = 0; i < results.length; i++) {
        employeeList.push({ value: results[i].id, name: results[i].name });
      }
      //console.log(employeeList);
      const employeeToUpdate = [
        {
          type: "rawlist",
          name: "employee",
          message: "Which employee would you like to update?",
          choices: employeeList,
        },
      ];
      inquirer.prompt(employeeToUpdate).then((response) => {
        const selectedEmployee = response.employee;
        //console.log(selectedEmployee);
        // Get all roles from the database
        db.query(`SELECT id, title FROM role`, (err, results) => {
          // console.log(results);
          //If err, log it and restart prompt
          if (err) {
            console.log(err);
            // init();
          }
          // Create a list of roles for the user to choose from - for loop
          let roleList = [];
          for (let i = 0; i < results.length; i++) {
            roleList.push({ value: results[i].id, name: results[i].title });
          }
          // Prompt the user to pick a role for the employee
          const employeeRole = [
            {
              type: "rawlist",
              name: "role",
              message: "Which role would you like to assign to the employee?",
              choices: roleList,
            },
          ];
          inquirer.prompt(employeeRole).then((response) => {
            //If err, log it and restart prompt
            if (err) {
              console.log(err);
              // init();
            }
            //console.log(response);
            const selectedRole = response.role;
            //console.log(selectedRole);
            //Update the employee's role in the database
            db.query(
              `UPDATE employee SET role_id = ${selectedRole} WHERE id = ${selectedEmployee};`,
              (err, results) => {
                //If err, log it and restart prompt
                if (err) {
                  console.log(err);
                  // init();
                }
                console.log("Complete");
                init();
              }
            );
          });
        });
      });
    }
  );
}

//Delete a department
function deleteDepartment() {
  const deleteDepartment = [
    {
      type: "input",
      name: "department Name",
      message: "What is the name of the deleted department?",
    },
  ];
  inquirer.prompt(deleteDepartment).then((deleteDepartmentResponse) => {
    //Query database
    console.log(deleteDepartmentResponse.roleName);
    db.query(
      `DELETE FROM department WHERE department_name="${deleteDepartmentResponse.roleName}"`,
      (err, results) => {
        //If err, log it and restart prompt
        if (err) {
          console.log(err);
          // init();
        }
        // db.query(`SELECT * FROM role`, (err, results) => {
        //   console.log(results);
        //   //If err, log it and restart prompt
        //   if (err) {
        //     console.log(err);
        //     // init();
        //   }
        //   //Display result and restart prompts
        //   console.table(results);
        //   init();
        // });
      }
    );
  });
}

//Delete role
function deleteRole() {
  const deleteRole = [
    {
      type: "input",
      name: "role Name",
      message: "What is the name of the deleted role?",
    },
  ];
  inquirer.prompt(deleteRole).then((deleteRoleResponse) => {
    //Query database
    console.log(deleteRoleResponse.roleName);
    db.query(
      `DELETE FROM department;
          VALUES ("${deleteRoleResponse.roleName}");`,
      (err, results) => {
        //If err, log it and restart prompt
        if (err) {
          console.log(err);
          // init();
        }
        // db.query(`SELECT * FROM role`, (err, results) => {
        //   console.log(results);
        //   //If err, log it and restart prompt
        //   if (err) {
        //     console.log(err);
        //     // init();
        //   }
        //   //Display result and restart prompts
        //   console.table(results);
        //   init();
        // });
      }
    );
  });
}

//Delete an employee
function deleteEmployee() {
  const deleteEmployee = [
    {
      type: "input",
      name: "Employee Name",
      message: "What is the name of the deleted role?",
    },
  ];
  inquirer.prompt(deleteRole).then((deleteRoleResponse) => {
    //Query database
    console.log(deleteRoleResponse.roleName);
    db.query(
      `DELETE FROM department;
          VALUES ("${deleteRoleResponse.roleName}");`,
      (err, results) => {
        //If err, log it and restart prompt
        if (err) {
          console.log(err);
          // init();
        }
        // db.query(`SELECT * FROM role`, (err, results) => {
        //   console.log(results);
        //   //If err, log it and restart prompt
        //   if (err) {
        //     console.log(err);
        //     // init();
        //   }
        //   //Display result and restart prompts
        //   console.table(results);
        //   init();
        // });
      }
    );
  });
}

init();
