import Joi from "joi";

const userSchemaNew = {
  register: {
    body: Joi.object({
      username: Joi.string().min(3).max(18).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(50).required(),
    }),
  },
  login: {
    body: Joi.object({
      username: Joi.string().min(3).max(50).required(),
      password: Joi.string().required(),
    }),
  },
  changePassword: {
    body: Joi.object({
      email: Joi.string().email().required(),
      verify_code: Joi.string().length(6).required(),
      password: Joi.string().min(4).max(50).required(),
    }),
  },
  changeName: {
    body: Joi.object({
      username: Joi.string().min(3).max(18).required(),
      password: Joi.string().required(),
    }),
  },
  changeEmail: {
    body: Joi.object({
      username: Joi.string().min(3).max(50).required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
      verify_code: Joi.string().length(6).required(),
    }),
  },
  forgotEmail: {
    body: Joi.object({
      username: Joi.string().min(3).max(50).required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  },
};


export default userSchemaNew;
