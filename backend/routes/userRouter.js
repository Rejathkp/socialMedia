import express from "express";
import { getUserProfile, toggleFollow } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/token.js";

const userRouter = express.Router();

userRouter.get("/me", authenticateToken, getUserProfile);
userRouter.post("/follow/:id", authenticateToken, toggleFollow);

export default userRouter;
