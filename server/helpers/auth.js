// const tokenService = require('../services/token-service');

import catchAsync from "./catchAsync";
import { userModel, refreshModel } from "../models";
import responseObjectClass from "./responseObjectClass";
import {
  comparePass,
  generateTokens,
  verifyAccessToken,
} from "../helpers/hashService";
import userDtos from "../dtos/userDtos";
import AppError from "./AppError";

const responseObject = new responseObjectClass();

// on (req, res, next) {
//     try {
//         const { accessToken } = req.cookies;
//         if (!accessToken) {
//             throw new Error();
//         }
//         const userData = await tokenService.verifyAccessToken(accessToken);
//         if (!userData) {
//             throw new Error();
//         }
//         req.user = userData;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };

const auth = catchAsync(async(req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) return next(new AppError("Token Expire", 401));

  const userId = verifyAccessToken(accessToken);
  req.user = userId;
  next();
});

export default {
  auth,
};
