import mongoose from "mongoose";
const Schema = mongoose.Schema;

const coursesSchema = new Schema(
  {
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    course_name: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "test" }],
    students_enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    rating: { type: String, default: 0 },
    level: { type: String, required: true, enum: ["E", "M", "H"] },
    category: { type: String, trim: true, required: true },
    duration: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

const courses = mongoose.model("courses", coursesSchema);

export default courses;
// name, description, rating, level, category, start date, duration, author, noOfStudentsEnrolled , files- [ ], tests - [ ]
