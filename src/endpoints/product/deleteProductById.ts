import { Request, Response } from "express";
import { db } from "../../database/knex";

export const deleteProductById = async (req: Request<{id:string}>, res: Response) => {
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

        try {
            await db('products').del().where({id:id});
            res.status(200).send('Product successfully deleted.')

        } catch (error:any) {
            if(error instanceof Error){
                res.send(error.message);
            }else{
                res.send('Unknown error.');
            }
        };

    } catch (error:any) {
        if(error instanceof Error){
            res.send(error.message);
        }else{
            res.send('Unknown error.');
        }
    }
}