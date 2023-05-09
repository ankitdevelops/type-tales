import { Router } from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import {
  handleLike,
  checkUserLikedStatus,
} from "../controllers/like.controller.js";

const router = Router();

router.post("/handleLike", isLoggedIn, handleLike);
router.get("/status/:storyID", isLoggedIn, checkUserLikedStatus);

export default router;
