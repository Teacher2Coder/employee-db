# Employee Database Manager
This Command Line Application allows employers to manage their employee database with ease. Users can view all their employees, the roles their employee's fill, and all the departments. Users can even add and update employees as needed!
 
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
 
## Installation
To install the required dependencies run ``` npm install ```.

To set up the database, run ``` psql -U postgres``` Login with the password "teacher2coder" and run ```\i db/schema.sql;```. When the database has been configured, quit the Postgres shell using ```\q```.

## Usage
To initialize the application, run ``` node server.js```

You will be asked to select an option from a list, including "View employees", "View roles", "View departments", "Add employee", "Add roles", "Add departments", "Update employee role", and "Quit"

If the user selects "View employees" the console will log a table of all employees, their roles, their salary, and the department they work for.

If the user selects "View roles" the console will log a table of all roless, the salary associated with that role and the department the role is under.

If the user selects "View departments" the console will log a table of all departments.

If the user selects "Add employee", the console will prompt the user to input their first name, their last name, and the role that the employee will have. Once all values have been inputed, the employee will be added to the database. The user can confirm that they were added by navigating back to "View employees" and noting that the new employee is at the bottom of the table.

If the user selects "Add role", the console will prompt the user to input the name of the new role and what department the role will belong to. Once both values have been inputed, the role will be added to the database. The user can confirm that it was added to the database by navigating back to "View Roles" and noting that the new role is at the bottom of the table.

If the user selects "Add department", the console will prompt the user to input the name of the new department. Once the name has been inputed, the new department will be added to the database. The user can confirm that it was added to the database b y navigating back to "View departments" and noting that the new department is at the bottom of the table.
 
## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Copyright (c) 2024 Ethan Robert Owens

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributing
If you want to contribute, fork the repository in GitHub and send me any code suggestions. Feel free to reach out via GitHub or email (Both are below).
 
## Tests
To test the database's functionality, run ``` psql -U postgres``` and login with the password "teacher2coder". Once you are in the Postgress Shell, run ``` \i db/seeds.sql; ``` to seed the database with a few values. Exit the shell with ``` \q ``` and then initialize the application using ```node server.js ```.

You should see populated tables when selecting "View employees", "View roles" or "View departments".
 
## Questions
* GitHub: [@Teacher2Coder](https://www.github.com/Teacher2Coder)
* Email: ethan.owens4@gmail.com