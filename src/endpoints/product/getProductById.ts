import { Request, Response } from "express";
import { db } from "../../database/knex";

export const getProductById = async (req: Request<{id:string}>, res: Response) => {
    try {
        const id = req.params.id;

        if(!id){
            res.status(422);
            throw new Error("Please inform the product's id.");
        };

        if(typeof(id)==='string'){
            if(id.substring(0,4)!=='prod'){
                res.status(422);
                throw new Error('Invalid information, id must start with the word "prod". Try again.');
            }
        };

        const product = await db.raw(`
            SELECT * FROM products
            WHERE id='${id}';
        `);

        if(product && product.length>0){

            const productCopy = {...product[0]};
            productCopy.imageUrl = productCopy.image_url;
            delete productCopy.image_url;

            res.status(200).send(productCopy);
        }else{

            res.status(400);
            throw new Error('Product not found. Try again.')
        }

    } catch (error:any) {
        if(error instanceof Error){
            res.status(404).send(error.message);
        }else{
            res.status(500).send('Unknown error.')
        }
    }
}