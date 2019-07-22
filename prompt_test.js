var inquirer = require('inquirer');
const chalk = require('chalk');
var CLI = require('clui'),
clc = require('cli-color');
var figlet = require('figlet');
require("dotenv").config();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : process.env.dbPassword,
  database : "bamazon"
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  // console.log('connected as id ' + connection.threadId + "\n");
});

function promptTest() {

    inquirer.prompt([
        {
            type: "list",
            name: "userInput",
            message: "Are you here to purchase fish?",
            choices: ["Yes", "No"]
        
        },
        {
            type: "number",
            name: "idInput",
            message: "Type in the #id of the fish you would like the purchase"
        
        },
        {
            type: "number",
            name: "fishAmount",
            message: "How many fish would you like to buy?"
        
        }

    ]).then(function(id) {

        newStock(id);


    })
}


function printProducts() {

    let sql = `SELECT * FROM products`;
    connection.query(sql, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }

      for (var i = 0; i < results.length; i++) { 
        var id = chalk.white(results[i].item_id);
        var name = chalk.yellow(results[i].product_name);
        var price = chalk.magenta(results[i].price);
        var quantity = chalk.red(results[i].stock_quantity);
        var spacer = "\n";
        var line = chalk.white.bgWhite("===============================");
        console.log(spacer + line + spacer + chalk.white("Id: #") + id + " " + "- " + name + spacer + chalk.blue("Cost:") + chalk.green("$") + price + spacer + chalk.blue("Stock Amount:") + quantity + spacer + line + spacer);
      }
    });   
}

function printSelectedFish(id) {
    let sql = `SELECT * FROM products`;
    connection.query(sql, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      var resultIndex = id.idInput - 1;
      var userChoice = results[resultIndex];
    
      var price = chalk.magenta(userChoice.price);
      var quantity = chalk.red(userChoice.stock_quantity);
      var name = chalk.yellow(userChoice.product_name);
      var spacer = "\n";
      var line = chalk.white.bgWhite("===============================");
      console.log(spacer + line + spacer + name + spacer + chalk.green("$") + price + spacer + chalk.blue("Stock Amount:") + quantity + spacer + line + spacer);
     
    });
}

function newStock(id) {
    let sql = `SELECT * FROM products`;
    connection.query(sql, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        var resultIndex = id.idInput - 1;
        var userChoice = results[resultIndex];

        var orderAmount = id.fishAmount;
        var quantity = chalk.red(userChoice.stock_quantity);
        var updatedStock = quantity - orderAmount;
 
        // var price = chalk.magenta(userChoice.price);        
        // var name = chalk.yellow(userChoice.product_name);
        // var spacer = "\n";
        // var line = chalk.white.bgWhite("===============================");
        // console.log(spacer + line + spacer + name + spacer + chalk.green("$") + price + spacer + chalk.blue("Stock Amount:") + updatedStock + spacer + line + spacer);

        console.log(updatedStock);
       
    });
}

printProducts();
promptTest();