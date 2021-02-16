const inquirer = require("inquirer");

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


