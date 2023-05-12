import Story from "../models/story.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import Comment from "../models/comment.schema.js";
import User from "../models/user.schema.js";
import Like from "../models/like.schema.js";
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
  const stories = await Story.find(
    { isActive: true },
    {
      story: 1,
      likes: 1,
      comments: 1,
      createdAt: 1,
      updatedAt: 1,
      likesCount: 1,
    }
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
  const currentUser = req.user;
  const { id: storyId } = req.params;
  const story = await Story.findById(storyId)
    .populate("author", "name username avatar -_id")
    .where({ isActive: true });

  if (!story) {
    throw new CustomError("No Story Found", 404);
  }
  const haveUserLiked = await Like.findOne({
    user: currentUser._id,
    story: storyId,
  });
  let likeByCurrentUser;
  if (haveUserLiked) {
    likeByCurrentUser = true;
  }
  if (!haveUserLiked) {
    likeByCurrentUser = false;
  }

  res.status(200).json({
    success: true,
    story,
    likeByCurrentUser,
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

// controller to handle Like
export const handleLike = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const { storyID } = req.body;
  const currentUserID = currentUser._id;

  if (!currentUser || !storyID) {
    throw new CustomError("Invalid Request", 400);
  }

  const story = await Story.findById(storyID);

  if (!story) {
    throw new Story("Story does not exists.", 500);
  }

  //   checking if user already liked the story, if true then unlike it

  const haveUserLiked = await Like.findOne({
    user: currentUserID,
    story: storyID,
  });

  if (haveUserLiked) {
    await Like.findByIdAndDelete(haveUserLiked._id);
    if (story.likesCount > 0) {
      story.likesCount--;
      await story.save();
    }
    res.status(200).json({
      message: "Story Unliked successfully",
      likesCount: story.likesCount,
    });
  }
  // if user has not liked the story, then like it.
  if (!haveUserLiked) {
    const newLike = await Like.create({ user: currentUserID, story: storyID });
    if (newLike) {
      story.likesCount++;
      await story.save();
      res.status(200).json({
        message: "Story Liked Successfully",
        likesCount: story.likesCount,
      });
    }
  }
});

// controller to get top five post with highest number of likes and comment.
export const getTopFiveStories = asyncHandler(async (req, res) => {
  const topStories = await Story.find({ isActive: true }, { _id: 1, story: 1 })
    .sort({ likesCount: -1, comments: -1 })
    .limit(5);
  res.status(200).json(topStories);
});

// delete story
// export const deleteStory = asyncHandler(async (req, res) => {
//   const { storyID } = req.params;
//   const currentUser = req.user;

//   // Check if the story exists
//   const story = await Story.findById({ _id: storyID });
//   if (!story) {
//     return res.status(404).json({ message: "Story not found" });
//   }

//   // Check if the authenticated user is the author of the story
//   if (String(story.author._id) !== String(currentUser._id)) {
//     return res
//       .status(403)
//       .json({ message: "You don't have permission to delete this story." });
//   }

//   // Delete the story
//   await Story.findByIdAndDelete({ _id: storyID });
//   return res.status(200).json({ message: "Story deleted successfully" });
// });

// controller to delete replies.

// export const deleteReply = asyncHandler(async (req, res) => {
//   const { replyID } = req.params;
//   const currentUser = req.user;

//   const comment = await Comment.findOne({ _id: replyID });
//   if (!comment) {
//     return res.status(404).json({ error: "Comment not found" });
//   }

//   // Find the sub-comment to delete and check if the authenticated user is the author
//   const subComment = comment.comments.find((c) => String(c._id) === replyID);
//   if (!subComment) {
//     return res.status(404).json({ error: "Sub-comment not found" });
//   }
//   if (String(subComment.author._id) !== currentUser._id) {
//     return res.status(403).json({ error: "Unauthorized" });
//   }

//   // Remove the sub-comment from the comments array using $pull and save the updated comment
//   comment.comments.pull({ _id: ObjectId(replyID) });
//   await comment.save();

//   return res.status(200).json({ message: "Sub-comment deleted successfully" });
// });
