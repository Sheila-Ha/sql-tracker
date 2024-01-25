INSERT INTO department (id,name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");
        

INSERT INTO role (title,department_id,salary)
VALUES  ("Sales Manager", 1, 100000),
        ("Salesperson", 1, 75000),
        ("Lawyer, 4, 300000"),
        ("Accountant", 3, 150000),
        ("Software Engineer", 2, 160000),
        ("Lead Engineer", 2 175000),
        ("Materials Engineer", 2, 160000);

INSERT INTO employee (first_name,last_name,role id,manager_id)
VALUES   ("Bob", "Miller", 1, 1),
         ("Ann", "Atwood", 2, NULL),
         ("Sue", "Woods", 3, 4),
         ("Tom", "Anderson", 4, 3),
         ("Will", "Thomas", 5, NULL),
         ("Amy", "Waters", 6, 2),
         ("ED", "Thompson", 6, NULL );