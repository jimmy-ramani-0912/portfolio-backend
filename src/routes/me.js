import express from "express";
import {
  GetMe,
  AddMeDetails,
  EditMeDetails,
  AddMeSkillsDetails,
  GetMeSkills,
  AddMeExperiences,
  GetMeExperiences,
  AddMeEducations,
  GetMeEducations,
  AddMeProjects,
  GetMeProjects,
  AddMeTimesLines,
  GetMeTimeLines,
} from "../controllers/me.js";
import upload from "../middleware/upload.js";
import { verifyToken } from "../Utils/verifyToken.js";

const router = express.Router();

router.get("/", GetMe);
router.post("/", verifyToken, upload.single("img"), AddMeDetails);
router.patch("/:id", verifyToken, upload.single("img"), EditMeDetails);

router.get("/skills", GetMeSkills);
router.post("/skills", verifyToken, AddMeSkillsDetails);

router.get("/experiences", GetMeExperiences);
router.post("/experiences", verifyToken, AddMeExperiences);

router.get("/educations", GetMeEducations);
router.post("/educations", verifyToken, AddMeEducations);

router.get("/projects", GetMeProjects);
router.post("/projects", verifyToken, AddMeProjects);

router.get("/timelines", GetMeTimeLines);
router.post("/timelines", verifyToken, AddMeTimesLines);

export default router;
