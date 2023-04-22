import { Router } from "express";
import authRoutes from "./auth.route.js";
import storyRoutes from "./story.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/story", storyRoutes);

export default router;
