const jwt = require("jsonwebtoken");
require("dotenv-safe").config();
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../db/models/user";
import { apiSchemasBadRequest } from "../errors/http-errors";
import { loginSchema } from "../schemas/auth-schema";
import { AuthServiceImpl } from "../services/auth-service";
import { IUser } from "../types/models/user";

export class AuthValidator {
  static async checkLoginData(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body;
      const { error } = loginSchema.validate({ login, password });

      if (error) {
        return apiSchemasBadRequest(error, res);
      }
      const authService = new AuthServiceImpl();

      const user: IUser = await User.findOne().where({ login: login });
      if (user) {
        return res.status(400).send("User does not exist");
      }

      if (!(await authService.checkPasswordHash(user.login, user.password))) {
        return res.status(400).send("Password does not correct");
      }

      return next();
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async checkRegisterData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { login, password, confirmPassword, role, bossId } = req.body;
      const { error } = loginSchema.validate({
        login,
        password,
        confirmPassword,
        role,
        bossId,
      });

      if (error) {
        return apiSchemasBadRequest(error, res);
      }

      const boss: IUser = await User.findById(bossId);
      if (!boss) {
        return res.status(404).send("Boss not found");
      }

      const user: IUser = await User.findOne().where({ login: login });
      if (user) {
        return res.status(400).send(`User with login ${login} already exist`);
      }

      return next();
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async auth(req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).send("Authorization Error");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req["user"] = decoded;
      next();
    } catch {
      return res.status(401).send("Authorization Error");
    }
  }
}
