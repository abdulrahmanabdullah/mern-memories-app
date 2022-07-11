import express from "express";
import passport from "passport";
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
  userInfo,
} from "../controllers/userController.js";
const router = express.Router();

//Post route
router.get("/posts", getPosts);
router.get("/post/:id", getPost);
router.get("/posts/search", getPostBySearch);
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  createPost
);
router.patch(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  updatePost
);
router.patch(
  "/posts/likepost/:id",
  passport.authenticate("jwt", { session: false }),
  likePost
);
router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);
router.post(
  "/posts/:id/comment",
  passport.authenticate("jwt", { session: false }),
  postComment
);

//Auth route
router.post("/user/register", register);
router.post("/user/login", login);
router.get("/user/me/:id", userInfo);
//This route calling from google api console.
router.get("/user/google/auth", googleOauthHandler);
export default router;
