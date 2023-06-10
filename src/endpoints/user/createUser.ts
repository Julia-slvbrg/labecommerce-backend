import { Request, Response } from "express";
import { TUser } from "../../types";
import { users } from "../../database";


export const createUser = (req: Request, res: Response) => {
    const {id, name, email, password} = req.body;

    const newUser:TUser={
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    res.status(201).send('User successfully registered.');
    console.log(users);
}