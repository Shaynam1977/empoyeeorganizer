const inquirer = require("inquirer")
const connection = require("./connection")





function askQuestions() {


    inquirer.prompt([
        {
            name: "prompt",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Create a new department",
                "Create a new role",
                "Create a new employee",
                "Update employee role",
                "Quit"
            ]
        }])
        .then(function (res) {
            switch (res.prompt) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Create a new department":
                    createDepartment();
                    break;
                case "Create a new role":
                    createRole();
                    break;
                case "Create a new employee":
                    createEmployee();
                    break;
                case "Update employee role":
                    updateRole();
                    break;
                case "Quit":
                    Quit()
                    break;
            }
        });

}

function viewDepartments() {
    connection.query("select * from department", function (err, res) {
        if (err) throw err
        console.table(res)
        askQuestions()
    })
}

function viewRoles() {
    connection.query("select * from role", function (err, res) {
        if (err) throw err
        console.table(res)
        askQuestions()
    })
}

function viewEmployees() {
    connection.query("select * from employee", function (err, res) {
        if (err) throw err
        console.table(res)
        askQuestions()
    })
}

function createEmployee() {
    connection.query("select * from role", (err, roleRes) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: "input", name: "firstName", message: "What is the first name of employee?"
            },
            {
                type: "input", name: "lastName", message: "What is the last name of the employee?"
            },
            {
                type: "list", name: "roleId", message: "What is the role title for the new employee?",
                choices: roleRes.map(role => role.title)
            },
        ]).then(data => {
            var role = roleRes.find(role => role.title === data.roleId)
            connection.query("insert into employee set ?", {
                first_name: data.firstName, last_name: data.lastName, role_id: role.id
            })
            askQuestions()
        })
    })
}

function createDepartment() {
    inquirer.prompt([
        {
            type: "input", name: "newDepartment", message: "What is the name of the new department?"
        }
    ]).then(data => {
        connection.query("insert into department set ?", {
            name: data.newDepartment
        })
        askQuestions()
    })
}

function createRole() {
    connection.query("select * from department", (err, depRes) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: "input", name: "title", message: "What is the title for the new role?"
            },
            {
                type: "input", name: "salary", message: "What is the salary for the new role?"
            },
            {
                type: "list", name: "departmentId", message: "What is the department for the new role?",
                choices: depRes.map(department => department.name)
            },
        ]).then(data => {
            var department = depRes.find(department => department.name === data.departmentId)
            connection.query("insert into role set ?", {
                title: data.title, salary: data.salary, department_id: department.id
            })
            askQuestions()
        })
    })
}

function updateRole() {
    connection.query("select * from employee", (err, empRes) => {
        if (err) throw err
        inquirer.prompt([

            {
                type: "list", name: "employeeId", message: " Who's job are you taking?",
                choices: empRes.map(employee => employee.first_name)
            },
        ]).then(data => {
            var employee = empRes.find(employee => employee.first_name === data.employeeId)
            connection.query("select * from role", (err, roleRes) => {
                inquirer.prompt([

                    {
                        type: "list", name: "roleId", message: "What is the new role for the employee?",
                        choices: roleRes.map(role => role.title)
                    },
                ]).then(data=>{
                    var role = roleRes.find(role => role.title === data.roleId)
                    connection.query("update employee set role_id=? where id=?", [
                        role.id, employee.id
                    ])
                    askQuestions()
                })
            })
        })
    })
}

askQuestions()