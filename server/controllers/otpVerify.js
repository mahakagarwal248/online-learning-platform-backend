import catchAsync from "../helpers/catchAsync";
import { userModel } from "../models";
import {
  compareOtp,
  generateOtp,
  convertOtp,
  verifyOtp,
} from "../helpers/otpServeice";
import responseObjectClass from "../helpers/responseObjectClass";
import AppError from "../helpers/AppError";
import userDtos from "../dtos/userDtos";
import sendEmailApi from "../helpers/sendEmail";
import { hashPassword } from "../helpers/hashService";

const responseObject = new responseObjectClass();

const otpVerify = catchAsync(async (req, res, next) => {
  const { email, encryptedOtp, otp } = req.body;

  const isValid = verifyOtp(email, encryptedOtp, otp);

  if (!isValid) return next(new AppError(`Wrong Otp`, 400));
  const updateUser = await userModel.findOneAndUpdate(
    { email },
    {
      isVerified: true,
    },
    {
      new: true,
    }
  );

  if (!updateUser) return next(new APIError("Sever Error", 500));

  const returnObj = responseObject.create({
    code: 200,
    success: true,
    message: "Verification Successful",
    data: { isValid, updateUser },
  });
  return res.send(returnObj);
});
const sendOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const findUser = await userModel.findOne({ email });
  if (!findUser) return next(new AppError("Invalid Email", 400));
  const otp = generateOtp();
  sendEmailApi(
    "Forgot Pass - OTP",
    "text",
    `<h1>${otp}</h1>`,
    email,
    "error sending mail",
    "mail sent successfully"
  );

  const encryptedOtp = convertOtp(email, otp);

  const returnObj = responseObject.create({
    code: 200,
    success: true,
    message: "OTP Send Successful",
    data: { encryptedOtp, email, user: new userDtos(findUser) },
  });
  return res.send(returnObj);
});

const changePassword = catchAsync(async (req, res, next) => {
  const { email, encryptedOtp, otp, password } = req.body;
  const isValid = verifyOtp(email, encryptedOtp, otp);
  if (!isValid) return next(new AppError(`Wrong Otp`, 400));
  const newPassword = await hashPassword(password);

  const updateUser = await userModel.findOneAndUpdate(
    { email },
    {
      $set: {
        password: newPassword,
      },
    }
  );

  if (!updateUser) return next(new AppError("Server Error", 500));

  const returnObj = responseObject.create({
    code: 200,
    success: true,
    message: "Password Update Successfully",
    data: {},
  });
  return res.send(returnObj);
});
export default { otpVerify, sendOtp, changePassword };
