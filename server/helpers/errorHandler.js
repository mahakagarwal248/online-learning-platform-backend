import AppError from "./AppError";
import logger from "./logger";

import responseObjectClass from "./responseObjectClass";

const responseObject = new responseObjectClass();

const handleCastErrorDB = (err) => {
  logger.error(`Invalid ${err.path}: ${err.value}.`);
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  logger.error(`Duplicate field value: ${value}.`);
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  try {
    const errors = err.errors
      .map((error) => error.messages.join(""))
      .join(" and ");
    logger.error(errors);
    return new AppError(errors, 400);
  } catch (e) {
    logger.error(JSON.stringify(e));
    return new AppError("Invalid Input", 400);
  }
};

const handleJWTError = () => new AppError("Invalid Access Token", 401);

const handleJWTExpiredError = () => new AppError("Access token Expired", 402);

const handleJWTMissing = () => new AppError("UNAUTHORIZED", 401);

const sendErrorResponse = (err, req, res) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    const returnObj = responseObject.create({
      code: err.statusCode,
      message: err.message,
    });
    return res.send(returnObj);
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  logger.error(
    `User - ${
      JSON.stringify(req.user) || "Anonymous"
    }, Headers - ${JSON.stringify(req.headers)}, Body - ${JSON.stringify(
      req.body
    )}, ERROR 💥 - ${JSON.stringify(err)}`
  );
  // 2) Send generic message
  const returnObj = responseObject.create({
    data: process.env.NODE_ENVIRONMENT === "development" ? err : {},
  });
  return res.send(returnObj);
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = { ...err };
  error.message = err.message;

  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === "ValidationError") error = handleValidationError(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
  if (error.message === "No auth token") error = handleJWTMissing();

  sendErrorResponse(error, req, res);
};
