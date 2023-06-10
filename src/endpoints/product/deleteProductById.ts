import { Request, Response } from "express";
import { products } from "../../database";

export const deleteProductById = (req: Request, res: Response) => {
    const id = req.params.id;

    const findProductIndex = products.findIndex((product)=>{
        return product.id === id
    });

    if(findProductIndex>=0){
        products.splice(findProductIndex,1);
        res.status(200).send('Product deleted');
        console.log(products);
    }else{
        res.status(400).send('ID not found. Try again.');
    }
}