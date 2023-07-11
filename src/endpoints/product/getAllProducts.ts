import { Request, Response } from "express";
import { db } from "../../database/knex";
import { TProduct } from "../../types";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string;
        
        if(name && name.length<2){
            res.status(400);
            throw new Error('Invalid name, the entry must have two or more characters. Try again.');
        };

        const results = await db('products').select(
           'id', 'name', 'price', 'description', 'image_url AS imageURL'
        );
    
        const searchProductByName = results.filter((product: TProduct)=>{
            return product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        });

        if(!searchProductByName || searchProductByName.length===0){
            res.status(400);
            throw new Error('Product not found.');
        }; 
    
        searchProductByName.length>0? res.status(200).send(searchProductByName): res.status(200).send(results); 
        
    } catch (error:any) {
        if(error instanceof Error){
            res.status(404).send(error.message);
        }else{
            res.status(500).send('Unknown error.');
        }
    };
}