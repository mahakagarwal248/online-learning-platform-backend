import mongoose from "mongoose";

const Schema = mongoose.Schema;

const testSchema = new Schema(
  {
    course_id: { type: Schema.Types.ObjectId, ref: "courses", required: true },
    test_name: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, required: true }, //take in mins always
    questions: [{ type: String }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "question" }],
  },
  { timestamps: true }
);

const test = mongoose.model("tests", testSchema);

export default test;

// const mongoose = require('mongoose');

// const testSchema = new mongoose.Schema({
//   : { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
//
//
//   created_at: { type: Date, default: Date.now },
//
// });

// const Test = mongoose.model('Test', testSchema);

// module.exports = Test;
