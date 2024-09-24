const { Pool } = require('pg');

const pool = new Pool(
    {
      user: 'postgres',
      password: 'teacher2coder',
      host: 'localhost',
      database: 'employees_db'
    },
    console.log("Success")
)

pool.connect();

async function findEmployeeId(fName, lName) {
    const { rows } = await pool.query(`SELECT * FROM employees`)
    const result = rows.filter((row) => row.first_name == fName && row.last_name == lName)
    const resultID = result[0].id;
    return parseInt(resultID)
}

async function findRoleId(role) {
    const { rows } = await pool.query(`SELECT * FROM roles`)
    const result = rows.filter((row) => row.title == role)
    const resultID = result[0].id;
    return parseInt(resultID)
}


async function findDeptId(dept) {
    const { rows } = await pool.query(`SELECT * FROM departments`)
    const result = rows.filter((row) => row.dept_name == dept)
    const resultID = result[0].id;
    return parseInt(resultID)
}

module.exports = { findEmployeeId, findRoleId, findDeptId };