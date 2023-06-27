-- Active: 1687299690651@@127.0.0.1@3306
-- Creating the users table
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT UNIQUE NOT NULL,
    created_at TEXT NOT NULL
);
-- Populating the users table
INSERT INTO users(id, name, email, password, created_at)
VALUES
('u001','Ana Catarina','anacatarina@email.com','Titi123!',DATETIME('now')),
('u002','Maurício','mauricio@email.com','Mumu123!',DATETIME('now')),
('u003','Gabo Gabolino','gabo@email.com','Gabo123!',DATETIME('now'));
-- Creating the products table
CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);
INSERT INTO products(id, name, price, description, image_url)
VALUES
('prod001', 'Mouse gamer', 250, 'Melhor mouse do mercado', 'https://picsum.photos/seed/Mouse%20gamer/400'),
('prod002', 'Monitor', 900, 'Monitor LED Full HD 24 polegadas', 'https://picsum.photos/seed/Monitor/400'),
('prod003', 'Cadeira', 1000, 'A melhor cadeira do mundo', 'https://picsum.photos/seed/Cadeira/400');
--Getting all users
SELECT * FROM users;
--Getting all products
SELECT * FROM products;
--Search product by name
SELECT * FROM products
WHERE name LIKE '%gamer%';
--Create a new user
INSERT INTO users(id, name, email, password, created_at)
VALUES('u004', 'Francisco Leonildio', 'leonildio@email.com', 'Nild123!', DATETIME('now'));
--Create a new product
INSERT INTO products(id, name, price, description, image_url)
VALUES('prod004', 'Mouse Pad', 60, 'Tão bom que ele mexe o mouse por você', 'https://picsum.photos/seed/Mouse-Pad/400');
--Delete user by id
DELETE FROM users
WHERE id='u004';
--Delete product by id
DELETE FROM products
WHERE id='prod004';
--Edit product by id
UPDATE products
SET 
name='Cadeira Gamer',
price=1100,
description='A melhor cadeira gamer do mundo',
image_url='https://picsum.photos/seed/Cadeira-Gamer/400'
WHERE id='prod003';

PRAGMA foreign_keys;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS purchases (
    purchase_id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer_id)
    REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
DROP TABLE purchases;
SELECT * FROM purchases;

INSERT INTO purchases(purchase_id, buyer_id, total_price, created_at)
VALUES  ('p001', 'u002', 1900, DATETIME('now')),
        ('p002', 'u001', 250, DATETIME('now')),
        ('p003', 'u002', 250, DATETIME('now'));
UPDATE purchases
SET total_price = 1000
WHERE purchase_id = 'p001';

SELECT purchases.purchase_id as 'ID da compra', purchases.buyer_id as 'ID do comprador', users.name as 'Comprador', users.email as 'E-mail', purchases.total_price as 'Valor total', purchases.created_at
FROM purchases
JOIN users ON users.id = purchases.buyer_id
ORDER BY purchases.purchase_id ASC;

DELETE FROM purchases 
WHERE purchase_id = 'p003';

INSERT into purchases(purchase_id, buyer_id, total_price, created_at)
VALUES('p003', 'u002', 250, DATETIME('now'));

UPDATE users
SET name = 'José Maurício'
WHERE id = 'u002';

DELETE FROM users
WHERE id = 'u002';

INSERT INTO users(id, name, email, password, created_at)
VALUES('u004','Francisco Leonildio','leonildio@email.com','Nild123!',DATETIME('now'));