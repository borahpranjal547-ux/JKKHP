import { Router } from "express";
import { getAllPayments, getMyPayments, processPayment } from "../controllers/paymentController.js";
import { authRequired, authorize } from "../middleware/auth.js";

const router = Router();
router.post("/process", authRequired, authorize("citizen", "admin"), processPayment);
router.get("/me", authRequired, authorize("citizen", "admin"), getMyPayments);
router.get("/", authRequired, authorize("admin"), getAllPayments);

export default router;
