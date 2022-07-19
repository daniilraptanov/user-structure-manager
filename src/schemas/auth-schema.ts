import { Role } from "../types/enums/role-enum";

const Joi = require("joi");

export const loginSchema = Joi.object({
    login: Joi.string().min(5).required(),
    password: Joi.string().min(5).required()
});

export const registerSchema = loginSchema.append({
    confirmPassword: Joi.string().min(5).required(),
    role: Joi.number().valid(Role.ADMIN, Role.BOSS, Role.USER).required(),
    bossId: Joi.string()
}).custom((schema) => {
    if (schema.password !== schema.confirmPassword) {
        throw new Error("Confirm your password!");
    }

    if ((schema.role !== Role.ADMIN) && !schema.bossId) {
        throw new Error("bossId is required if role does not equal ADMIN");
    }

    return schema;
});
