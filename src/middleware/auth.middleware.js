import User from "../models/user.schema.js";
import JWT from "jsonwebtoken";
import asyncHandler from "../service/asyncHandler.js";
import config from "../config/index.js";
import CustomError from "../utils/CustomError.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new CustomError("Authentication Failed", 401);
  }

  try {
    const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);

    req.user = await User.findById(decodedJwtPayload.id);

    next();
  } catch (error) {
    throw new CustomError(
      "Authentication Failed try again after some time",
      401
    );
  }
});
