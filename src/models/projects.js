import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },
  github: {
    type: String,
  },
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  github: {
    type: String,
  },
  webapp: {
    type: String,
  },
  member: {
    type: [memberSchema],
  },
});

const ProjectsSchema = new mongoose.Schema(
  {
    projects: {
      type: [projectSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const Projects = mongoose.model("Projects", ProjectsSchema);

export default Projects;
