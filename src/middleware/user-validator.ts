import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../db/models/user";
import { apiSchemasBadRequest } from "../errors/http-errors";
import { changeBossSchema } from "../schemas/user-schema";
import { Role } from "../types/enums/role-enum";
import { IUser } from "../types/models/user";

export class UserValidator {
  static async checkUsersIds(req: Request, res: Response, next: NextFunction) {
    try {
      const { subordinateId, toBossId } = req.body;
      const { error } = changeBossSchema.validate({ subordinateId, toBossId });

      if (error) {
        return apiSchemasBadRequest(error, res);
      }

      const subordinate: IUser = await User.findById(subordinateId);
      const boss: IUser = await User.findById(toBossId);

      if (!boss) {
        return res.status(404).send("Boss not found");
      }

      if (!subordinate) {
        return res.status(404).send("Subordinate not found");
      }

      if (boss.role !== Role.BOSS) {
        return res.status(400).send("Change user boss can be only boss with role <2>");
      }

      if (boss.id !== subordinate.bossId) {
        return res.status(400).send("Boss should changes only he subordinate");
      }

      return next();
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
}
