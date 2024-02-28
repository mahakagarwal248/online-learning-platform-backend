import catchAsync from "../helpers/catchAsync";
import AppError from "../helpers/AppError";
import ResponseObject from "../helpers/responseObjectClass";
import CoursesSchema from "../models/course";
const responseObject = new ResponseObject();
import courseDtos from "../dtos/courseDtos";

const createCourse = catchAsync(async (req, res, next) => {
  const {
    body: { name, description, level, category, startDate, duration },
    user,
  } = req;

  const courseObj = {
    teacher_id: user._id,
    course_name: name,
    description,
    level,
    category,
    startDate,
    duration,
  };
  const courseCreate = await CoursesSchema.create(courseObj);

  if (!courseCreate) return next(new AppError("Server Error", 500));

  const returnObj = responseObject.create({
    code: 200,
    success: true,
    message: "Course Created Successfully",
    data: courseCreate,
  });
  return res.send(returnObj);
});

const getCourse = catchAsync(async (req, res, next) => {
  const {
    user,
    query: { name },
  } = req;

  let query = { teacher_id: user._id };
  if (name) {
    query.name = name;
  }

  const courseList = await CoursesSchema.find(query);
  console.log(query);
  if (courseList.length === 0) return next(new AppError("No Data Found", 400));
  const allCourseList = courseList.map((course) => new courseDtos(course));
  const returnObj = responseObject.create({
    code: 200,
    success: true,
    message: "Course List is updated",
    data: allCourseList,
  });
  return res.send(returnObj);
});
const editCourse = catchAsync(async (req, res, next) => {
  const {
    body: { name, description, level, category, startDate, duration, courseId },
    user,
  } = req;
  const courseObj = {
    teacher_id: user._id,
    course_name: name,
    description,
    level,
    category,
    startDate,
    duration,
  };
  const courseCreate = await CoursesSchema.findByIdAndUpdate(
    courseId,
    courseObj,
    { new: true }
  );

  if (!courseCreate) return next(new AppError("Server Error", 500));

  const returnObj = responseObject.create({
    code: 200,
    success: true,
    message: "Course updated Successfully",
    data: courseCreate,
  });
  return res.send(returnObj);
});

const deleteCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.query;

  const coursedelete = CoursesSchema.findByIdAndDelete(courseId);
  const returnObj = responseObject.create({
    code: 200,
    success: true,
    message: "Course Delete Successfully",
    data: coursedelete,
  });
  return res.send(returnObj);
});

export default {
  createCourse,
  getCourse,
  deleteCourse,
  editCourse,
};
