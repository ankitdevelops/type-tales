import { Router } from "express";
import {
  createStory,
  getAllStory,
  getUserStory,
  getStoryDetails,
  addComment,
  addReply,
  getStoryComments,
  getCommentById,
} from "../controllers/story.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/stories", isLoggedIn, getAllStory);
router.get("/my-story", isLoggedIn, getUserStory);
router.get("/:id", isLoggedIn, getStoryDetails);
router.get("/comment/:id", isLoggedIn, getCommentById);
router.post("/create", isLoggedIn, createStory);
router.post("/addComment", isLoggedIn, addComment);
router.post("/comment/addReply", isLoggedIn, addReply);

export default router;
