import { products, users } from "./database";
import express, { Request, Response} from "express";
import cors from "cors";
import { createUser } from "./endpoints/user/createUser";
import { getAllUsers } from "./endpoints/user/getAllUsers";
import { deleteUserById } from "./endpoints/user/deleteUserById";
import { getAllProducts } from "./endpoints/product/getAllProducts";
import { createProduct } from "./endpoints/product/createProduct";
import { deleteProductById } from "./endpoints/product/deleteProductById";
import { editProductById } from "./endpoints/product/editProductById";


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log ('Server running on port 3003')
});


//get all users
app.get('/users', getAllUsers);


//create user
app.post('/users', createUser);


//delete user by id
app.delete('/users/:id', deleteUserById)


//get productc by name
app.get('/product/search', getAllProducts);


//create product
app.post('/products', createProduct)


//delete product by id
app.delete('/products/:id', deleteProductById)

//edit product by id
app.put('/products/:id', editProductById)