// Include packages needed for this application
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_db",
});
db.connect(function (err) {
  if (err) {
    throw err;
  }
});

//Export the server.js for use in app.js
module.exports = db;
