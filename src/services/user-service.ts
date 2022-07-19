import User from "../db/models/user";
import { IFullUserDTO, IUserDTO } from "../types/dto/user-dto";
import { IUserService } from "../types/services/user-service";

export class UserServiceImpl implements IUserService {
    async getRelations(user: IUserDTO, relations: IFullUserDTO[]): Promise<IFullUserDTO[]> {
        const subordinates = await User.find().where({ bossId: user.id });
        if (!subordinates) {
            return relations;
        }

        
    }
}
