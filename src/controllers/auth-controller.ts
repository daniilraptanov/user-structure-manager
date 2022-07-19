import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../db/models/user";
import { AuthServiceImpl } from "../services/auth-service";
import { ILoginDTO } from "../types/dto/auth-dto";
import { IUserDTO } from "../types/dto/user-dto";
import { Role } from "../types/enums/role-enum";
import { IUser } from "../types/models/user";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const authService = new AuthServiceImpl();

      const data: ILoginDTO = req.body;
      const user: IUser = await User.findOne().where({ login: data.login });

      const token = authService.createToken(user.id, user.role);

      if (!token) {
        return res.status(500).send("Token does not created");
      }

      res.status(200).json({ token: token });
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const authService = new AuthServiceImpl();

      const data: IUserDTO = req.body;
      const user = await new User({
        ...data,
        password: await authService.hashedPassword(data.password)
      });

      if (!user) {
        res.status(500).send("User does not created!");
      }

      await user.save();
      res.status(201).send("User was created");
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
}
