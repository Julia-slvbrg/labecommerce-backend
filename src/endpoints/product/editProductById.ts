import { Request, Response } from "express";
import { TProduct } from "../../types";
import { db } from "../../database/knex";

export const editProductById = async (req: Request<{id: string}, TProduct, TProduct>, res: Response) => {
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
                throw new Error('Invalid information, id must start with the word "prod". Try again.');
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

        const [product] = await db('products').where({id:id});

        if(product){
            try {
                const updatedProduct = {
                    name: name || product.name, 
                    price: price || product.price, 
                    description: description || product.description, 
                    image_url: imageUrl || product.image_url
                };

                await db('products').update(updatedProduct).where({id:id});
                res.status(200).send('Product successfully updated.')

            } catch (error:any) {
                if(error instanceof Error){
                    res.send(error.message);
                }else{
                    res.send('Unknown error.')
                }
            }
        }

    } catch (error:any) {
        if(error instanceof Error){
            res.send(error.message);
        }else{
            res.send('Unknown error.');
        };
    }
}