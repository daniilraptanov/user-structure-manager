import { IFullUserDTO, IUserDTO } from "../dto/user-dto";

export interface IUserService {
    getRelations(user: IUserDTO, relations: IFullUserDTO[]): Promise<IFullUserDTO[]>;
}
