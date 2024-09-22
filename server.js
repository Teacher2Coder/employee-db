const { Pool } = require('pg');
const inquirer = require('inquirer');
const questions = require('./inquirer/questions')
const http = require('http');
const server = http.createServer(function (req, res) {
  res.write("Server started");
  res.end();
})
server.listen(3001);

const pool = new Pool(
    {
      user: 'postgres',
      password: 'teacher2coder',
      host: 'localhost',
      database: 'employees_db'
    },
    console.log('Welcome to the employee manager!')
)

pool.connect();

// Displays all employees from employee table
function handleViewEmployees() {
  pool.query(`SELECT * FROM employees`, async (err, { rows }) => {
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
  pool.query(`SELECT * FROM roles`, async (err, { rows }) => {
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
  pool.query(`SELECT * FROM departments`, async (err, { rows }) => {
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
    .then((res) => {
      console.log(`Added ${res.fName} ${res.lName} to database`)
    })
  return init();
}

// Adds a role to the role table
function handleAddRole() {
  inquirer
    .prompt(questions[2])
    .then((res) => {
      console.log(`Added ${res.newRoleName} in the ${res.newRoleDept} department to database`)
    })
  return init();
}

// Adds a department to the department table
function handleAddDept() {
  inquirer
    .prompt(questions[1])
    .then((res) => {
      console.log(`Added ${res.newDeptName} to database`)
    })
  return init();
}

// Updates an employee's role in the employee table
function handleUpdateEmployeeRole() {
  inquirer
    .prompt(questions[4])
    .then((res) => {
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




// Fun image to play with
// .------------------------------------------------------------------------.
// |                                                                        |
// |     ______                     _                                       |
// |    | _____|                   | |                                      |
// |    | |____  _ __ ___    _ __  | |   ___    _   _   _____    _____      |
// |    |  ____||  _   _  \ |     \| | / __  \ | | | | /  __ \  /  __ \     |
// |    | |____ | | | | | | | |_) || || (__)  || |_| ||  ____/ |  ____/     |
// |    |______||_| |_| |_| | .__/ |_| \ ___ /  \__  | \______| \______|    |
// |                        |_|                  |__/                       |
// |                                                                        |
// |    __   __                                                             |
// |   |  \_/  |                                                            |
// |   |       |   ___ _   _ __     ___ _    __ _    _____    _ __          |
// |   | |\_/| |  / _ | | | ,_  \  / _   |  / _  |  /  __ \  |  __|         |
// |   | |   | | | (_|  | | | | | | (_|  | | (_| | |  ____/  | |            |
// |   |_|   |_|  \___,_| |_| |_|  \___,_|  \__, |  \______| |_|            |
// |                                        |___/                           |
// .________________________________________________________________________.