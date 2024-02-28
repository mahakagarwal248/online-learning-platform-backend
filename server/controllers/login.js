import catchAsync from "../helpers/catchAsync";
import { userModel, refreshModel } from "../models";
import responseObjectClass from "../helpers/responseObjectClass";
import { comparePass, generateTokens } from "../helpers/hashService";
import userDtos from "../dtos/userDtos";
import AppError from "../helpers/AppError";

const responseObject = new responseObjectClass();

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const findUser = await userModel.findOne({ email });
  if (!findUser) return next(new AppError("Email is not registered"));
  const isValidPassword = comparePass(password, findUser.password);
  if (!isValidPassword) return next(new AppError("Invalid Password", 401));
  const { accessToken, refreshToken } = generateTokens({
    _id: findUser._id,
    isverified: findUser.isverified,
  });

  await refreshModel.create({
    token: refreshToken,
    userId: findUser._id,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30 * 12,
    httpOnly: true,
  });

  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });
  const returnObj = responseObject.create({
    code: 200,
    success: true,
    message: "Login Successfully",
    data: { isValidPassword, user: new userDtos(findUser) },
  });
  return res.send(returnObj);
});
const logout = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  await refreshModel.findOneAndDelete({ token: refreshToken });
  // delete cookies
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  const returnObj = responseObject.create({
    code: 200,
    success: true,
    message: "Logout Successfully",
    data: { user: null, auth: false },
  });
  return res.send(returnObj);
});

const profile = catchAsync(async (req, res, next) => {
  const { userId } = req.query;
  console.log("userId==>>>", userId);
  const findUser = await userModel.findById(userId).select("-password").lean();
  const returnObj = responseObject.create({
    code: 200,
    success: true,
    message: "",
    data: { user: new userDtos(findUser) },
  });
  return res.send(returnObj);
});
export default { login, logout, profile };
