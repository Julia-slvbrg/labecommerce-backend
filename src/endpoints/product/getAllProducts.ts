import { Request, Response } from "express";
import { products } from "../../database";

export const getAllProducts = (req: Request, res: Response) => {
    try {
        const name = req.query.name as string;
        
        if(name){
            if(name.length<2){
                res.status(400);
                throw new Error('Invalid name, the entry must have two or more characters. Try again.');
            }
        }else{
            res.status(200).send(products);
        };
    
        const searchProductByName = products.filter((product)=>{
            return product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        });

        if(!searchProductByName || searchProductByName.length===0){
            res.status(400);
            throw new Error('Product not found.');
        };

        res.status(200).send(searchProductByName);
        
    } catch (error) {
        if(error instanceof Error){
            res.status(404).send(error.message);
        }else{
            res.status(500).send('Known error.');
        }
    };
}