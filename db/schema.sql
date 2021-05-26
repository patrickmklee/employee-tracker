DROP DATABASE IF EXISTS employeetrackdb;
CREATE DATABASE employeetrackdb;
USE employeetrackdb;



CREATE TABLE departments(
  id  INT AUTO_INCREMENT NOT NULL,
  name VARCHAR (30) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE roles(
  id INT  AUTO_INCREMENT NOT NULL,
  title VARCHAR (30) NOT NULL,
  salary DECIMAL (10,2) NOT NULL,
  department_id INTEGER(11) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE employees(
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(11) NOT NULL,
  manager_id INTEGER(11),
  PRIMARY KEY (id)
);

