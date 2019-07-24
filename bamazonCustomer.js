var inquirer = require('inquirer');
const chalk = require('chalk');
var figlet = require('figlet');
require("dotenv").config();
var mysql = require('mysql');

//This code block is making the connection to the server and database.
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
  //this console.log tells us if we are connected to our server.
  // console.log('connected as id ' + connection.threadId + "\n");
});

/* Functions */
/*===========================*/

//Inquirer prompts function.
//This code ask the user questions and stores their input.

//runApp ask the user if they want to purchase a product or not.
function runApp() {

  inquirer.prompt([
    {
      type: "list",
      name: "userInput",
      message: "Would you like to purchase fish?",
      choices: ["Yes", "No"]
  
    },
  ]).then(function(id) {
    //if user selects No then the app closes.
    if(id.userInput === "No") {
      connection.end();
    }
    //if the user selects Yes then the app continues to run.
    else {
      //prints a list of all the products.
      printProducts();
      //runs the inquirer function that ask which product the user wants to buy and how much of it.
      orderPrompt();
    }
  })
}

function orderPrompt() {

  inquirer.prompt([
    {
      type: "number",
      name: "idInput",
      message: "Type in the id# of the fish you would like to purchase"
    
    },
    {
      type: "number",
      name: "fishAmount",
      message: "How many fish would you like to buy?"
    
    }
  ]).then(function(id) {
    //Runs our functions
    newStock(id);
    
  })
}

//Prints a list of the products.
function printProducts() {

  let sql = `SELECT * FROM products`;
  //the var sql gets the array of products from our database.
  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    //Looping through the array so that the entire array can be printed
    //chalk.colorName is from the chalk npm
    for (var i = 0; i < results.length; i++) { 
      var id = chalk.white(results[i].item_id);
      var name = chalk.yellow(results[i].product_name);
      var price = chalk.magenta(results[i].price);
      var quantity = chalk.red(results[i].stock_quantity);
      var spacer = "\n";
      var line = chalk.white.bgWhite("===============================");
      console.log(spacer + line + spacer + chalk.white("Id: #") + id + " " + "- " + name + spacer + chalk.blue("Cost:") + chalk.green("$") + price + spacer + chalk.blue("Stock Amount:") + quantity + spacer + line + spacer);
    }
    //prints the same message as the prompt to help create a beter UX and make the prompt more visable.
    console.log(chalk.red.bold("Type in the id# of the fish you would like the purchase"));
  });   
}

//Tells user the cost of their order
function newStock(id) {
  //${} is getting the id value from the user input and having the object from mySQL selected. This way allows for one object to be grabbed from the table array in our database. WARNING: this requires a back tic `backTic`.
  let sql = `SELECT * FROM products WHERE item_id = ${id.idInput}`;
  connection.query(sql, (error, result, fields) => {
    if (error) {
      return console.error(error.message);
    }
    //id.fishAmount is taking in the amount of fish a user wants to purchase from the prompt.
    var requestedAmount = id.fishAmount;
    var stock = result[0].stock_quantity;
    var price = result[0].price;
    //totalCost is mulitiplying the products price with the amount ordered.
    var totalCost = price * requestedAmount;
    //This if statement is checking if the order amount is more than what is currently in stock.
    if(requestedAmount > stock) {
      console.log(chalk.red.bold("Insufficient quantity!"));
      //This will run the 2nd prompt array.
      orderPrompt();
    }
    else {
      //sql2 will update the stock amount by subtracting the current stock by the amount ordered. Its updating the product where the id is as seen at ${id.idInput}.
      var sql2 = `UPDATE products SET stock_quantity = ${stock - requestedAmount} WHERE item_id = ${id.idInput}`
      connection.query(sql2, (error, result, fields) => {
        if (error) {
          return console.error(error.message);
       } 
       console.log(chalk.blue("Your order has been made and cost ") + chalk.green("$") + chalk.magenta(totalCost));
       runApp();

      });   
    }     
  });
}

/* App Header */  
/*===========================*/
console.log(
  chalk.magenta(
    figlet.textSync("Bamazon Online" + "\n" + "Fish Store!", { horizontalLayout: 'full' })
  )
);

/* This Function runs the app! */
runApp();
