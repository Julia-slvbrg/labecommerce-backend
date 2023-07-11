-- Active: 1687299690651@@127.0.0.1@3306
-- Creating the users table
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL
);

DROP TABLE users;

-- Creating the products table
CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

PRAGMA foreign_keys;
PRAGMA foreign_keys = ON;

--Creating purchases table
CREATE TABLE IF NOT EXISTS purchases (
    purchase_id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL,
    FOREIGN KEY (buyer_id)
    REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

DROP TABLE purchases;

--creating the purchases_products table
CREATE TABLE IF NOT EXISTS purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(purchase_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

DROP TABLE purchases_products;



