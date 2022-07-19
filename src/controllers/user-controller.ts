import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export class UserController {
    static async getUserWithRelations(req: Request, res: Response) {
        try {
            
        } catch (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }

    static async replaceToBoss(req: Request, res: Response) {
        try {
            
        } catch (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
}