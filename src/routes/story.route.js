import { Router } from "express";
import {
  createStory,
  getAllStory,
  getUserStory,
  getStoryDetails,
  addComment,
  addReply,
  // getStoryComments,
  getCommentById,
  handleLike,
  getTopFiveStories,
} from "../controllers/story.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/stories", isLoggedIn, getAllStory);
router.get("/my-story", isLoggedIn, getUserStory);
router.get("/trending", isLoggedIn, getTopFiveStories);
router.get("/:id", isLoggedIn, getStoryDetails);
router.get("/comment/:id", isLoggedIn, getCommentById);

router.post("/create", isLoggedIn, createStory);
router.post("/addComment", isLoggedIn, addComment);
router.post("/comment/addReply", isLoggedIn, addReply);
router.post("/handleLike", isLoggedIn, handleLike);

export default router;
