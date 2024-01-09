import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  img: {
    type: String,
  },
  school: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
});

const educationsSchema = new mongoose.Schema(
  {
    educations: {
      type: [educationSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Educations", educationsSchema);
