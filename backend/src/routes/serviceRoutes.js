import { Router } from "express";
import { createService, deleteService, getServices, updateService } from "../controllers/serviceController.js";
import { authRequired, authorize } from "../middleware/auth.js";

const router = Router();
router.get("/", getServices);
router.post("/", authRequired, authorize("admin"), createService);
router.put("/:id", authRequired, authorize("admin"), updateService);
router.delete("/:id", authRequired, authorize("admin"), deleteService);

export default router;
