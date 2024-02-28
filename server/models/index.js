import user from "./user";
import refreshSchemaModel from "./refreshToken";
import testSchema from "./test";
import testQuestionSchema from "./testQuestions";
import resultSchema from "./result";
import OptionSchema from "./options";
import coursesSchema from "../controllers/course";
export default {
  userModel: user,
  refreshModel: refreshSchemaModel,
  testModel: testSchema,
  testQuestionModel: testQuestionSchema,
  resultModel: resultSchema,
  optionModel: OptionSchema,
  coursesmodel: coursesSchema,
};
