import { Request, Response } from "express";
import { products } from "../../database";

export const editProductById = (req: Request, res: Response) => {
    const id = req.params.id;
    const {name, price, description, imageUrl} = req.body;

    const findProduct = products.find((product)=>{
        return product.id === id
    });

    if(findProduct){
        findProduct.name = name || findProduct.name
        findProduct.price = price || findProduct.price
        findProduct.description = description || findProduct.description
        findProduct.imageUrl = imageUrl || findProduct.imageUrl

        res.status(200).send('Product updated successfully')
    }else{
        res.status(400).send('Error, product not found. Try again')
    }
}