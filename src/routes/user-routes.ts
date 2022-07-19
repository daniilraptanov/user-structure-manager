import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { UserValidator } from "../middleware/user-validator";

const router = Router();

router.get(
    "/user",
    UserController.getUserWithRelations
);

router.patch(
    "/user/change-boss",
    UserValidator.checkUsersIds,
    UserController.replaceToBoss
);

module.exports = router;
