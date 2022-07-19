const Joi = require("joi");

export const changeBossSchema = Joi.object({
    subordinateId: Joi.string().required(),
    toBossId: Joi.string().required(),
});
