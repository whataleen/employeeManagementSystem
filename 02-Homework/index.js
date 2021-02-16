const inquirer = require("inquirer");
const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Zughaieyr6!",
    database: "employeemanagmentsystem"
}

);

db.connect((
    err) => {
    if (err) throw err;
    console.log("connected successfully");
}
);

function init() {
    return inquirer.prompt([
        {
            type: "list",
            name: "initalOption",
            message: "What would you like to do?",
            choices: ["View all Employees", "View all Employees by department", "View all Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Add Role"]
        }]);
}

init();





