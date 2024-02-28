import mongoose from "mongoose";

const Schema = mongoose.Schema;

const resultSchema = new Schema(
  {
    student_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    test_id: { type: Schema.Types.ObjectId, ref: "tests", required: true },
    score: { type: Number, required: true },
    submitted_at: { type: Date, default: Date.now },
    answers: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: "testquestions",
          required: true,
        },
        chosenAnswer: { type: String, required: true },
      },
    ],

    answers: [
      {
        question_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        selected_option: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Option",
        },
      },
    ],
  },
  { timestamps: true }
);

const result = mongoose.model("results", resultSchema);

export default result;

// const mongoose = require('mongoose');

// const resultSchema = new mongoose.Schema({
//   student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   test_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
//   score: { type: Number, required: true },
//
// });

// const Result = mongoose.model('Result', resultSchema);

// module.exports = Result;
