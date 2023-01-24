DROP DATABASE IF EXISTS employeeDb;
CREATE DATABASE employeeDb;
USE employeeDb;

CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(20) UNIQUE NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    role_id INT NOT NULL
);