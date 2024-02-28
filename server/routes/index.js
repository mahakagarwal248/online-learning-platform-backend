/** Import packages */
import express from "express";
/** Import custom packages/modules */
import healthCtrl from "../controllers/health";
import signupRouter from "../routes/signup";
import otpCtrl from "../controllers/otpVerify";
import loginCtrl from "../controllers/login";

// delete
import { userModel } from "../models";
import validate from "../helpers/validate";
import joiValidate from "../../config/joi-validate";
import dashboardRoutes from "./dashboard/index";
import { auth } from "../helpers/auth";
// import

const router = express.Router();

/** Service Health Check API */
router.get("/health-check", healthCtrl.checkConnection);
router.delete("/delete-all", async (req, res) => {
  const delteAll = await userModel.deleteMany({});
  return res.send(delteAll);
});

router.use("/signup", signupRouter);
router.post("/verify-otp", validate(joiValidate.otpVerify), otpCtrl.otpVerify);
router.post("/login", validate(joiValidate.login), loginCtrl.login);
router.post("/send-otp", validate(joiValidate.sendOtp), otpCtrl.sendOtp);
router.post(
  "/change-password",
  validate(joiValidate.changePassword),
  otpCtrl.changePassword
);
router.use(auth);
router.get("/profile", loginCtrl.profile);
router.post("/logout", loginCtrl.logout);
router.use("/dashboard", dashboardRoutes);

export default router;
