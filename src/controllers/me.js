import MeSchema from "../models/me.js";
import SkillsSchema from "../models/skills.js";
import experiencesSchema from "../models/experiences.js";
import educationsSchema from "../models/educations.js";
import ProjectsSchema from "../models/projects.js";
import timeLineDataSchema from "../models/timelinedata.js";
import isEqual from "lodash/isEqual.js";

export const AddMeDetails = async (req, res, next) => {
  const AddMeDetail = new MeSchema(req.body);

  if (req.file) {
    AddMeDetail.img = req.file.path;
  }
  try {
    const SavedMeDetail = await AddMeDetail.save();
    res.status(200).json({
      status: 200,
      message: "My Details Added Successfully!",
      data: SavedMeDetail,
    });
  } catch (error) {
    next(error);
  }
};

export const GetMe = async (req, res, next) => {
  try {
    const Info = await MeSchema.findOne();
    res.status(200).json({
      status: 200,
      message: "Info Get Successfully!",
      data: { Info },
    });
  } catch (error) {
    next(error);
  }
};

export const EditMeDetails = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.img = req.file.path;
    }
    const UpdateMe = await MeSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      message: "My Record updated Successfully!",
      data: { UpdateMe },
    });
  } catch (error) {
    next(error);
  }
};

export const AddMeSkillsDetails = async (req, res, next) => {
  const newSkillCategory = {
    title: req.body.title,
    skills: req.body.skills,
  };

  try {
    let existingSkillsDoc = await SkillsSchema.findOne();

    if (!existingSkillsDoc) {
      existingSkillsDoc = new SkillsSchema({
        skills: [newSkillCategory],
      });
    } else {
      const isDuplicateTitle = existingSkillsDoc.skills.some(
        (category) => category.title === newSkillCategory.title
      );

      const isDuplicateSkills = existingSkillsDoc.skills.some((category) =>
        isEqual(category.skills, newSkillCategory.skills)
      );

      if (isDuplicateTitle || isDuplicateSkills) {
        return res.status(400).json({
          status: 400,
          message: "Skill category with this title already exists!",
        });
      }

      existingSkillsDoc.skills.push(newSkillCategory);
    }

    const updatedSkillsDoc = await existingSkillsDoc.save();

    res.status(200).json({
      status: 200,
      message: "Skills Added Successfully!",
      data: updatedSkillsDoc,
    });
  } catch (error) {
    next(error);
  }
};

export const GetMeSkills = async (req, res, next) => {
  try {
    const SkillsInfo = await SkillsSchema.findOne();
    res.status(200).json({
      status: 200,
      message: "Skills Info Get Successfully!",
      data: { SkillsInfo },
    });
  } catch (error) {
    next(error);
  }
};

export const AddMeExperiences = async (req, res, next) => {
  const newExperience = {
    img: req.body.img,
    role: req.body.role,
    company: req.body.company,
    date: req.body.date,
    desc: req.body.desc,
    skills: req.body.skills,
    doc: req.body.doc,
  };

  try {
    let existingExperiencesDoc = await experiencesSchema.findOne();

    if (!existingExperiencesDoc) {
      existingExperiencesDoc = new experiencesSchema({
        experiences: [newExperience],
      });
    } else {
      const isDuplicateRole = existingExperiencesDoc.experiences.some(
        (experience) => experience.company === newExperience.company
      );

      if (isDuplicateRole) {
        return res.status(400).json({
          status: 400,
          message: "Experience with this company already exists!",
        });
      }

      existingExperiencesDoc.experiences.push(newExperience);
    }

    const updatedExperiencesDoc = await existingExperiencesDoc.save();

    res.status(200).json({
      status: 200,
      message: "Experience Added Successfully!",
      data: updatedExperiencesDoc,
    });
  } catch (error) {
    next(error);
  }
};

export const GetMeExperiences = async (req, res, next) => {
  try {
    const ExperiencesInfo = await experiencesSchema.findOne();
    res.status(200).json({
      status: 200,
      message: "Experiences Info Get Successfully!",
      data: { Experiences: ExperiencesInfo ? ExperiencesInfo : [] },
    });
  } catch (error) {
    next(error);
  }
};

