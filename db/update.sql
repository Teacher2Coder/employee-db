UPDATE employees
SET first_name = 'Maverick', last_name = 'The Dog', role_id = 3
WHERE first_name = 'Maverick';

SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name
FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id;