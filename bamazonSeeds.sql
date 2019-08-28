DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price INTEGER(30) NULL,
    stock_quantity INT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("socks", "clothing", 5, 100), 
("t-shirt", "clothing", 10, 100), 
("eggs", "food", 8, 10),
("shoes", "footwear", 10, 10),
("gloves", "accessories", 8, 10),
("laptop", "electronics", 100, 50),
("PS4 Pro", "electronics", 250, 69),
("mario kart", "video games", 60, 50),
("final fantasy", "video games", 60, 50),
("lamp", "lighting", 15, 10);

SELECT * FROM products;