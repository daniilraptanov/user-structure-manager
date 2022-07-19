import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../db/models/user";
import { UserServiceImpl } from "../services/user-service";
import { Role } from "../types/enums/role-enum";

export class UserController {
  static async getUserWithRelations(req: Request, res: Response) {
    try {
      const userService = new UserServiceImpl();
      const { userId } = req["user"];

      const result = await userService.getRelations(await User.findById(userId));
      if (!result) {
        res.status(500).send("Server Error");
      }
      
      res.status(200).json(result);
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
