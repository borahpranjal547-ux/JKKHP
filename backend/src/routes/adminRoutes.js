import { Router } from "express";
import { analytics, exportPayments, getUsers, sendNotification, updateUser } from "../controllers/adminController.js";
import { authRequired, authorize } from "../middleware/auth.js";

const router = Router();
router.use(authRequired, authorize("admin"));
router.get("/users", getUsers);
router.patch("/users/:id", updateUser);
router.get("/analytics", analytics);
router.post("/notifications", sendNotification);
router.get("/payments/export", exportPayments);

export default router;
