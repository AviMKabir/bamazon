var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Ffvii!2321",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("connected")
    start();
});

function start() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        pickProduct();
    });

}

function pickProduct() {

    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the id of the product you woud like to purchase?"
            }
        ])


}