import { ILoginDTO } from "../dto/auth-dto";
import { Role } from "../enums/role-enum";

export interface IAuthService {
    checkPasswordHash(login: string, password: string): Promise<boolean>;
    hashedPassword(password: string): Promise<string>;
    createToken(userId: string, role: Role): string;
}
