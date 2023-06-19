import { Request, Response } from "express"
import { users } from "../../database"


export const getAllUsers = (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error)
    }
    
}