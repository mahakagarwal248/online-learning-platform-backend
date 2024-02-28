import express from "express";
import signupCtrl from "../controllers/signup";
import validate from "../helpers/validate";
import joiValidate from "../../config/joi-validate";

const router = express.Router();

router.route("/").post(validate(joiValidate.signUp), signupCtrl.signup);

export default router;
