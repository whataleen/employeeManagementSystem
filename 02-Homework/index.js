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
            choices: ["View all Employees", "View all Employees by department", "View all Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Add Role"]
        }]);
}

init().then(answers => {
    if (answers.initalOption == "View all Employees") {
        showAllEmployees();
    }
    else if (answers.initalOption == "View all Employees by department") {

    }

}
);

function showAllEmployees() {
    let sql = "SELECT * FROM employees";
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
    }

    );
}

//showAllEmployees();


function viewAllEmployeesByDepartment(selectedDepartment) {
    inquirer.prompt([
        {
            type: "text",
            name: "selectedDepartment",
            message: "enter department name"


        }


    ]).then(answers => {
        let sql0 = `SELECT * FROM department WHERE name = "${answers.selectedDepartment}"`;
        let query0 = db.query(sql0, (err, results0) => {
            if (err) throw err;
            let department_id = results0[0].department_id;
            let sql1 = `SELECT * FROM role WHERE department_id = ${department_id}`;
            let query1 = db.query(sql1, (err, results1) => {
                if (err) throw err;
                let role_id = results1[0].role_id;
                let sql2 = `SELECT * FROM employees WHERE role_id = ${role_id}`;
                let query2 = db.query(sql2, (err, results2) => {
                    if (err) throw err;

                    console.table(results2);
                }
                )
            })
        }
        );

    }


       
};

viewAllEmployeesByDepartment("hardware");