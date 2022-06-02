import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  likePost,
} from "../controllers/postController.js";
import { register, login } from "../controllers/userController.js";

const router = express.Router();

//Post route
router.get("/posts", getPosts);
router.post("/posts", createPost);
router.patch("/posts/:id", updatePost);
router.patch("/posts/likepost/:id", likePost);
router.delete("/posts/:id", deletePost);

//Auth route
router.post("/user/register", register);
router.post("/user/login", login);
export default router;
