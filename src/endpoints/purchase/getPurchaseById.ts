import { Request, Response } from "express";
import { db } from "../../database/knex";

export const getPurchaseById = async (req: Request<{id:string}>, res: Response) => {
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

        const purchase = await db.raw(`
            SELECT * FROM purchases
            WHERE purchase_id='${id}';
        `);

        if(purchase && purchase.length>0){

            res.status(200).send(purchase[0]);
        }else{

            res.status(400);
            throw new Error('Purchase not found. Try again.')
        }

    } catch (error:any) {
        if(error instanceof Error){
            res.send(error.message);
        }else{
            res.send('Unkown error.')
        }
    }
}