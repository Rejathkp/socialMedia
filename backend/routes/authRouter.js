import express from "express";
import { loginUser, registerUser } from "../controllers/auth.js";

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', registerUser);

export default router;