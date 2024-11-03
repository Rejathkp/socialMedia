import express from "express";
import {
  addPost,
  toggleLike,
  addComment,
  getFeed,
} from "../controllers/postController.js";
import { authenticateToken } from "../middleware/token.js";

const postRouter = express.Router();

postRouter.post("/", authenticateToken, addPost);
postRouter.post("/:postId/like", authenticateToken, toggleLike);
postRouter.post("/:postId/comment", authenticateToken, addComment);
postRouter.get("/feed", authenticateToken, getFeed);

export default postRouter;
