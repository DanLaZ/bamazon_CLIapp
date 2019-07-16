var inquirer = require("inquirer");
require("dotenv").config();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : process.env.dbPassword
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});


inquirer
  .prompt([
      {
        type: "input",
        name: "userInput",
        message: "Which item would you like to buy? Type in the id number"
    }
  ]).then(function(id) {
    console.log(id.userInput);
  });
