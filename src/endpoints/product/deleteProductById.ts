import { Request, Response } from "express";
import { products } from "../../database";

export const deleteProductById = (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if(!id){
            res.status(422);
            throw new Error("Please inform the product id.");
        };

        if(typeof(id)==="string"){
            if(id.substring(0,4)!=='prod'){
                res.status(422);
                throw new Error('Invalid information, the id must start with the word "prod". Try again.');
            }
        }else{
            res.status(422);
            throw new Error('Invalid information type, id must be a string. Try again.');
        };

        const findProductIndex = products.findIndex((product)=>{
            return product.id === id
        });

        if(findProductIndex>=0){
            products.splice(findProductIndex,1);
            res.status(200).send('Product deleted');
        }else{
            res.status(400);
            throw new Error('Product does not exist, confirm id and try again.');
        }

    } catch (error:any) {
        if(error instanceof Error){
            res.send(error.message);
        }else{
            res.send('Unknown error.');
        }
    }
}