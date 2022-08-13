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

import { register, login } from "../controllers/userController.js";
import { issueJwt } from "../lib/utils.js";

const router = express.Router();

/**
 * -------- POST ROUTES -------------
 */
router.get("/posts", getPosts);
router.get("/post/:id", getPost);
router.get("/posts/search", getPostBySearch);

/**
 * --------- POSTS ROUTES WITH MIDDLEWARE----------
 */

router.post(
  "/posts",
  passport.authenticate(["jwt"], { session: false }),
  createPost
);
router.patch(
  "/posts/:id",
  passport.authenticate(["jwt"], { session: false }),
  updatePost
);
router.patch(
  "/posts/likepost/:id",
  passport.authenticate(["jwt"], { session: false }),
  likePost
);
router.delete(
  "/posts/:id",
  passport.authenticate(["jwt"], { session: false }),
  deletePost
);
router.post(
  "/posts/:id/comment",
  passport.authenticate(["jwt"], { session: false }),
  postComment
);

/**
 * ---------------AUTH USER REGION-------------------
 */

//Auth routes
router.post("/user/register", register);
router.post("/user/login", login);

//Back to Home page When  login success with google.
const ClientURL = "http://localhost:3000";

function generateAccessToken(req, res) {
  //Generate token .
  const user = req.user;
  const token = issueJwt(req.user);
  const cookiePayload = {
    name: user.username,
    token: token.token.split(" ")[1],
    id: user._id,
  };
  res.cookie("auth", JSON.stringify(cookiePayload));
  res.redirect(ClientURL);
}

//This route calling from google api console,And passport config file.
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    // successRedirect: ClientURL,
    // failureRedirect: "login/failed",
  }),
  generateAccessToken
);

router.get("login/failed", (req, res) => {
  res.status(405).json({
    success: false,
    message: "Failed to login",
  });
});

//Delete session from server also from browser.
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    return res
      .status(200)
      .json({ success: true, message: "Successful loging out" });
  });
});
export default router;
