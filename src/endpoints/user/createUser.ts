import { Request, Response } from "express";
import { TUser } from "../../types";
import { db } from "../../database/knex";


export const createUser = async (req: Request<{}, TUser, TUser>, res: Response) => {
    try {
        const {id, name, email, password} = req.body;

        if(!id || !name || !email || !password){
            res.status(400);
            throw new Error('Incomplete information log. Complete the entire log and try again.')
        };

        if(typeof (id)==='string' && id.length>0){
            if(id[0]!=='u'){
                res.status(422);
                throw new Error('Invalid information, id must start with the letter "u". Try again.')
            }
        }else{
            res.status(422);
            throw new Error('Invalid information type, id must be a valid string. Try again.')
        };

        if(typeof (name)!=='string' || name.length<0 || name === " "){
            res.status(422);
            throw new Error('Invalid information type, name must be a valid string. Try again.')
        };

        if(typeof (email)==='string'){
            if(!email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")){
                res.status(422);
                throw new Error('Email invalid. Try again.')
            }
            
        }else{
            res.status(422);
            throw new Error('Invalid information type, email must be a string. Try again.')
        };

        if(typeof (password)==='string'){
            if(!password.match(/^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,10}$/g)){
                res.status(422);
                throw new Error('Password invalid. It must have from six to ten characters, with uppercase and lowercase letters and one special character. Try again.')
            }
        };

        const usersIsEmpty = await db('users');

        if(usersIsEmpty && usersIsEmpty.length===0){
        
            const newUser = {
                id,
                name,
                email,
                password
            };

            await db('users').insert(newUser);

        }else{

            const [checkId] = await db('users').where({id:id})

            const [checkEmail] = await db('users').where({email:email})

            if(checkId){
                res.status(400);
                throw new Error('This id is already being used. Choose another one.')
            };

            if(checkEmail){
                res.status(400);
                throw new Error('There can only be one account per email.')
            };

            const newUser = {
                id,
                name,
                email,
                password
            };

            await db('users').insert(newUser)
        };

        res.status(201).send('User successfully registered.')

    } catch (error:any) {
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send('Unknown error.')
        };
    }
}