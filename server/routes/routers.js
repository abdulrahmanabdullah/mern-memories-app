import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  likePost,
} from "../controllers/postController.js";
import auth from "../middleware/auth.js";

import {
  register,
  login,
  googleAuthLogin,
} from "../controllers/userController.js";
const router = express.Router();

//Post route
router.get("/posts", getPosts);
router.post("/posts", auth, createPost);
router.patch("/posts/:id", auth, updatePost);
router.patch("/posts/likepost/:id", auth, likePost);
router.delete("/posts/:id", auth, deletePost);

//Auth route
router.post("/user/register", register);
router.post("/user/login", login);
// router.post("/user/google/auth", googleAuthLogin);
export default router;
