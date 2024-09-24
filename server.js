// Import packages
const { Pool } = require('pg');
const inquirer = require('inquirer');
const http = require('http');

// Import questions
const questions = require('./inquirer/questions');
const initQuestion = questions[0]
const addDeptQuestion = questions[1]
const addRoleQuestions = questions[2]
const addEmployeeQuestions = questions[3]
const updateEmployeeRoleQuestions = questions[4];

// Import helper functions
const {findEmployeeId, findRoleId, findDeptId} = require('./db/helpers/find-id')


// Call server
const server = http.createServer(function (req, res) {
  res.write("Server started");
  res.end();
})
server.listen(3001);


// Image to be displayed on startup
const funImage = String.raw`
.------------------------------------------------------------------------.
|                                                                        |
|     ______                     _                                       |
|    | _____|                   | |                                      |
|    | |____  _ __ ___    _ __  | |   ___    _   _   _____    _____      |
|    |  ____||  _ ' _  \ |     \| | / __  \ | | | | /  __ \  /  __ \     |
|    | |____ | | | | | | | |_) || || (__)  || |_| ||  ____/ |  ____/     |
|    |______||_| |_| |_| | .__/ |_| \ ___ /  \__  | \______| \______|    |
|                        |_|                  |__/                       |
|                                                                        |
|       __   __                                                          |
|      |  \_/  |                                                         |
|      |       |   ___ _   _ __     ___ _    __ _    _____    _ __       |
|      | |\_/| |  / _ ' | |  _  \  / _ ' |  / _  |  /  __ \  | '__|      |
|      | |   | | | (_|  | | | | | | (_|  | | (_| | |  ____/  | |         |
|      |_|   |_|  \___,_| |_| |_|  \___,_|  \__, |  \______| |_|         |
|                                           |___/                        |
.------------------------------------------------------------------------.
`

// Creates pool with login creditials
const pool = new Pool(
    {
      user: 'postgres',
      password: 'teacher2coder',
      host: 'localhost',
      database: 'employees_db'
    },
    console.log(funImage)
)

pool.connect();


// Displays all employees from employee table
function handleViewEmployees() {
  pool.query(`SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id;`, 
    async (err, { rows }) => {
    try {
      console.table(rows);
    } catch (err) {
      console.error(err)
    } finally {
      init();
    }
  })
}


// Displays all roles from roles table
function handleViewRoles() {
  pool.query(`SELECT roles.title, roles.salary, departments.dept_name FROM roles JOIN departments ON roles.department_id = departments.id;`, async (err, { rows }) => {
    try {
      console.table(rows);
    } catch (err) {
      console.error(err)
    } finally {
      init();
    }
  })
}


// Displays all departments from the departments table
function handleViewDepts() {
  pool.query(`SELECT dept_name FROM departments`, async (err, { rows }) => {
    try {
      console.table(rows);
    } catch (err) {
      console.error(err)
    } finally {
      init();
    }
  })
}

// Adds an employee to the employee table
function handleAddEmployee() {
  inquirer
    .prompt(addEmployeeQuestions)
    .then(async (res) => {
      try {
        const role_id = findRoleId(res.role)

        const text = 'INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)'
        const values = [res.fName, res.lName, role_id];
        await pool.query(text, values)

        console.log(`Added ${res.fName} ${res.lName} to database`)
      } catch (err) {
        console.error(err)
      } finally {
        init();
      }
    }
  )
}

// Adds a role to the role table
function handleAddRole() {
  inquirer
    .prompt(addRoleQuestions)
    .then(async (res) => {
      try {
        const title = res.newRoleName
        const salary = parseInt(res.salary)
        const dept_id = findDeptId(res.newRoleDept)

        const text = 'INSERT INTO roles (title, salary, dept_id) VALUES ($1, $2, $3)'
        const values = [title, salary, dept_id];
        await pool.query(text, values)

        console.log(`Added ${res.newRoleName} in the ${res.newRoleDept} department to database`)
      } catch (err) {
        console.error(err)
      } finally {
        init();
      }
    }
  )
}

// Adds a department to the department table
function handleAddDept() {
  inquirer
    .prompt(addDeptQuestion)
    .then(async (res) => {
      try {
        const text = 'INSERT INTO departments (dept_name) VALUES ($1)'
        const values = [res.newDeptName];
        pool.query(text, values)
        console.log(`Added ${res.newDeptName} department to database`);
      } catch (err) {
        console.error(err);
      } finally {
        init();
      }
    }
  )
}

// Updates an employee's role in the employee table
function handleUpdateEmployeeRole() {
  inquirer
    .prompt(updateEmployeeRoleQuestions)
    .then(async (res) => {
      try {
        splitName = res.selectedEmployee.split(' ');

        const employeeId = await findEmployeeId(splitName[0], splitName[1])
        const roleId = await findRoleId(res.newRole)

        console.log(employeeId) // should log 1
        console.log(roleId) // should log 1

        const text = `UPDATE employees SET role_id = $1 WHERE id = $2;`
        const values = [roleId, employeeId]

        await pool.query(text, values)

        console.log(`Updated ${res.selectedEmployee} to ${res.newRole} in database`)
      } catch (err) {
        console.error(err);
      } finally {
        init();
      }
    }
  )
}

// Exits the application
function handleQuit() {
  server.close();
}


// Main menu for application
// Directs the user to the appropriate function based on their input
function init() {
  inquirer
    .prompt(initQuestion)
    .then((res) => {
      if (res.initQuestion == "View all employees") {
        console.log("Now displaying all employees: ")
        handleViewEmployees();
      } else if (res.initQuestion == "View all roles") {
        handleViewRoles();
      } else if (res.initQuestion == "View all departments") {
        handleViewDepts();
      } else if (res.initQuestion == "Add Employee") {
        handleAddEmployee();
      } else if (res.initQuestion == "Add Role") {
        handleAddRole();
      } else if (res.initQuestion == "Add department") {
        handleAddDept();
      } else if (res.initQuestion == "Update employee role") {
        handleUpdateEmployeeRole();
      } else if (res.initQuestion == "Quit") {
        console.log("Quitting application")
        console.log("Use '^C' to go back to CLI")
        handleQuit();
      }
    })
}

// Calls the init function on startup
init();
