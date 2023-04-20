import User from "../models/user.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import cookieOptions from "../utils/cookieOptions.js";

/******************************************************
 * @SIGNUP
 * @route http://localhost:5000/api/v1/auth/signup
 * @description User signUp Controller for creating new user
 * @returns User Object
 ******************************************************/

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    throw new CustomError("Name is required", 400);
  }
  if (!email) {
    throw new CustomError("Name is required", 400);
  }
  if (!password) {
    throw new CustomError("Name is required", 400);
  }

  const registeredUser = await User.findOne({ email });

  if (registeredUser) {
    throw new CustomError("User Already Exists", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.getJWTtoken();

  user.password = undefined;

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    token,
    user,
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
  console.log(checkPassword);
  if (checkPassword) {
    const token = user.getJwtToken();
    console.log(token);
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      token,
      user,
    });
  }
  throw new CustomError("Wrong Password", 400);
});
