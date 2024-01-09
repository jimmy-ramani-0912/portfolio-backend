import mongoose from "mongoose";

const MeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    img: {
      type: String,
    },
    roles: {
      type: [String],
      trim: true,
    },
    description: {
      type: String,
    },
    githubLink: {
      type: String,
      trim: true,
    },
    resumeLink: {
      type: String,
      trim: true,
    },
    linkedinLink: {
      type: String,
      trim: true,
    },
    instagramLink: {
      type: String,
      trim: true,
    },
    mediumLink: {
      type: String,
      trim: true,
    },
    codepenLink: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Info", MeSchema);
