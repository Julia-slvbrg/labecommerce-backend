import { Request, Response } from "express";
import { users } from "../../database";


export const deleteUserById = (req: Request<{id: string}>, res: Response) => {
    try {
        const id = req.params.id;

        if(!id){
            res.status(422);
            throw new Error("Please inform users's id.");
        };

        if(typeof(id)==="string"){
            if(id[0]!=='u'){
                res.status(422);
                throw new Error('Invalid information, the id must start with the letter "u". Try again.');
            }
        }else{
            res.status(422);
            throw new Error('Invalid information type, id must be a string. Try again.');
        };

        const findUserIndex = users.findIndex((user)=>{
            return user.id === id
        });

        if(findUserIndex>=0){
            users.splice(findUserIndex, 1);
            res.status(200).send('User deleted successfully.');
        }else{
            res.status(400);
            throw new Error('User does not exist, confirm id and try again.');
        };

    } catch (error:any) {
        if(error instanceof Error){
            res.send(error.message);
        }else{
            res.send('Unknown error.');
        }
    }
}