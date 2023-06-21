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