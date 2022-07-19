import { DBCreator } from "../../db/database";
import User from "../../db/models/user";
import { AuthServiceImpl } from "../../services/auth-service";
import { UserServiceImpl } from "../../services/user-service";
import { Role } from "../../types/enums/role-enum";

const userService = new UserServiceImpl();
const authService = new AuthServiceImpl();

describe("UserServiceImpl", () => {
  beforeAll(async () => {
    await DBCreator.getInstance();
  });

  describe("getRelations", () => { // TODO :: refactoring this test
    let result = [];

    let admin;
    let boss_1;
    let boss_2;
    let user_1;
    let user_2;
    let user_3;

    beforeAll(async () => {
      admin = await new User({
        login: "Admin",
        password: await authService.hashedPassword("password"),
        role: Role.ADMIN,
      });

      boss_1 = await new User({
        login: "Boss-1",
        password: await authService.hashedPassword("password"),
        role: Role.BOSS,
        bossId: admin.id
      });

      boss_2 = await new User({
        login: "Boss-2",
        password: await authService.hashedPassword("password"),
        role: Role.BOSS,
        bossId: admin.id
      });

      user_1 = await new User({
        login: "User-1",
        password: await authService.hashedPassword("password"),
        role: Role.USER,
        bossId: boss_1.id
      });

      user_2 = await new User({
        login: "User-2",
        password: await authService.hashedPassword("password"),
        role: Role.USER,
        bossId: boss_1.id
      });

      user_3 = await new User({
        login: "User-3",
        password: await authService.hashedPassword("password"),
        role: Role.USER,
        bossId: boss_2.id
      });
    });

    afterAll(async () => {
        admin.remove();
        boss_1.remove();
        boss_2.remove();
        user_1.remove();
        user_2.remove();
        user_3.remove();
    });

    test("Should return admin other users", async () => { // TEST NOT WORKING!
        result = await userService.getRelations(admin);

        console.log(result);

        expect(result).not.toBeNull();
    });
  });
});
