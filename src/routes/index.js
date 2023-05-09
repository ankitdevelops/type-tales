import { Router } from "express";
import authRoutes from "./auth.route.js";
import storyRoutes from "./story.route.js";
import likeRoutes from "./like.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/story", storyRoutes);
// router.use("/story/like", likeRoutes);

export default router;
