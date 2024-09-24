INSERT INTO departments (dept_name) VALUES 
    ('Sales'),
    ('Service'),
    ('Legal'),
    ('Human Resources'),
    ('Engineering'),
    ('Finance');

INSERT INTO roles (title, salary, department_id) VALUES
    ('Salesperson', 80000, 1),
    ('Sales Manager', 100000, 1),
    ('Customer Service', 80000, 2),
    ('Service Manager', 100000, 2),
    ('Lawyer', 120000, 3),
    ('Legal Team Lead', 250000, 3),
    ('HR Representative', 90000, 4),
    ('HR Team Lead', 120000, 4),
    ('Software Engineer', 120000, 5),
    ('Lead Engineer', 150000, 5),
    ('Accountant', 110000, 6),
    ('Account Manager', 140000, 6);

INSERT INTO employees (first_name, last_name, role_id) VALUES
    ('Ethan', 'Owens', 1),
    ('Elyssa', 'Childress', 3),
    ('Elton', 'Owens', 5),
    ('Maverick', 'Owens', 7),
    ('John', 'Doe', 9),
    ('Jane', 'Doe', 11),
    ('Mike', 'Jones', 12),
    ('Phil', 'Richardson', 10),
    ('Hugh', 'Morris', 8),
    ('Harry', 'Jameson', 6),
    ('Benjamin', 'Dixon', 4),
    ('Jenny', 'Stevenson', 2);

SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name
FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id;