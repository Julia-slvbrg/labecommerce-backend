import { Request, Response } from "express";
import { TPurchase } from "../../types";
import { db } from "../../database/knex";

export const createPurchase = async (req: Request<{}, TPurchase, TPurchase>, res: Response) => {
    try {
        const {id, buyer, products} = req.body;

        if(!id || !buyer || !products){
            res.status(400);
            throw new Error('Incomplete information log. Complete the entire log and try again.')
        };

        if(typeof (id)==='string' && id.length>0){
            if(id.substring(0,3)!=='pur'){
                res.status(422);
                throw new Error('Invalid information, id must start with the words "pur". Try again.')
            };
            
            const checkId = await db.raw(`
                SELECT * FROM purchases
                WHERE purchase_id = '${id}';
            `);

    
            if(checkId){
                res.status(422);
                throw new Error('This id is already being used. Try again.')
            }
            
        };

        if(typeof (buyer)==='string' && buyer.length>0){
            if(buyer[0]!=='u'){
                res.status(422);
                throw new Error('Invalid information, this is the id of the buyer and it must start with the letter "u". Try again.')
            };

            const checkBuyer = await db.raw(`
                SELECT * FROM users
                WHERE id = '${buyer}';
            `);

            if(!checkBuyer){
                res.status(422);
                throw new Error('Invalid information, user not found. Try again.')
            }
        };

        for (const product of products){
            if(typeof (product.id)==='string' && product.id.length>0){
                if(product.id.substring(0,4)!=='prod'){
                    res.status(422);
                    throw new Error('Invalid information, this is the id of the product and it must start with the word "prod". Try again.')
                };

                const checkId = await db.raw(`
                    SELECT * FROM products
                    WHERE id = '${product.id}'
                `);

                if(!checkId){
                    res.status(422);
                    throw new Error('Invalid information, product not found. Try again.')
                }
            };

            if(typeof (product.quantity)!=='number' || product.quantity === 0){
                res.status(422);
                throw new Error('Invalid information, quantity must be a number. Try again.')
            }
        };

        let total_price = 0;

        for (let product of products){
            try {
                const priceArr = await db.raw(`
                    SELECT price FROM products
                    WHERE id = '${product.id}';
                `);

                const price = parseFloat(priceArr[0].price);

                if(!isNaN(price)){

                    total_price += price*product.quantity;

                }else{
                    res.status(400);
                    throw new Error('Error! Could not access prices. Try again.')
                };
                
            } catch (error) {
                if(error instanceof Error){
                    res.send(error.message)
                }else{
                    res.send('Unknown error.')
                }
            }
        };

        await db.raw(`
            INSERT INTO purchases(purchase_id, buyer_id, total_price)
            VALUES('${id}', '${buyer}', '${total_price}')
        `);

        for (const product of products){
            await db.raw(`
                INSERT INTO purchases_products(purchase_id, product_id, quantity)
                VALUES('${id}', '${product.id}', '${product.quantity}')
            `)
        };
        
        res.status(201).send('Purchase successfully registered.')


    } catch (error: any) {
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send('Unknown error.')
        };
    }
}