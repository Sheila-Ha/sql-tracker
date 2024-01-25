// TODO: Include packages needed for this application
const inquirer = require("inquirer"); //npm special software - const variable can not be reassigned
const mysql2 = require("mysql2");
const fs = require("fs"); //const file system (fs) to read files on my pc 
const generateEmployee = require("./utils/generateEmployee"); //require is built in function, passing location name as argument

// TODO: Create an array of questions for user input
const questions = [ 
  {
    type: "input", // used for single line responses
    name: "title", //name of configuration
    message: "What would you like to do?", //question prompt in console.log
  },
  {
    type: "input",
    name: "name",
    message: "What is th name of the department?",
  },
  {
    Added Service to the database,
  };
  {
    type: "input",
    name: "would like",
    message: "What would you like to do?",
  },
  {
    type: "input",
    name: "role name",
    message: "What is the name of the role?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary of the role?",
  },
  {
    type: "input",
    name: "belong to",
    message: "Which department does the role belong to?",
  },

  {
    Add Customer Service to the database;
  },
  {
    type: "input",
    name: "like to do",
    message: "What would you like to do?",
  },
  {
    type: "input",
    name: "first name",
    message: "What is the employee's first name?",
  },
  {
    type: "input",
    name: "last name",
    message: "What is the employees last name?",
  },
  {
    type: "rawlist",
    name: "emp role",
    message: "What is the employee's role?",
    choices: ["Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"],
  },
  // {
  //   type: "editor",
  //   name: "contributing",
  //   message: "What are contributing sources?",
  // },
  // {
  //   type: "rawlist", //select 1 from choices
  //   name: "license",
  //   message: "Select a license for your project",
  //   choices: ["MIT", "APACHE2.0", "Boost1.0", "MPL2.0", "BSD3", "GNU3", "none"],
  // },
  
];

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