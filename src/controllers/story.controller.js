import Story from "../models/story.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import Stroy from "../models/story.schema.js";

// Create Story

export const createStory = asyncHandler(async (req, res) => {
  const { story } = req.body;
  const user = req.user;

  if (!story) {
    throw new CustomError("Empty Store", 400);
  }
  if (!user) {
    throw new CustomError("Invalid Request", 400);
  }
  const newStory = await Story.create({ story, author: user });
  res.status(201).json({
    success: true,
    message: "Story Posted Successfully",
    newStory: {
      _id: newStory._id,
      story: newStory.story,
      author: {
        name: newStory.author.name,
        username: newStory.author.username,
      },
    },
  });
});

// Get All Stories

export const getAllStory = asyncHandler(async (_req, res) => {
  console.log("request received");
  const stories = await Story.find(
    {},
    { story: 1, likes: 1, comments: 1 }
  ).populate("author", "username name -_id");

  if (!stories) {
    throw new CustomError("No Story Found", 404);
  }
  res.status(200).json({
    success: true,
    stories,
  });
});

// Get Stories of Currently LoggedIn User

export const getUserStory = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log(user);
  const stories = await Story.find({ author: user._id })
    .select({ story: 1 })
    .populate("author", "username name -_id");

  if (!stories) {
    throw new CustomError("No Stories Found", 404);
  }

  res.status(200).json({
    success: true,
    stories,
  });
});

// Get Single Story

export const getStoryDetails = asyncHandler(async (req, res) => {
  const { id: storyId } = req.params;
  const story = await Story.findById(storyId).populate("author", "-_id");

  if (!story) {
    throw new CustomError("No Story Found", 404);
  }

  res.status(200).json({
    success: true,
    story,
  });
});
