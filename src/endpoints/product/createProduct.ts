import { Request, Response } from "express";
import { TProduct } from "../../types";
import { db } from "../../database/knex";

export const createProduct = async (req: Request<{}, TProduct, TProduct>, res: Response) => {
    try {
        const {id, name, price, description, imageUrl} = req.body;
        
        if(!id || !name || !price || !description || !imageUrl){
            res.status(400);
            throw new Error('Incomplete information log. Complete all the information.')
        };

        if(typeof (id)==='string' && id.length>0){
            if(id.substring(0,4)!=='prod'){
                res.status(422);
                throw new Error('Invalid information, id must start with the word "prod". Try again.')
            };

            const checkId = await db.raw(`
                SELECT * FROM products
                WHERE id = '${id}'
            `);

            if(checkId){
                res.status(400);
                throw new Error('This id is already being used. Try again.')
            };

        }else{
            res.status(422);
            throw new Error('Invalid information type, id must be a valid string. Try again.')
        };

        if(typeof (name)!=='string' || name.length<=0 || name === " "){
            res.status(422);
            throw new Error('Invalid information type, name must be a valid string. Try again.')
        };

        if(typeof(price)==='number'){
            if(price<=0){
                res.status(422);
                throw new Error('Invalid information, price must be a valid, diferent and higher than zero number. Try again.')
            }
        }else{
            res.status(422);
            throw new Error('Invalid information type, price must be a number. Try again.')
        };

        if(typeof (description) !== 'string' || description.length<=0 || description === " "){
            res.status(422);
            throw new Error('Invalid information type, the product must have a description. Try again.')
        };

        if(typeof (imageUrl) !== 'string' || imageUrl.length<=0 || imageUrl === " "){
            res.status(422);
            throw new Error('Invalid information type, the product must have an image. Try again.')
        };

        await db.raw(`
            INSERT INTO products(id, name, price, description, image_url)
            VALUES('${id}', '${name}', '${price}', '${description}', '${imageUrl}');
        `);

        res.status(201).send('Product registered successfully.')

    } catch (error:any) {
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send('Unknown error.')
        };
    }
}