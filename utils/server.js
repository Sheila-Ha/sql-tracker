// Include packages needed for this application
const inquirer = require("inquirer"); //npm special software - const variable can not be reassigned
const mysql = require("mysql2");
//const fs = require("fs"); //const file system (fs) to read files on my pc
let roleChoices = [];

//sql connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees_db",
});

//connect to server and launch app
/*db.connect((err) => {
  if (err) throw err;
  console.log("Hello, welcome to the Employee Tracker.");
  //start();
});*/

// db.query("SELECT * FROM role", function (err, results) {
//   console.log(results);
//   roleChoices = results;
// });

function getAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.log(results);
    return results;
  });
}

//
//const viewAllDepartments

//add employee function
function addEmployee() {
  const query = "";

  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      name: "roles",
      message: "What is the employee's role?",
      choices: roleChoices,
    },
    {
      type: "confirm",
      name: "supervisor",
      message: "Does the employee have a manager?",
    } /*,
    {
      type: "list",
      name: "manager",
      message: "Who is the employee's manager?",
      choices: name,
      when: (answers) => answers.supervisor,
    },*/,
  ]);
}

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

module.exports = {
  getAllDepartments: getAllDepartments
};