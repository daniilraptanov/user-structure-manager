import User from "../db/models/user";
import { IFullUserDTO, IUserDTO } from "../types/dto/user-dto";
import { IUser } from "../types/models/user";
import { IUserService } from "../types/services/user-service";

export class UserServiceImpl implements IUserService {
    async getRelations(user: IUser): Promise<IFullUserDTO> {
        const users = await User.find().where({ bossId: user.id });
        const relations: IFullUserDTO[] = [];

        for await (const user of users) {
            relations.push(await this.getRelations(user));
        }

        return {
            id: user.id,
            login: user.login,
            password: undefined,
            role: user.role,
            bossId: user.bossId,
            subordinates: relations
        };
    }
}
