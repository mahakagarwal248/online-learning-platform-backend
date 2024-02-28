import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
    required: true,
  },
  option_text: { type: String, required: true },
  is_correct: { type: Boolean, default: false },
});

const Option = mongoose.model("Option", optionSchema);

export default Option;
