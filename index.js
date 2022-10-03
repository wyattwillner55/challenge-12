const inquirer = require('inquirer');
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('Welcome.');
    home();
});


function home() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select an option.',
            name: 'option',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update employee role',
                'Exit',
            ],
        }])
        .then((response) => {
            switch (response.option) {
                case 'View all departments':
                    viewDepts()
                    break;
                case 'View all roles':
                    viewRoles()
                    break;
                case 'View all employees':
                    viewEmployees()
                    break;
                case 'Add a department':
                    addDept()
                    break;
                case 'Add a role':
                    addRole()
                    break;
                case 'Add an employee':
                    addEmployee()
                    break;
                case 'Update employee role':
                    updateEmployee()
                    break;
            }
        })
}


function viewDepts() {
    db.query('SELECT * FROM departments', function (err, data) {
        if (err) {
            throw err;
        }
        console.table(data);
        home();
    })
}

function viewRoles() {
    db.query('SELECT * FROM departments', function (err, data) {
        if (err) {
            throw err;
        }
        console.table(data);
        home();
    })
}


function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, data) {
        if (err) {
            throw err;
        }
        console.table(data);
        home();
    })
}


function addDept() {
    inquirer.prompt(

        {
            type: 'input',
            message: 'Please enter the name of the new department',
            name: 'newDept'
        }
    ).then((response) => {
        connection.query(`INSERT INTO department SET ?`,
            {
                name: response.newDept,
            },
            (err) => {
                if (err) throw err;
                console.log(`Added ${response.newDept} successfully.`);
                home();
            });
    });
}


function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter the role of the employee.",
            name: 'title'
        },
        {
            type: 'input',
            message: 'Enter the salary amount.',
            name: 'salary'
        },
        {
            type: 'input',
            message: "Enter the department ID for this role.",
            name: 'department',

        },
    ]).then((response) => {
        connection.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [response.title, response.salary, response.department],
            (err) => {
                if (err) throw err;
                console.log('The role had been added.');
                home();
            });
    });
}


function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter employee's first name",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "Please enter employee's last name",
            name: 'lastName'
        },
        {
            type: 'input',
            message: "Please enter the ID for their role",
            name: 'role'
        },
    ]).then((response) => {
        connection.query(`INSERT INTO employee SET ?`,
            {
                first_name: response.firstName,
                last_name: response.lastName,
                roles_id: response.role,
            },
            (err) => {
                if (err) throw err;
                console.log('The employee has been added.');
                home();
            });
    });
};


function updateEmployee() {
    
}