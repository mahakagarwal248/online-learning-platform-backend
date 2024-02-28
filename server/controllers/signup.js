import catchAsync from "../helpers/catchAsync";
import logger from "../helpers/logger";
import responseObjectClass from "../helpers/responseObjectClass";
import { userModel } from "../models";
import sendEmailApi from "../helpers/sendEmail";
// import {} from "jsonwebtoken";
import { generateOtp, convertOtp } from "../helpers/otpServeice";
import { hashPassword } from "../helpers/hashService";
import userDtos from "../dtos/userDtos";
import AppError from "../helpers/AppError";

const responseObject = new responseObjectClass();

const signup = catchAsync(async (req, res, next) => {
  const { name, email, mobile, password, userType, interest = [] } = req.body;

  const findUser = await userModel.findOne({ email });
  if (findUser && findUser?.isVerified)
    return next(new AppError("User Already Exits", 400));

  const otp = generateOtp();
  sendEmailApi(
    "OTP",
    "text",
    `<h1>${otp}</h1>`,
    email,
    "error sending mail",
    "mail sent successfully"
  );
  const encryptedOtp = convertOtp(email, otp);
  const newPassword = await hashPassword(password);
  const userObj = {
    name,
    email,
    mobile,
    password: newPassword,
    userType,
    interest,
  };

  const fetchData = !findUser
    ? userModel.create(userObj)
    : userModel.findByIdAndUpdate(
        { _id: findUser?._id },
        { $set: userObj },
        { new: true }
      );
  const saveUserObj = await fetchData;
  if (!saveUserObj) return next(new AppError("Server Error", 500));
  const returnObj = responseObject.create({
    code: 200,
    success: true,
    message: "Sign Up Successfully",
    data: { encryptedOtp, email, user: new userDtos(saveUserObj) },
  });
  return res.send(returnObj);
});

export default {
  signup,
};
