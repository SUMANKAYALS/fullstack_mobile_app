import express from "express";
import { loginUser, registerUser } from "../controller/auth.controller";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/verifyOtp", verifyOtp);
// router.post("/resendOtp", resendOtp);

export default router;