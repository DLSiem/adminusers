import express from "express";
import { google, signUp, signIn } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);

export default router;
