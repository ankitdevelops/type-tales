import Story from "../models/story.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import Stroy from "../models/story.schema.js";
import Comment from "../models/comment.schema.js";
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
    { isActive: true },
    { story: 1, likes: 1, comments: 1, createdAt: 1, updatedAt: 1 }
  )
    .populate("author", "username name -_id")
    .sort({ createdAt: -1 });

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
  const stories = await Story.find({ author: user._id, isActive: true })
    .select({ story: 1, likes: 1, comments: 1, createdAt: 1, updatedAt: 1 })
    .populate("author", "username name -_id")
    .sort({ createdAt: -1 });

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
  const story = await Story.findById(storyId)
    .populate("author", "-_id")
    .where({ isActive: true });

  if (!story) {
    throw new CustomError("No Story Found", 404);
  }

  res.status(200).json({
    success: true,
    story,
  });
});

// create Comment

export const addComment = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { storyID, content } = req.body;
  const user = req.user;

  if (!storyID) {
    throw new CustomError("Story is Required", 400);
  }
  if (!content) {
    throw new CustomError("Comment is Required", 400);
  }
  if (!user) {
    throw new CustomError("Unauthorized", 400);
  }

  const story = await Story.findById(storyID);
  if (!story) {
    throw new CustomError("No Story Found", 400);
  }
  const newComment = await Comment.create({ story, content, author: user });
  res.status(201).json({
    success: true,
    message: "Comment Posted Successfully",
    newComment: {
      content: newComment.content,
      author: {
        name: newComment.author.name,
        username: newComment.author.username,
      },
      replies: newComment.replies,
      _id: newComment._id,
      createdAt: newComment.createdAt,
      updatedAt: newComment.updatedAt,
    },
  });
});

// Add Reply to comment

export const addReply = asyncHandler(async (req, res) => {
  console.log("reply request received");
  const { commentId, content, storyID } = req.body;
  const user = req.user;

  if (!commentId) {
    throw new CustomError("commentId is Required", 400);
  }
  if (!content) {
    throw new CustomError("Comment is Required", 400);
  }
  if (!user) {
    throw new CustomError("Unauthorized", 400);
  }

  const comment = await Comment.findById(commentId);

  console.log(comment);
  if (!comment) {
    throw new CustomError("No Comment Found", 400);
  }
  const reply = await Comment.create({ comment, content, author: user });

  if (reply) {
    comment.replies.push(reply._id);
    await comment.save();
  }

  // const updatedComment = await Comment.findById(commentId).populate("replies");
  res.status(201).json(reply);
});

// get Comments of a story

export const getStoryComments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id) {
    throw new CustomError("No StoryId Found", 400);
  }
  if (!user) {
    throw new CustomError("unauthenticated Request", 401);
  }
  const comment = await Comment.find({ story: id })
    .populate("author", "name username -_id")
    .populate("replies");
  res.status(200).json(comment);
});
