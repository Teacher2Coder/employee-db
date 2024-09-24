const { Pool } = require('pg');
const pool = new Pool(
    {
      user: 'postgres',
      password: 'teacher2coder',
      host: 'localhost',
      database: 'employees_db'
    },
    console.log(`Get Data Helper functions ready!`)
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
      const dept = rows[i].dept_name
      deptList.push(dept)
    }
  })
  return deptList;
}

module.exports = { getEmployees, getRoles, getDepts }