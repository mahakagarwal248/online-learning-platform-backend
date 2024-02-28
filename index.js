import "core-js/stable";
import "regenerator-runtime/runtime";

import mongoose from "mongoose";
import logger from "./server/helpers/logger";
import app from "./config/express";

mongoose.connect(process.env.MONGO_ROUTER, {
  // auth: {
  //   authdb: process.env['MONGO_AUTH_DB'],
  //   user: process.env['MONGO_AUTH_USER'],
  //   password: process.env['MONGO_AUTH_PASSWORD'],
  // },
});

mongoose.connection.on("connected", function () {
  logger.log({
    level: "info",
    message: `Server Connected 💚 to Mongoose @ ${process.env["MONGO_ROUTER"]}`,
    fileName: "index.js",
    functionName: "mongoose",
  });
});

// If the connection throws an error
mongoose.connection.on("error", function (err) {
  logger.log({
    level: "error",
    message: `Failed to Connect to Mongoose @ ${process.env["MONGO_ROUTER"]}`,
    fileName: "index.js",
    functionName: "mongoose",
    error: err,
  });
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
  logger.log({
    level: "info",
    message: `Server and Mongoose Disconnected from @ ${process.env["MONGO_ROUTER"]}`,
    fileName: "index.js",
    functionName: "mongoose",
  });
});

app.listen(process.env.PORT, () => {
  logger.log({
    level: "info",
    message: `Server Started 💚 On Port (${process.env.PORT})`,
    fileName: "index.js",
  });
});

export default app;
