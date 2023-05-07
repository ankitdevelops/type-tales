import Story from "../models/story.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import Stroy from "../models/story.schema.js";
import Comment from "../models/comment.schema.js";
import User from "../models/user.schema.js";
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
        avatar: newStory.author.avatar,
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
    .populate("author", "username name avatar -_id")
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
    .populate("author", "username name avatar -_id")
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
  const { content, storyID } = req.body;
  const userId = req.user.id;

  const storyExists = await Story.exists({ _id: storyID });
  if (!storyExists) {
    return res.status(400).json({ message: "Story not found" });
  }

  // Create the new comment
  const comment = await Comment.create({
    content,
    author: userId,
    story: storyID,
  });
  const author = await User.findById(comment.author);
  const newComment = {
    _id: comment._id,
    content: comment.content,
    author: {
      name: author.name,
      username: author.username,
      avatar: author.avatar,
    },
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    comments: comment.comments,
  };
  const story = await Story.findById(storyID);
  story.comments.push(newComment);
  await story.save();

  return res.status(201).json(newComment);
});

// Add Reply to comment

export const addReply = asyncHandler(async (req, res) => {
  console.log("reply request received");
  const { commentID, content } = req.body;
  const user = req.user;

  if (!commentID) {
    throw new CustomError("commentId is Required", 400);
  }
  if (!content) {
    throw new CustomError("Comment is Required", 400);
  }
  if (!user) {
    throw new CustomError("Unauthorized", 400);
  }

  const parentComment = await Comment.findById(commentID);
  if (!parentComment) {
    return res.status(400).json({ message: "Parent comment not found" });
  }

  const newReply = new Comment({
    content,
    author: user,
  });

  const savedComment = await newReply.save();

  // Add the new comment to the parent comment's list of comments
  parentComment.comments.push(savedComment._id);
  await parentComment.save();

  const replayResponse = {
    _id: savedComment._id,
    content: savedComment.content,
    author: {
      name: savedComment.author.name,
      username: savedComment.author.username,
      avatar: savedComment.author.avatar,
    },
    createdAt: savedComment.createdAt,
    updatedAt: savedComment.updatedAt,
    comments: savedComment.comments,
  };

  // Return the saved comment with status code 201
  return res.status(201).json(replayResponse);
});

// get Comment By ID

export const getCommentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const comment = await Comment.findById(req.params.id)
    .populate("author", "name username avatar") // populate the author field with their name
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "name username avatar -_id",
      },
    });

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  return res.status(200).json(comment);
});
