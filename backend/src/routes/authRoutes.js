import { Router } from "express";
import { body } from "express-validator";
import { login, register, registerValidators, verifyOtp } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";

const router = Router();
router.post("/register", registerValidators, validate, register);
router.post("/verify-otp", [body("userId").notEmpty(), body("otp").isLength({ min: 6, max: 6 })], validate, verifyOtp);
router.post("/login", [body("email").isEmail(), body("password").notEmpty()], validate, login);

export default router;
