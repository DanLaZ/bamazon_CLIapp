# Bamazon - Command Line Node App

## Overview
This app is a mock online store. 
<br>
When the app is ran it will first ask the user if they would like to shop with us.
## Inquier Prompts

**1st Question**
* Type in the id# of the fish you would like to purchase? 

**2nd Question**
* Type in the id# of the fish you would like to purchase.

**3rd Question**
* How many fish would you like to buy?

## App Demo

![](bamazon.gif)
<br>
<br>
## How to Use
Start App by typing `node bamazonCustomer.js` in your command line terminal.

## NPMs Used
* [inquirer](https://www.npmjs.com/package/i) 

* [chalk](https://www.npmjs.com/package/chalk) 

 * [figlet](https://www.npmjs.com/package/figlet) 

* [mysql](https://www.npmjs.com/package/mysql)

* [DotEnv](https://www.npmjs.com/package/dotenv) 

## What You Need To Run The App

You will have to provide your own server info as follows:
```javascript
var connection = mysql.createConnection({
  host     : "yourHost",
  user     : "yourUser",
  password : process.env.dbPassword,
  database : "bamazon"
});
```

* `process.env.dbPassword` is used to hide the password.

DotEnv is used to get the password from a .env file written as follows:

```md
Data Base Password 
dbPassword=yourPassword
```
