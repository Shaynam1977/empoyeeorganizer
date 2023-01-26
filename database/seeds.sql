USE employeeDb;

INSERT INTO department(name)
VALUES ("sales"), ("shipping"), ("lagistics");

INSERT INTO role(title, salary, department_id)
VALUES ("manager", 80000, 1), ("clerk", 40000, 2), ("HR", 75000, 3);

INSERT INTO employee(first_name, last_name, role_id)
VALUES ("Mark", "Johnson", 1), ("Sarah", "Merrik", 2), ("John", "Hopkins", 3);