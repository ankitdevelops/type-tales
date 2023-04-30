import { Router } from "express";
import {
  createStory,
  getAllStory,
  getUserStory,
  getStoryDetails,
} from "../controllers/story.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/stories", isLoggedIn, getAllStory);
router.get("/my-story", isLoggedIn, getUserStory);
router.get("/:id", isLoggedIn, getStoryDetails);
router.post("/create", isLoggedIn, createStory);

export default router;
