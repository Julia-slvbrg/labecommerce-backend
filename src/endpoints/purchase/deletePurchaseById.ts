import { Request, Response } from "express";
import { db } from "../../database/knex";

export const deletePurchaseById = async (req: Request<{id:string}>, res: Response) => {
    try {
        const id = req.params.id;

        if(!id){
            res.status(422);
            throw new Error("Please inform the purchase id.");
        };

        if(typeof(id)==="string"){
            if(id.substring(0,3)!=='pur'){
                res.status(422);
                throw new Error('Invalid information, the id must start with the word "pur". Try again.');
            }
        }else{
            res.status(422);
            throw new Error('Invalid information type, id must be a string. Try again.');
        };

        try {
            await db('purchases').del().where({purchase_id: id});
            await db('purchases_products').del().where({purchase_id:id});

            res.status(200).send('Purchase successfully canceled.')

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
            res.send('Unknown error.')
        }
    }
}