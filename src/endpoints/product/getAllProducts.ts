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

        const results = await db.raw(`
            SELECT * FROM products
        `);
    
        const searchProductByName = results.filter((product: TProduct)=>{
            return product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        });

        if(!searchProductByName || searchProductByName.length===0){
            res.status(400);
            throw new Error('Product not found.');
        }; 
    
        if(searchProductByName.length > 0){ 

            const products = searchProductByName.map((product:any)=>{
                const productCopy = {...product};
                productCopy.imageUrl = productCopy.image_url;
                delete productCopy.image_url;
                return productCopy
            });
            res.status(200).send(products)

        }else{ 

            const products = results.map((product:any)=>{
                const productCopy = {...product};
                productCopy.imageUrl = productCopy.image_url;
                delete productCopy.image_url;
                return productCopy
            });
            res.status(200).send(products) 
        }
        
    } catch (error:any) {
        if(error instanceof Error){
            res.status(404).send(error.message);
        }else{
            res.status(500).send('Unknown error.');
        }
    };
}

/* 
    let results;

        if(name){
            results = await db.raw(`
                SELECT * FROM products
                WHERE name LIKE '%${name}%';
            `)
        }else{
            results = await db.raw(`
                SELECT * FROM products;
            `)
        };

        if(!results || results.length === 0){
            res.status(400);
            throw new Error ('Product not found.')
        };

        res.status(200).send(results)
*/