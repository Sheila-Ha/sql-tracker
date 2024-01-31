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
      //Choose to update employee role
      else if (response.menu == "Update employee role") {
        updateEmployeeRole();
      }
    });
}

/*const addDepartment = [
          {
            type: "input",
            name: "employee role",
            message: "What is the department name?",
          },
        ];
        inquirer.prompt(addDepartment).then((deptNameResponse) => {
          //Query database
          console.log(deptNameResponse.departmentName);
          db.query(
            `INSERT INTO department (department_name)
                VALUES ("${deptNameResponse.departmentName}");`,
            (err, results) => {
              console.log(1);

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
        });*/

//Choose to add role
// repeat

//Choose to add employee
// repeat

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

function addDepartment() {
  const addDepartment = [
    {
      type: "input",
      name: "departmentName",
      message: "What is the department name?",
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

function updateEmployeeRole() {
  // Get all employees from the database
  db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`, (err, results) => {
    console.log(results);
    //If err, log it and restart prompt
    if (err) {
      console.log(err);
      // init();
    }
    const employeeToUpdate = [
      {
        type: "rawlist",
        name: "employee",
        message: "Which employee would you like to update?",
        choices: results,
      },
    ];
    inquirer.prompt(employeeToUpdate).then((response) => {
      console.log('test 1');
      console.log(response);
      console.log('test 2');
      console.log(response.id);
      const selectedEmployee = response.employee;
      console.log('test 3');
      console.log(selectedEmployee);
      // Get all roles from the database
      db.query(`SELECT id, title FROM role`, (err, results) => {
        // console.log(results);
        //If err, log it and restart prompt
        if (err) {
          console.log(err);
          // init();
        }
        // Prompt the user to pick a role for the employee
        const employeeRole = [
          {
            type: "rawlist",
            name: "role",
            message: "Which role would you like to assign to the employee?",
            choices: results,
          },
        ];
        inquirer.prompt(employeeRole).then((response) => {
          //If err, log it and restart prompt
          if (err) {
            console.log(err);
            // init();
          }
          console.log(response);
          const selectedRole = response.role;
          console.log(selectedRole);
          // Update the employee's role in the database
          // db.query(
          //   `UPDATE employee SET role_id = (SELECT id FROM role WHERE title = "${selectedRole}") 
          //       WHERE id = (SELECT id FROM employee WHERE CONCAT(\`first_name\`, ' ', \`last_name\`) = "${selectedEmployee}")`,
          //   (err, results) => {
          //     //If err, log it and restart prompt
          //     if (err) {
          //       console.log(err);
          //       // init();
          //     }
          //     console.log(
          //       selectedEmployee + "'s role has been updated to " + selectedRole
          //     );
          //   }
          // );
        });
      });
    });
  });
}

init();
