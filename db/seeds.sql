INSERT INTO departments (name) 
VALUES ("sales"), ("r&d"), ("finance");


INSERT INTO roles (title, salary, department_id) 
VALUES ("Sales Associate", 50000.00, 1 ), ("Sales Manager", 100000.00, 1), ("Engineering Manager", 150000.00, 2), ("Engineer", 85000.00, 2),("Financial Analyst", 120000.00, 3), ("Accountant", 65000.00, 3) ;


INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ("eric", "ericsson", 3, null ), ("paul", "paulson", 4, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("jerry", "johnson", 2, null ), ("john" , "smith", 1, 3), ("phil", "dude", 1, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("stacy", "stacyson", 5, null ), ("brenda" , "pavlovski", 6, null), ("johnny", "football", 5, null);

-- INSERT INTO employees (employeeName,employeeRole)
-- VALUES ("eric", "sales");


-- INSERT INTO employees (employeeName,employeeRole)
-- VALUES  ("paul", "engineer");


-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);