DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR (100) NULL,
    price INT NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Guppy", "Fishies", 5, 88);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Oscar", "Fishies", 7, 45);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Zebra Danios", "Fishies", 15, 35);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Cherry Barb", "Fishies", 15, 40);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Swordtails", "Fishies", 25, 27);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Killifish", "Fishies", 45, 20);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Betta", "Fishies", 5, 125);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Rainbowfish", "Fishies", 10, 65);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Angelfish", "Fishies", 55, 20);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Goldfish", "Fishies", 2, 280);

SELECT * FROM products;

