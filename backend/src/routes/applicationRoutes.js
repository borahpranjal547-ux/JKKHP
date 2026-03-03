import { Router } from "express";
import {
  createApplication,
  getAllApplications,
  getMyApplications,
  updateApplicationStatus
} from "../controllers/applicationController.js";
import { authRequired, authorize } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();
router.post("/", authRequired, authorize("citizen", "admin"), upload.array("documents", 5), createApplication);
router.get("/me", authRequired, authorize("citizen", "admin"), getMyApplications);
router.get("/", authRequired, authorize("admin"), getAllApplications);
router.patch("/:id", authRequired, authorize("admin"), updateApplicationStatus);

export default router;
