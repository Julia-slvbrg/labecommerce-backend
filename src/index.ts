import express from "express";
import cors from "cors";
import { createUser } from "./endpoints/user/createUser";
import { getAllUsers } from "./endpoints/user/getAllUsers";
import { deleteUserById } from "./endpoints/user/deleteUserById";
import { getAllProducts } from "./endpoints/product/getAllProducts";
import { createProduct } from "./endpoints/product/createProduct";
import { deleteProductById } from "./endpoints/product/deleteProductById";
import { editProductById } from "./endpoints/product/editProductById";
import { createPurchase } from "./endpoints/purchase/createPurchase";
import { getProductById } from "./endpoints/product/getProductById";
import { getPurchaseById } from "./endpoints/purchase/getPurchaseById";


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log ('Server running on port 3003')
});

//------------- USERS -------------//
//get all users
app.get('/users', getAllUsers);
//create user
app.post('/users', createUser);
//delete user by id
app.delete('/users/:id', deleteUserById);


//------------- PRODUCTS -------------//
//get productc by name
app.get('/product/search', getAllProducts);
//get product by id
app.get('/products/:id', getProductById);
//create product
app.post('/products', createProduct);
//delete product by id
app.delete('/products/:id', deleteProductById);
//edit product by id
app.put('/products/:id', editProductById);


//------------- PURCHASES -------------//
//create purchase
app.post('/purchases', createPurchase);
//get purchase by id
app.get('/purchases/:id', getPurchaseById);