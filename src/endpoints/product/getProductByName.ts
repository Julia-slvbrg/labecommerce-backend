import { Request, Response } from "express";
import { products } from "../../database";

export const getProductByName = (req: Request, res: Response) => {
    const name = req.query.name as string;

    if(!name){
        res.status(400).send(['Product not found', products])
    };

    const searchProductByName = products.filter((product)=>{
        return product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    });

    searchProductByName.length > 0? res.status(200).send(searchProductByName) : res.status(400).send(['Product not found', products]);
}