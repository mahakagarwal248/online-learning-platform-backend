import express from "express";
import courseCtrl from "../../controllers/course";
import validate from "../../helpers/validate";
import joiValidate from "../../../config/joi-validate";

const router = express.Router();

router
  .route("/")
  .post(validate(joiValidate.createCourse), courseCtrl.createCourse)
  .get(courseCtrl.getCourse)
  .put(courseCtrl.editCourse)
  .delete(courseCtrl.deleteCourse);

export default router;
