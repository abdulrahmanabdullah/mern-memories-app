import express from "express";
import {
  getPosts,
  getPost,
  getPostBySearch,
  createPost,
  deletePost,
  updatePost,
  likePost,
  postComment,
} from "../controllers/postController.js";
import auth from "../middleware/auth.js";

import {
  register,
  login,
  googleOauthHandler,
  getUsers,
} from "../controllers/userController.js";
const router = express.Router();

//Post route
router.get("/posts", getPosts);
router.get("/post/:id", getPost);
router.get("/posts/search", getPostBySearch);
router.post("/posts", auth, createPost);
router.patch("/posts/:id", auth, updatePost);
router.patch("/posts/likepost/:id", auth, likePost);
router.delete("/posts/:id", auth, deletePost);
router.post("/posts/:id/comment", auth, postComment);

//Auth route
router.post("/user/register", register);
router.post("/user/login", login);
//This route calling from google api console.
router.get("/user/google/auth", googleOauthHandler);
export default router;
