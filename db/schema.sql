DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE  employee_db;

USE employee_db;

CREATE TABLE department(
  id INT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL,
  title VARCHAR (30),
  salary DECIMAL,
  department)id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR (60),
  role id INT,
  manager_id INT NULL
);