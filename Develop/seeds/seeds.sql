-- Department name --
INSERT INTO department (id,department_name)
VALUES  (1,"Sales"),
        (2,"Engineering"),
        (3,"Finance"),
        (4,"Legal");

-- Role in company --
INSERT INTO role (id,title,department_id,salary)
VALUES  (1,"Sales Manager", 1, 100000),
        (2,"Salesperson", 1, 75000),
        (3,"Lawyer", 4, 300000),
        (4,"Accountant", 3, 150000),
        (5,"Software Engineer", 2, 160000),
        (6,"Lead Engineer", 2, 175000),
        (7,"Materials Engineer", 2, 160000);


-- Employees at company --
INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUES   (1, "Bob", "Miller", 1, NULL),
         (2, "Ann", "Atwood", 2, NULL),
         (3, "Sue", "Woods", 3, 2),
         (4, "Tom", "Anderson", 4, 3),
         (5, "Amy", "Waters", 6, 2),
         (6, "Will", "Thomas", 5, 5),
         (7, "ED", "Thompson", 6, NULL);