import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import { AuthValidator } from "../middleware/auth-validator";

const router = Router();

router.post(
    "/auth/login",
    AuthValidator.auth,
    AuthValidator.checkLoginData,
    AuthController.login
);

router.post(
    "/auth/register",
    AuthValidator.checkRegisterData,
    AuthController.register
);

module.exports = router;