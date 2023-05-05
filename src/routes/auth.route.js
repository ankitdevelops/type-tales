import { Router } from "express";
import {
  signUp,
  login,
  listNotFollowingUser,
  followUser,
  unfollowUser,
  listFollowingUsers,
} from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/list", isLoggedIn, listNotFollowingUser);
router.get("/listFollowing", isLoggedIn, listFollowingUsers);
router.post("/follow/:username", isLoggedIn, followUser);
router.post("/unfollow/:username", isLoggedIn, unfollowUser);

export default router;
