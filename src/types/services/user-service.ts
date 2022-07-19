import { IFullUserDTO } from "../dto/user-dto";
import { IUser } from "../models/user";

export interface IUserService {
    getRelations(user: IUser): Promise<IFullUserDTO>;
}
