import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            
        } catch (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }

    static async register(req: Request, res: Response) {
        try {
            
        } catch (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
}