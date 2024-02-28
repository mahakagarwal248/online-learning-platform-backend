import mongoose from "mongoose";
import { UserType } from "../libs/constants";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, enum: [UserType.student, UserType.teacher] },
    interest: [{ type: String }],
    isVerified: { type: Boolean, default: false },
    courses_taught: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
    courses_enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
    results: [{ type: mongoose.Schema.Types.ObjectId, ref: "result" }],
  },
  { timestamps: true }
);

const user = mongoose.model("users", userSchema);

export default user;
// Name , Email , Mobile , Password ,  occupation , Interest =[],
