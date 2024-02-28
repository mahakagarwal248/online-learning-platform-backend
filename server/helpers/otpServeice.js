import crypto from "crypto";
import catchAsync from "./catchAsync";
import { hashOtp } from "../helpers/hashService";

const generateOtp = () => {
  const otp = crypto.randomInt(1000, 9999);
  return otp;
};
const convertOtp = (email, otp) => {
  const ttl = 1000 * 60 * 2; // 2 min
  const expires = Date.now() + ttl;
  const data = `${email}.${otp}.${expires}`;
  return `${hashOtp(data)}.${expires}`;
};

const compareOtp = (hashedOtp, data) => {
  let computedHash = hashOtp(data);
  return computedHash === hashedOtp;
};
const verifyOtp = (email, encryptedOtp, otp) => {
  const [hashedOtp, expires] = encryptedOtp.split(".");
  if (Date.now() > +expires) {
    // res.status(400).json({ message: "OTP expired!" });
    return next(new AppError(`OTP expired!`, 400));
  }
  const data = `${email}.${otp}.${expires}`;
  return compareOtp(hashedOtp, data);
};

export default {
  generateOtp,
  convertOtp,
  compareOtp,
  verifyOtp,
};
