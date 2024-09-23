INSERT INTO departments (id, dept_name) VALUES 
    (1, 'Sales'),
    (2, 'Service'),
    (3, 'Legal'),
    (4, 'Human Resources'),
    (5, 'Engineering'),
    (6, 'Finance');

INSERT INTO roles (id, title, salary, department_id) VALUES
    (1, 'Salesperson', 80000, 1),
    (2, 'Sales Manager', 100000, 1),
    (3, 'Customer Service', 80000, 2),
    (4, 'Service Manager', 100000, 2),
    (5, 'Lawyer', 120000, 3),
    (6, 'Legal Team Lead', 250000, 3),
    (7, 'HR Representative', 90000, 4),
    (8, 'HR Team Lead', 120000, 4),
    (9, 'Software Engineer', 120000, 5),
    (10, 'Lead Engineer', 150000, 5),
    (11, 'Accountant', 110000, 6),
    (12, 'Account Manager', 140000, 6);

INSERT INTO employees (id, first_name, last_name, role_id) VALUES
    (1, 'Ethan', 'Owens', 1),
    (2, 'Elyssa', 'Childress', 2),
    (3, 'Elton', 'Owens', 3),
    (4, 'Maverick', 'Owens', 4),
    (5, 'John', 'Doe', 5),
    (6, 'Jane', 'Doe', 6),
    (7, 'Mike', 'Hawk', 7),
    (8, 'Phil', 'McCracken', 8),
    (9, 'Hugh', 'Janus', 9),
    (10, 'Haywood', 'Jablomi', 10),
    (11, 'Dixon', 'Butts', 11),
    (12, 'Jenny', 'Tulworts', 12);

SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name
FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id;