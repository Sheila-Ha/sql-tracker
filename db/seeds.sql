INSERT INTO department (id,department_name)
VALUES  (1,"Sales"),
        (2,"Engineering"),
        (3,"Finance"),
        (4,"Legal");

INSERT INTO role (title,department_id,salary)
VALUES  ("Sales Manager", 1, 100000),
        ("Salesperson", 1, 75000),
        ("Lawyer", 4, 300000),
        ("Accountant", 3, 150000),
        ("Software Engineer", 2, 160000),
        ("Lead Engineer", 2, 175000),
        ("Materials Engineer", 2, 160000);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUES   (1, "Bob", "Miller", 1, NULL),
         (2, "Ann", "Atwood", 2, NULL),
         (3, "Sue", "Woods", 3, 2),
         (4, "Tom", "Anderson", 4, 3),
         (5, "Amy", "Waters", 6, 2),
         (6, "Will", "Thomas", 5, 5),
         (7, "ED", "Thompson", 6, NULL);