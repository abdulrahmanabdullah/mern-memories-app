import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
import { signup } from "../controllers/userController.js";

const router = express.Router();

//Post route
router.get("/posts", getPosts);
router.post("/posts", createPost);
router.patch("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

//Auth route
router.post("/user/signup", signup);
export default router;
