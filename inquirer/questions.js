// Import helper functions
const { getEmployees, getRoles, getDepts } = require('../db/helpers/getData')

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
    },
]

// Questions for adding roles
const addRoleQuestions = [
    {
        type: 'input',
        message: 'What do you want to call the new role?',
        name: 'newRoleName',
    },
    {
        type: 'number',
        message: 'What will the salary for this position be?',
        name: "salary",
    },
    {
        type: 'list',
        message: 'What department will this role belong to?',
        name: 'newRoleDept',
        choices: getDepts(),
    },
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
        name: 'lName',
    },
    {
       type: 'list',
       message: "What is the employee's role?",
       name: 'role',
       choices: getRoles(),
    }
]

// Questions for updating employee roles
const updateEmployeeRoleQuestions = [
    {
        type: 'list',
        message: "Which employee's role would you like to update?",
        name: 'selectedEmployee',
        choices: getEmployees(),
    },
    {
        type: 'list',
        message: "What is their new role?",
        name: 'newRole',
        choices: getRoles(),
    }
]

module.exports = { initQuestion, addDeptQuestion, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions };