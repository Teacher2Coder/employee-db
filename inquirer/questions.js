const { Pool } = require('pg');
const pool = new Pool(
    {
      user: 'postgres',
      password: 'teacher2coder',
      host: 'localhost',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
)

pool.connect();

// Gets all employees and puts them into an array
function getEmployees() {
    let nameList = []
    pool.query(`SELECT * FROM employees`, (err, { rows }) => {
        if (err) {
          console.error(err);
        }
        for (let i = 0; i < rows.length; i++) {
            const fullName = `${rows[i].first_name} ${rows[i].last_name}`
            nameList.push(fullName)
        }
      })
    return nameList;
}

// Gets roles and puts thme into an array
function getRoles() {
    let roleList = []
    pool.query(`SELECT * FROM roles`, (err, { rows }) => {
        if (err) {
          console.error(err);
        }
        for (let i = 0; i < rows.length; i++) {
            const role = rows[i].title
            roleList.push(role)
        }
      })
    return roleList;
}

// Gets departments and puts them into an array
function getDepts() {
    let deptList = []
    pool.query(`SELECT * FROM departments`, (err, { rows }) => {
        if (err) {
          console.error(err);
        }
        for (let i = 0; i < rows.length; i++) {
            const dept = rows[i].title
            deptList.push(dept)
        }
      })
    return deptList;
}

// First question asked on startup
const initQuestion = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'initQuestion',
        choices: ["View all employees", "View all roles", "View all departments", "Add Employee", "Add Role", "Add department", "Update employee role", "Quit"]
    },
]

// Questions for adding departments
const addDeptQuestion = [
    {
        type: 'input',
        message: 'What do you want to call the new department?',
        name: 'newDeptName',
    }
]

// Questions for adding roles
const addRoleQuestions = [
    {
        type: 'input',
        message: 'What do you want to call the new role?',
        name: 'newRoleName'
    },
    {
        type: 'input',
        message: 'What department will this role belong to?',
        name: 'newRoleDept',
        choices: getDepts()
    }
]

// Questions for adding employees
const addEmployeeQuestions = [
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'fName',
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'lName'
    },
    {
       type: 'list',
       message: "What is the employee's role?",
       name: 'role',
       choices: getRoles()
    }
]

// Questions for updating employee roles
const updateEmployeeRoleQuestions = [
    {
        type: 'list',
        message: "Which employee's role would you like to update?",
        name: 'selectedEmployee',
        choices: getEmployees()
    },
    {
        type: 'list',
        message: "Which role do you want to assign to them?",
        name: 'newRole',
        choices: getRoles()
    }
]

module.exports = [initQuestion, addDeptQuestion, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions];