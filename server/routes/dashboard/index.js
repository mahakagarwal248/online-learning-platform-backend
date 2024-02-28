/** Import packages */
import express from "express";
/** Import custom packages/modules */
// import healthCtrl from "../controllers/health";
// import signupRouter from "../routes/signup";
// import otpCtrl from "../controllers/otpVerify";
// import loginCtrl from "../controllers/login";

// // delete
// import { userModel } from "../models";
// import validate from "../helpers/validate";
// import joiValidate from "../../config/joi-validate";
import courseRoute from "./course.routes";
// import 

const router = express.Router();


router.use('/course',courseRoute)

export default router;
