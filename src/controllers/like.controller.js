import Like from "../models/like.schema.js";
import Story from "../models/story.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

// Like and Unlike comment

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
    });
  }
  // if user has not liked the story, then like it.
  if (!haveUserLiked) {
    const newLike = await Like.create({ user: currentUserID, story: storyID });
    if (newLike) {
      story.likesCount++;
      await story.save();
      res.status(200).json({ message: "Story Liked Successfully" });
    }
  }
});

export const checkUserLikedStatus = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const { storyID } = req.params;
  const currentUserID = currentUser._id;

  if (!currentUser || !storyID) {
    throw new CustomError("Invalid Request", 400);
  }

  const haveUserLiked = await Like.findOne({
    user: currentUserID,
    story: storyID,
  });

  if (haveUserLiked) {
    res.status(200).json({
      status: "true",
    });
  }
  if (!haveUserLiked) {
    res.status(200).json({
      status: "false",
    });
  }
});
