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
  homePage,
  isLogin,
} from "../controllers/postController.js";

import { register, login } from "../controllers/userController.js";
const router = express.Router();

//Post route
router.get("/", isLogin, homePage);
router.get("/posts", getPosts);
router.get("/post/:id", getPost);
router.get("/posts/search", getPostBySearch);
router.post("/posts", isLogin, createPost);
router.patch("/posts/:id", isLogin, updatePost);
router.patch(
  "/posts/likepost/:id",
  passport.authenticate(["google", "jwt"], { session: false }),
  likePost
);
router.delete("/posts/:id", isLogin, deletePost);
router.post("/posts/:id/comment", isLogin, postComment);

//Auth route
router.post("/user/register", register);
router.post("/user/login", login);

//This route calling from google api console.
const ClientURL = "http://localhost:3000";
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: ClientURL,
    failureRedirect: "login/failed",
  })
);
router.get("login/failed", (req, res) => {
  res.status(405).json({
    success: false,
    message: "Failed to login",
  });
});
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    return res
      .status(200)
      .json({ success: true, message: "Successful loging out" });
  });
});
export default router;
