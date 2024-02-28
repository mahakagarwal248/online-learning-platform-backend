import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hashOtp = (data) => {
  return crypto
    .createHmac("sha256", process.env.HASH_SECRET)
    .update(data)
    .digest("hex");
};

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "1y",
  });
  return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
};

const hashPassword = (data) => {
  return bcrypt.hash(data, parseInt(process.env.SALT_BCRYPT));
};
const comparePass = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
export default {
  hashOtp,
  hashPassword,
  comparePass,
  generateTokens,
  verifyAccessToken,
};
