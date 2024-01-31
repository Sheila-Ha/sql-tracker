// Include packages needed for this application
const mysql = require("mysql2");
const db = require("mysql-promise")();


const options = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees_db",
};
db.configure(options, mysql);

//Export the server.js for use in app.js 
module.exports = db;