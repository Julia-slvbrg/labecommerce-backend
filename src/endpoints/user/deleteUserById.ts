import { Request, Response } from "express";
import { users } from "../../database";


export const deleteUserById = (req: Request, res: Response) => {
    const id = req.params.id;

    const findUserIndex = users.findIndex((user)=>{
        return user.id === id
    });

    if(findUserIndex>=0){
        users.splice(findUserIndex, 1);
        console.log(users)
        res.status(200).send('User deleted successfully.');
    }else{
        res.status(200).send('Invalid ID. Try again.');
    };
}