export const AddMeEducations = async (req, res, next) => {
  const newEducation = {
    img: req.body.img,
    school: req.body.school,
    date: req.body.date,
    grade: req.body.grade,
    desc: req.body.desc,
    degree: req.body.degree,
  };

  try {
    let existingEducationDoc = await educationsSchema.findOne();

    if (!existingEducationDoc) {
      existingEducationDoc = new educationsSchema({
        educations: [newEducation],
      });
    } else {
      const isDuplicateSchool = existingEducationDoc.educations.some(
        (education) => education.school === newEducation.school
      );

      if (isDuplicateSchool) {
        return res.status(400).json({
          status: 400,
          message: "Education with this school already exists!",
        });
      }

      existingEducationDoc.educations.push(newEducation);
    }

    const updatedEducationDoc = await existingEducationDoc.save();

    res.status(200).json({
      status: 200,
      message: "Education Added Successfully!",
      data: updatedEducationDoc,
    });
  } catch (error) {
    next(error);
  }
};

export const GetMeEducations = async (req, res, next) => {
  try {
    const EducationsInfo = await educationsSchema.findOne();
    res.status(200).json({
      status: 200,
      message: "Educations Info Get Successfully!",
      data: { Educations: EducationsInfo ? EducationsInfo : [] },
    });
  } catch (error) {
    next(error);
  }
};

export const AddMeProjects = async (req, res, next) => {
  const newProject = {
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    image: req.body.image,
    tags: req.body.tags,
    category: req.body.category,
    github: req.body.github,
    webapp: req.body.webapp,
    member: req.body.member,
  };

  try {
    let existingProjectsDoc = await ProjectsSchema.findOne();

    if (!existingProjectsDoc) {
      existingProjectsDoc = new ProjectsSchema({
        projects: [newProject],
      });
    } else {
      const isDuplicateTitle = existingProjectsDoc.projects.some(
        (project) =>
          project.title === newProject.title ||
          project.github === newProject.github ||
          (newProject.webapp !== "" && project.webapp === newProject.webapp)
      );

      if (isDuplicateTitle) {
        return res.status(400).json({
          status: 400,
          message: "Project with this title / Github / link already exists!",
        });
      }

      existingProjectsDoc.projects.push(newProject);
    }

    const updatedProjectsDoc = await existingProjectsDoc.save();

    res.status(200).json({
      status: 200,
      message: "Project Added Successfully!",
      data: updatedProjectsDoc,
    });
  } catch (error) {
    next(error);
  }
};

export const GetMeProjects = async (req, res, next) => {
  try {
    const ProjectsInfo = await ProjectsSchema.findOne();
    res.status(200).json({
      status: 200,
      message: "Projects Info Get Successfully!",
      data: { Projects: ProjectsInfo ? ProjectsInfo : [] },
    });
  } catch (error) {
    next(error);
  }
};

export const AddMeTimesLines = async (req, res, next) => {
  const newTimeLineData = {
    year: req.body.year,
    text: req.body.text,
  };

  try {
    let existingTimeLineDataDoc = await timeLineDataSchema.findOne();

    if (!existingTimeLineDataDoc) {
      existingTimeLineDataDoc = new timeLineDataSchema({
        timelineData: [newTimeLineData],
      });
    } else {
      const isDuplicatetText = existingTimeLineDataDoc.timelineData.some(
        (data) => data.text === newTimeLineData.text
      );

      if (isDuplicatetText) {
        return res.status(400).json({
          status: 400,
          message: "Timeline data for this title already exists!",
        });
      }

      existingTimeLineDataDoc.timelineData.push(newTimeLineData);
    }

    const updatedTimeLineDataDoc = await existingTimeLineDataDoc.save();

    res.status(200).json({
      status: 200,
      message: "Timeline Data Added Successfully!",
      data: updatedTimeLineDataDoc,
    });
  } catch (error) {
    next(error);
  }
};

export const GetMeTimeLines = async (req, res, next) => {
  try {
    const TimeLineInfo = await timeLineDataSchema.findOne();
    res.status(200).json({
      status: 200,
      message: "TimeLine Info Get Successfully!",
      data: { TimeLine: TimeLineInfo ? TimeLineInfo : [] },
    });
  } catch (error) {
    next(error);
  }
};
