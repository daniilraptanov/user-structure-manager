import { Role } from "../types/enums/role-enum";

const Joi = require("joi");

export const loginSchema = Joi.object({
    login: Joi.string().min(5).required(),
    password: Joi.string().min(5).required()
});

export const registerSchema = loginSchema.append({
    confirmPassword: Joi.string().min(5).required(),
    role: Joi.number().valid(Role.ADMIN, Role.BOSS, Role.USER).required(),
    bossId: Joi.string().required()
}).custom(schema => {
    if (schema.password !== schema.confirmPassword) {
        throw Error("Confirmed your password!");
    }
});
