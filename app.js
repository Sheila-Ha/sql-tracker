//Dependencies / packages needed for this application
const inquirer = require("inquirer");
//Package to print rows to console
// const consoleTable = require("console.table");
//
// const init =
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
      //View all roles
      else if (response.menu == "View all roles") {
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
      //View all employees
      else if (response.menu == "View all employees") {
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
      //Add a department
      else if (response.menu == "Add department") {
        const addDepartment = [
          {
            type: "input",
            name: "departmentName",
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
        });
      }
    });
}


//Choose to add role
    // repeat
//Choose to add employee
    // repeat
//Choose to update employee role



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

init();
