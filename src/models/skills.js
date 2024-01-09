import mongoose from "mongoose";

const SkillItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const SkillCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  skills: [SkillItemSchema],
});

const SkillsSchema = new mongoose.Schema(
  {
    skills: [SkillCategorySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Skills", SkillsSchema);
