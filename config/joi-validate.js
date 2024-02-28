import Joi from "joi";
import { UserType } from "../server/libs/constants";

export default {
  signUp: Joi.object({
    body: {
      name: Joi.string().required(),
      mobile: Joi.string().required(),
      email: Joi.string().required(),
      userType: Joi.string()
        .uppercase()
        .valid(UserType.student, UserType.teacher)
        .required(),
      password: Joi.string().required(),
      interest: Joi.array(),
    },
  }),
  otpVerify: Joi.object({
    body: {
      email: Joi.string().required(),
      encryptedOtp: Joi.string().required(),
      otp: Joi.string().required(),
    },
  }),
  login: Joi.object({
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sendOtp: Joi.object({
    body: {
      email: Joi.string().required(),
    },
  }),
  changePassword: Joi.object({
    body: {
      email: Joi.string().required(),
      encryptedOtp: Joi.string().required(),
      otp: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  createCourse: Joi.object({
    body: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      level: Joi.string().required(),
      category: Joi.string().required(),
      duration: Joi.string().required(),
    },
  }),
};
