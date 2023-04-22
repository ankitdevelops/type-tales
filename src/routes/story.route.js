import { Router } from "express";
import { createStory } from "../controllers/story.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/create", isLoggedIn, createStory);

export default router;
