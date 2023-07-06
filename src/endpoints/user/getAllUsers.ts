import { Request, Response } from "express"
import { db } from "../../database/knex"

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
            SELECT * FROM users;
        `);

        const modifiedCreatedKey = result.map((user: any)=>{
            const modifiedUser = {...user};
            modifiedUser.createdAt = modifiedUser.created_at;
            delete modifiedUser.created_at;
            return modifiedUser
        });

        res.status(200).send(modifiedCreatedKey)

    } catch (error:any) {
        if(error instanceof Error){
            res.status(400).send(error.message);
        }else{
            res.send('Internal server error.');
        }
    }
}