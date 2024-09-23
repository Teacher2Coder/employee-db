const { Pool } = require('pg');
const inquirer = require('inquirer');
const questions = require('./inquirer/questions')
const http = require('http');
const server = http.createServer(function (req, res) {
  res.write("Server started");
  res.end();
})
server.listen(3001);

const line1 = String.raw`.------------------------------------------------------------------------.`
const line2 = String.raw`|                                                                        |`
const line3 = String.raw`|     ______                     _                                       |`
const line4 = String.raw`|    | _____|                   | |                                      |`
const line5 = String.raw`|    | |____  _ __ ___    _ __  | |   ___    _   _   _____    _____      |`
const line6 = String.raw`|    |  ____||  _ ' _  \ |     \| | / __  \ | | | | /  __ \  /  __ \     |`
const line7 = String.raw`|    | |____ | | | | | | | |_) || || (__)  || |_| ||  ____/ |  ____/     |`
const line8 = String.raw`|    |______||_| |_| |_| | .__/ |_| \ ___ /  \__  | \______| \______|    |`
const line9 = String.raw`|                        |_|                  |__/                       |`
const line10= String.raw`|                                                                        |`
const line11= String.raw`|       __   __                                                          |`
const line12= String.raw`|      |  \_/  |                                                         |`
const line13= String.raw`|      |       |   ___ _   _ __     ___ _    __ _    _____    _ __       |`
const line14= String.raw`|      | |\_/| |  / _ ' | |  _  \  / _ ' |  / _  |  /  __ \  | '__|      |`
const line15= String.raw`|      | |   | | | (_|  | | | | | | (_|  | | (_| | |  ____/  | |         |`
const line16= String.raw`|      |_|   |_|  \___,_| |_| |_|  \___,_|  \__, |  \______| |_|         |`
const line17= String.raw`|                                           |___/                        |`
const line18= String.raw`.------------------------------------------------------------------------.`


const pool = new Pool(
    {
      user: 'postgres',
      password: 'teacher2coder',
      host: 'localhost',
      database: 'employees_db'
    },
    console.log(` ${line1} \n ${line2} \n ${line3} \n ${line4} \n ${line5} \n ${line6} \n ${line7} \n ${line8} \n ${line9} \n ${line10} \n ${line11} \n ${line12} \n ${line13} \n ${line14} \n ${line15} \n ${line16} \n ${line17} \n ${line18}`
    )
)

pool.connect();

// Displays all employees from employee table
function handleViewEmployees() {
  pool.query(`SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id;`, 
    async (err, { rows }) => {
    try {
      console.log(rows);
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
      console.log(rows);
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
      console.log(rows);
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
    .prompt(questions[3])
    .then(async (res) => {
      try {
        const text = 'INSERT INTO employees (first_name, last_name, role) VALUES ($1, $2, $3)'
        const values = [res.fName, res.lName, res.role];
        pool.query(text, values)
        console.log(`Added ${res.fName} ${res.lName} to database`)
      } catch (err) {
        console.error(err)
      } finally {
        init();
      }
  })
}

// Adds a role to the role table
function handleAddRole() {
  inquirer
    .prompt(questions[2])
    .then(async (res) => {
      try {
        const text = 'INSERT INTO roles (first_name, last_name, role) VALUES ($1, $2, $3)'
        const values = [];
        pool.query(text, values)
        console.log(`Added ${res.newRoleName} in the ${res.newRoleDept} department to database`)
      } catch (err) {
        console.error(err)
      } finally {
        init();
      }
    })
}

// Adds a department to the department table
function handleAddDept() {
  inquirer
    .prompt(questions[1])
    .then(async (res) => {
      try {
        const text = 'INSERT INTO departments (first_name, last_name, role) VALUES ($1, $2, $3)'
        const values = [];
        pool.query(text, values)
        console.log(`Added ${res.newDeptName} to database`);
      } catch (err) {
        console.error(err);
      } finally {
        init();
      }
    })
}

// Updates an employee's role in the employee table
function handleUpdateEmployeeRole() {
  inquirer
    .prompt(questions[4])
    .then(async (res) => {
      console.log(`Updated ${res.selectedEmployee} to ${res.newRole} in database`)
    })
  // return init();
}

// Exits the application
function handleQuit() {
  server.close();
}


// Main menu for application
// Directs the user to the appropriate function based on their input
function init() {
  inquirer
    .prompt(questions[0])
    .then((res) => {
      console.log(res.initQuestion);
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
