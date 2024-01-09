import mongoose from "mongoose";

const workDocSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  workImg: {
    type: String,
    required: true,
  },
});

const experienceSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  doc: {
    type: [workDocSchema],
    required: true,
  },
});

const experiencesSchema = new mongoose.Schema(
  {
    experiences: {
      type: [experienceSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Experiences", experiencesSchema);
