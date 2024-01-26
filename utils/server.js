// Include packages needed for this application
const inquirer = require("inquirer"); //npm special software - const variable can not be reassigned
const mysql = require("mysql2");
const fs = require("fs"); //const file system (fs) to read files on my pc 
const generateEmployee = require("./utils/generateEmployee"); //require is built in function, passing location name as argument

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_db",
});

//user prompted for choices 
const promptUser = () => {
  inquirer
    .prompt([ 
      {
        name: "choices",
        type: "list",
        message: "Select from options below",
        choices: [
          "View All departments",
          "View All roles",
          "View All employees",
          "add a department",
          "add a role",
          "add an employee",
          "update a employee role",
        ],
      },
    ])
    // based on chosen choices then view/add or update
    .then((answers) => {
      const {choices} = answers;
      if (choices === "View All departments") {
        viewAllDepartments();
      }
      if (choices === "View All roles") {
        viewAllRoles();
      }
      if (choices === "View All employees") {
        viewAllEmployees();
      }
      if (choices === "add a department") {
        addADepartment();
      }
      if (choices === "add a role") {
        addARole();
      }
      if (choices === "add an employee") {
        addAnEmployee();
      }
      if (choices === "update a employee role") {
        updateAEmployeeRole();
      };
    })
  };
// TODO: Create a function to write README file
function writeToFile(fileName, data) { // function
  fs.writeFileSync(fileName, data); // write file (synchronous version)
}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((responses) => { //ask questions, then proceed with responses
    //console.log(responses);
    //console.log(responses.description);
    writeToFile("dist/README.md", generateEmployee(responses)); //write a new readme file from responses using generateMarkdown
    //console.log("Creating your Employee File...");
  }).catch((err) => {
    //console.log(err);
  });
}
//function call to initialize
init();
//console.log('initializing the app...'); 