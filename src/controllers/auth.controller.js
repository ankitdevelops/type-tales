import User from "../models/user.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import cookieOptions from "../utils/cookieOptions.js";
import Story from "../models/story.schema.js";
import Comment from "../models/comment.schema.js";
import formidable from "formidable";
import config from "../config/index.js";
import cloudinary from "cloudinary";
import Like from "../models/like.schema.js";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

/******************************************************
 * @SIGNUP
 * @route http://localhost:5000/api/v1/auth/signup
 * @description User signUp Controller for creating new user
 * @returns User Object
 ******************************************************/

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, username, password2 } = req.body;

  if (!name) {
    throw new CustomError("Name is required", 400);
  }
  if (!email) {
    throw new CustomError("Name is required", 400);
  }
  if (!password) {
    throw new CustomError("Name is required", 400);
  }
  if (!username) {
    throw new CustomError("Username is required", 400);
  }
  if (!password2) {
    throw new CustomError("Confirm Password is Required", 400);
  }
  if (password !== password2) {
    throw new CustomError("Password don't match", 400);
  }

  const registeredUser = await User.findOne({ $or: [{ username }, { email }] });

  if (registeredUser) {
    const message =
      registeredUser.username === username
        ? "Username already exists"
        : "Email already registered";
    throw new CustomError(message, 400);
  }

  const user = await User.create({
    name,
    email,
    username,
    password,
  });

  const token = user.getJwtToken();

  user.password = undefined;
  user.email = undefined;
  // res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    token,
    user: {
      username: user.username,
      name: user.name,
      avatar: user.avatar,
      joinedDate: user.createdAt,
    },
  });
});

/******************************************************
 * @LOGIN
 * @route http://localhost:5000/v1/api/auth/signup
 * @description User login Controller for signing in  user
 * @returns token
 ******************************************************/

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email) {
    throw new CustomError("Email is required", 400);
  }

  if (!password) {
    throw new CustomError("Password is Required", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError("Invalid Credentials", 400);
  }

  const checkPassword = await user.comparePassword(password);
  if (checkPassword) {
    const token = user.getJwtToken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      token,
      user: {
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        joinedDate: user.createdAt,
      },
    });
  }
  throw new CustomError("Wrong Password", 400);
});

// list all the users profile, currently logged in user is not following.
export const listNotFollowingUser = asyncHandler(async (req, res) => {
  const user = req.user;
  const currentUser = await User.findById(user._id);

  if (!currentUser) {
    throw new CustomError("No User Found", 400);
  }

  const followingUserIDs = currentUser.following.map((user) => user.toString());
  followingUserIDs.push(user._id);

  const nonFollowedUser = await User.find(
    { _id: { $nin: followingUserIDs } },
    { username: 1, name: 1, _id: 0, avatar: 1 }
  );

  res.status(200).json(nonFollowedUser);
});

// list all the user, currentUser is following

export const listFollowingUsers = asyncHandler(async (req, res) => {
  const currentUser = req.user;

  if (!currentUser) {
    throw new CustomError("Invalid Request", 400);
  }

  const followedUsers = await User.findById(currentUser._id).populate(
    "following",
    "username name avatar -_id"
  );

  res.status(200).json(followedUsers.following);
});

// controller to follow user

export const followUser = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const userToFollowUsername = req.params.username;

  if (!currentUser) {
    throw new CustomError(`Unauthorized Access`, 400);
  }
  if (!userToFollowUsername) {
    throw new CustomError(`Username is required `, 400);
  }

  const userToFollow = await User.findOne({ username: userToFollowUsername });
  if (!userToFollow) {
    throw new CustomError(
      `User With username ${userToFollowUsername} not found`,
      400
    );
  }

  // adding a check to see if the currently logged is user is already following this user.
  if (currentUser.following.includes(userToFollow._id)) {
    throw new CustomError(
      `${currentUser.username} is already following ${userToFollow.username}`
    );
  }
  // adding the user to the following array of currently logged in user
  currentUser.following.push(userToFollow._id);
  await currentUser.save();

  // adding the current user to followers array of the user being followed

  userToFollow.followers.push(currentUser._id);
  await userToFollow.save();

  res.status(200).json({
    success: true,
    message: `${currentUser.username} followed ${userToFollow.username}`,
    user: {
      username: userToFollow.username,
      name: userToFollow.name,
      avatar: userToFollow.avatar,
    },
  });
});

