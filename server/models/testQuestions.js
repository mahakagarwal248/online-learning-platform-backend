import mongoose from "mongoose";

const Schema = mongoose.Schema;

const testQuestionSchema = new Schema(
  {
    test_id: { type: Schema.Types.ObjectId, ref: "tests", required: true },
    question_text: { type: String, required: true },
    type: { type: String, enum: ["multiple_choice"], required: true },

    options: [{ type: mongoose.Schema.Types.ObjectId, ref: "Option" }],

    marks: { type: Number, required: true },
    negativeMarks: { type: Number, default: 0 },
    questionLevel: { type: String },
    questionImage: { type: String },
  },
  { timestamps: true }
);

const testQuestion = mongoose.model("testquestions", testQuestionSchema);

export default testQuestion;
