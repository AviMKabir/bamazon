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
        console.table(res);
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
            },

            {
                name: "amount",
                type: "input",
                message: "How many would you like to buy??"
            }
        ]).then(function (answer) {

            var itemId = answer.item;
            var amount = answer.amount;

            console.log("item ID: " +itemId);
            console.log("amount: " + amount);
            checkInventory(itemId, amount)

        });

}



function checkInventory(id, numOrdered) {
    console.log("checking inventory...");
      connection.query("SELECT * FROM products WHERE id=?", [id], function (err, res) {
      if (err) throw err;
      console.table(res);
        for (var i = 0; i < res.length; i++) {
        var stock = res[i].stock_quantity;
        var cost = res[i].price;
        };
        if (stock >= numOrdered) {
          console.log("We have enough in stock!");
          processPurchase(id, numOrdered, stock, cost);
        } else {
          console.log("Insufficient quantity! Here is our inventory:");
          console.log("=========================================================");
          start();
        }
      });
  };


function processPurchase(id, orderQty, inv, cost) {
  console.log("Your total cost for " + orderQty + " item(s) is: $" + (orderQty * cost));
  var newStock = (inv - orderQty);
  newStock.toFixed(2);
  connection.query('UPDATE products SET stock_quantity = ? WHERE id=?',[newStock, id], function(err, res){
    if(err) throw err;
    console.log("inventory has been updated!");
    connection.end();
    });
};
