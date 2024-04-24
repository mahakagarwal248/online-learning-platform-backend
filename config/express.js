require("dotenv").config();
import cors from "cors";
import express from "express";
import compress from "compression";
import cookieParser from "cookie-parser";

import helmet from "helmet";
import methodOverride from "method-override";
import path from "path";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import httpContext from "express-http-context";
import { v4 as uuid } from "uuid";

import globalErrorHandler from "../server/helpers/errorHandler";
import AppError from "../server/helpers/AppError";
import logger from "../server/helpers/logger";

import routes from "../server/routes";

const app = express();
const server = require("http").createServer(app);

// app.use(express.static("upload"));
app.use(express.static("public"));

app.use("/node", express.static(path.resolve(__dirname, "../../node/")));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "500kb" }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// mount all routes on /api path
app.use("/node/api/olp", routes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => globalErrorHandler(err, req, res, next));

export default server;
