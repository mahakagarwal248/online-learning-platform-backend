import mongoose from "mongoose";
const Schema = mongoose.Schema;

const refreshSchema = new Schema(
  {
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

const refreshSchemaModel = mongoose.model("refresh", refreshSchema, "tokens");

export default refreshSchemaModel;
