const inquirer = require("inquirer");
const mysql = require("mysql");
const express = require("express");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Zughaiyer6!",
    database: "employeemanagmentsystem"
}

);

db.connect((
    err) => {
    if (err) throw err;
    console.log("connected successfully");
}
);

const app = express();


function init() {
    return inquirer.prompt([
        {
            type: "list",
            name: "initalOption",
            message: "What would you like to do?",
            choices: ["View all Employees", "View all Employees by department", "View all Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View all Roles"]
        }]);
}

init().then(answers => {
    if (answers.initalOption == "View all Employees") {
        showAllEmployees();
    }
    else if (answers.initalOption == "View all Employees by department") {
        showAllEmployeesByDept();
    }


    else if (answers.initalOption == "View all Roles") {
        viewAllRoles();
    }


}
);

function viewAllRoles() {
    let sql = "SELECT * FROM role";
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
    }
    )


}



// try to make this similar but for roles
function showAllEmployees() {
    let sql = "SELECT * FROM employees";
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
    }

    );
}

//showAllEmployees();


function showAllEmployeesByDept() {
    inquirer.prompt([
        {
            type: "text",
            name: "selectedDep",
            message: "Enter department name: "
        }
    ]).then(answers => {

        let sql0 = `SELECT * FROM department WHERE name = "${answers.selectedDep}"`;
        let query0 = db.query(sql0, (err, results0) => {
            if (err) throw err;
            // console.log(results0);
            let depId = results0[0].department_id;
            // console.log(depId);
            let sql1 = `SELECT * FROM role WHERE department_id = ${depId}`;
            let query1 = db.query(sql1, (err, results1) => {
                if (err) throw err;
                // console.log(results1);
                let roleId = results1[0].role_id;
                // console.log(roleId);
                let sql2 = `SELECT * FROM employees WHERE role_id = ${roleId}`;
                let query2 = db.query(sql2, (err, results2) => {
                    if (err) throw err;
                    console.table(results2);
                });
            });
        });
    });
}

