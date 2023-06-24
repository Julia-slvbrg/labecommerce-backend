import { Request, Response } from "express";
import { products } from "../../database";

export const editProductById = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {name, price, description, imageUrl} = req.body;

        if(!id){
            res.status(422);
            throw new Error("Please inform the product's id.");
        };

        if(typeof(id)==='string'){
            if(id.substring(0,4)!=='prod'){
                res.status(422);
                throw new Error('Invalide information, id must start with the word "prod". Try again.');
            }
        };

        if(name){
            if(typeof(name)!=='string' || name === ' ' || name.length<=0){
                res.status(422);
                throw new Error('Invalid information type, name must be a valid string. Try again.');
            }
        };

        if(price){
            if(typeof(price)==="number"){
                if(price<=0){
                    res.status(422);
                    throw new Error('Invalid information, price must be a number higher than zero. Try again.');
                }
            }else{
                res.status(422);
                throw new Error('Invalid information type, price must be a number. Try again.');
            }
        };

        if(description){
            if(typeof(description)!=="string" || description===" " || description.length<=0){
                res.status(422);
                throw new Error('Invalid information, the description must be a valid string. Try again');
            }
        };

        if(imageUrl){
            if(typeof(imageUrl)!=="string" || imageUrl===" " || imageUrl.length<=0 ){
                res.status(422);
                throw new Error('Invalid information type, the product must have an image. Try again.');
            }
        };

        const findProduct = products.find((product)=>{
            return product.id === id
        });

        if(findProduct){
            findProduct.name = name || findProduct.name
            findProduct.price = price || findProduct.price
            findProduct.description = description || findProduct.description
            findProduct.imageUrl = imageUrl || findProduct.imageUrl

            res.status(200).send('Product updated successfully');

        }else{
            res.status(400);
            throw new Error('Error, product not found. Try again.');
        };

    } catch (error) {
        if(error instanceof Error){
            res.send(error.message);
        }else{
            res.send('Unknown error.');
        };
    }
}