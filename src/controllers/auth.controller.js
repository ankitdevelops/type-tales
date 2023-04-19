import User from "../models/user.schema";
import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/CustomError";
import cookieOptions from "../utils/cookieOptions";

/******************************************************
 * @SIGNUP
 * @route http://localhost:5000/api/auth/signup
 * @description User signUp Controller for creating new user
 * @returns User Object
 ******************************************************/

export const singUp = asyncHandler(async (req, res) => {
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
