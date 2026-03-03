import { Router } from "express";
import { getMyNotifications } from "../controllers/notificationController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();
router.get("/me", authRequired, getMyNotifications);

export default router;
