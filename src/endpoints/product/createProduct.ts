import { Request, Response } from "express";
import { TProduct } from "../../types";
import { products } from "../../database";

export const createProduct = (req: Request, res: Response) => {
    try {
        const {id, name, price, description, imageUrl} = req.body;

        const newProduct:TProduct={
            id,
            name,
            price,
            description,
            imageUrl
        };

        if(!id || !name || !price || !description || !imageUrl){
            res.status(400);
            throw new Error('Incomplete information log. Complete all the information.')
        };

        if(typeof (id)==='string' && id.length>0){
            if(id.substring(0,4)!=='prod'){
                res.status(422);
                throw new Error('Invalid information, id must start with the word "prod". Try again.')
                
            };

            const checkId = products.find((product)=> product.id === id);
            if(checkId){
                res.status(400);
                throw new Error('This id is already been used. Try again.')
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
        }

        if(typeof (description) !== 'string' || description.length<=0 || description === " "){
            res.status(422);
            throw new Error('Invalid information type, the product must have a description. Try again.')
        };

        if(typeof (imageUrl) !== 'string' || imageUrl.length<=0 || imageUrl === " "){
            res.status(422);
            throw new Error('Invalid information type, the product must have an image. Try again.')
        };

        products.push(newProduct);
        res.status(201).send('Product registered successfully.');

    } catch (error) {
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send('Known error.')
        };
    }
}