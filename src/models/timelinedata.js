import mongoose from "mongoose";

const timelineItemSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const timelineDataSchema = new mongoose.Schema({
  timelineData: [timelineItemSchema],
});

const TimelineDataModel = mongoose.model("TimelineData", timelineDataSchema);

export default TimelineDataModel;