// controller to unfollow user

export const unfollowUser = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const userToUnfollowUsername = req.params.username;

  if (!currentUser || !userToUnfollowUsername) {
    throw new CustomError("Invalid Request", 400);
  }

  const userToUnfollow = await User.findOne({
    username: userToUnfollowUsername,
  });

  if (!userToUnfollow) {
    throw new CustomError(
      `user with username ${userToUnfollowUsername} does not exists`,
      400
    );
  }

  if (!currentUser.following.includes(userToUnfollow._id)) {
    throw new CustomError(
      `You are not following ${userToUnfollowUsername}`,
      400
    );
  }

  currentUser.following.pull(userToUnfollow._id);
  await currentUser.save();

  userToUnfollow.followers.pull(currentUser._id);
  await userToUnfollow.save();

  res.status(200).json({
    success: true,
    message: `${currentUser.username} unhallowed ${userToUnfollow.username}`,
    user: {
      username: userToUnfollow.username,
      name: userToUnfollow.name,
      avatar: userToUnfollow.avatar,
    },
  });
});

export const getPostsOfFollowing = asyncHandler(async (req, res) => {
  const currentUser = req.user;

  if (!currentUser) {
    throw new CustomError("Invalid Request", 400);
  }
  const followingUserIds = currentUser.following.map((id) => id.toString());

  const stories = await Story.find({
    author: { $in: followingUserIds },
    isActive: true,
  })
    .sort("-updatedAt")
    .populate("author", "username name avatar -_id");

  res.status(200).json(stories);
});

export const addProfilePhoto = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  if (!currentUser) {
    throw new CustomError("Invalid Request", 400);
  }

  const form = formidable({ multiples: false, keepExtensions: true });

  form.parse(req, async function (err, fields, files) {
    if (err) {
      throw new CustomError(err.message || "Something Went wrong", 500);
    }
    cloudinary.v2.uploader.upload(
      files.avatar.filepath,
      { folder: "typetales/avatar" },
      (error, result) => {
        if (error) {
          throw new CustomError("Something went wrong while uploading", 500);
        }
        currentUser.avatar = result.secure_url;
        currentUser.save();
        res.status(200).json({
          message: "Profile Picture Uploaded successfully",
          avatarURL: result.secure_url,
        });
      }
    );
  });
});

export const getUserDetail = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const { username } = req.params;

  if (!username || !username) {
    throw new CustomError("Invalid User", 400);
  }
  const user = await User.findOne(
    { username }
    // { name: 1, username: 1, avatar: 1, _id: 0,followers:1 }
  );

  if (!user) {
    throw new CustomError("user not found", 400);
  }
  const isFollowedBYCurrentUser = user.followers.includes(currentUser._id);

  const stories = await Story.find(
    { author: user },
    { story: 1, comments: 1, likesCount: 1 }
  )
    .populate("author", "username name avatar -_id")
    .sort({ createdAt: -1 })
    .exec();

  const commentCount = await Comment.countDocuments({ author: user }).exec();

  const likesCount = await Like.countDocuments({ user: user }).exec();

  const response = {
    user: {
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      following: user.following.length,
      followers: user.followers.length,
      totalComments: commentCount,
      likesCount: likesCount,
      isFollowedBYCurrentUser: isFollowedBYCurrentUser,
    },
    stories,
  };
  res.status(200).json(response);
});
