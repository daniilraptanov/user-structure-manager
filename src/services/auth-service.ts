import bcrypt from "bcryptjs";
import User from "../db/models/user";
import { Role } from "../types/enums/role-enum";
const jwt = require("jsonwebtoken");
require("dotenv-safe").config();
import { IAuthService } from "../types/services/auth-service";

export class AuthServiceImpl implements IAuthService {
  async checkPasswordHash(login: string, password: string): Promise<boolean> {
    const hash: string = await (await User.findOne().where({ login: login }))
      .password;
    return await bcrypt.compare(password, hash);
  }

  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  createToken(userId: string, role: Role): string {
    return jwt.sign(
      { userId: userId, role: role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5h" }
    );
  }
}
