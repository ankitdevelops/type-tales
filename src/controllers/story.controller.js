import Story from "../models/story.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

export const createStory = asyncHandler(async (req, res) => {
  const { story } = req.body;
  const user = req.user._id;

  if (!story) {
    throw new CustomError("Empty Store", 400);
  }
  if (!user) {
    throw new CustomError("Invalid Request", 400);
  }
  const newStory = await Story.create({ story, user });
  res.status(201).json({
    success: true,
    message: "Story Posted Successfully",
    newStory,
  });
});
