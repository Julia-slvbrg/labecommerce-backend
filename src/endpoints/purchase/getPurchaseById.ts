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

        const purchase = await db('purchases')
        .select(
            'purchases.purchase_id AS purchaseId', 
            'purchases.buyer_id AS buyerId',
            'users.name AS buyerName',
            'users.email AS buyerEmail',
            'purchases.total_price AS totalPrice',
            'purchases.created_at AS createdAt'
        ).innerJoin(
            'users',
            'users.id',
            '=',
            'purchases.buyer_id'
        ).innerJoin(
            'purchases_products',
            'purchases_products.purchase_id', 
            '=',
            'purchases.purchase_id'
        ).where(
            'purchases.purchase_id', id
        )

        const products = await db('purchases_products').select(
            'products.id AS id',
            'products.name AS name',
            'products.price AS price',
            'products.description AS description',
            'products.image_url AS imageUrl',
            'purchases_products.quantity AS quantity'
        ).innerJoin(
            'products',
            'products.id',
            '=',
            'purchases_products.product_id'
        ).where('purchases_products.purchase_id', id)

        if(purchase && purchase.length>0){
            const purchaseData = purchase[0]
            const result = {...purchaseData, 'products': products}

            res.status(200).send(result);
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