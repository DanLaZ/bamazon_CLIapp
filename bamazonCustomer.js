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
  
  // connection.end(); 

/* App Header */  
console.log(
  chalk.magenta(
    figlet.textSync('Bamazon Online Fish Store!', { horizontalLayout: 'full' })
  )
);

/* Functions */

var postProducts = function() {
  
 

  inquirer
  .prompt([
    {
      type: "list",
      name: "userInput",
      message: "Are you here to purchase fish?",
      choices: ["Yes", "No"]
  
    }
  ]).then(function(id) {
    if(id.userInput === "Yes") {

      let sql = `SELECT * FROM products`;
      connection.query(sql, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
    
        for (var i = 0; i < results.length; i++) { 
          var id = chalk.white(results[i].item_id);
          var name = chalk.yellow(results[i].product_name);
          var spacer = "\n";
          var line = chalk.white.bgWhite("===============================");
          console.log(spacer + line + spacer + chalk.white("Id #") + id + " " + "- " + name + spacer + line + spacer);
        }
    
      });
      
      console.log(chalk.bold.red("Type the id number of the fish you want"));

      inquirer.prompt([
        {
          type: "number",
          name: "idInput",
          message: "Id #"
      
        }
      ]).then(function(id) {
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

        
        inquirer.prompt([
          {
            type: "number",
            name: "fishAmount",
            message: "How many fish would you like to buy?"
        
          }
        ]).then(function(id) {
          var userOrder = id.fishAmount;
          connection.query(sql, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }

            var stockDifference = results[0].stock_quantity - userOrder;
            console.log(stockDifference);
            
          });
          
  
        });

      });
    }

    else {
      connection.end();
    }
  });
  
}

postProducts();
