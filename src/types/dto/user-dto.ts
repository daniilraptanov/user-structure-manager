import { Role } from "../enums/role-enum";
import { ILoginDTO } from "./auth-dto";

export interface IUserDTO extends ILoginDTO {
    id?: string;
    role: Role;
    bossId: string;
}

export interface IFullUserDTO extends IUserDTO {
    subordinates?: IFullUserDTO;
}
