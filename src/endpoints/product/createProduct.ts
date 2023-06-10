import { Request, Response } from "express";
import { TProduct } from "../../types";
import { products } from "../../database";

export const createProduct = (req: Request, res: Response) => {
    const {id, name, price, description, imageUrl} = req.body;

    const newProduct:TProduct={
        id,
        name,
        price,
        description,
        imageUrl
    };

    products.push(newProduct);
    res.status(201).send('Product registered successfully.');
    console.log(products);
}