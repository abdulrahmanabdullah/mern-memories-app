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

/**
 * --- OBJECT OF express ROUTER----
 */
const router = express.Router();

/**
 * -------- POSTS ROUTES -------------
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

//This route calling from google api console,And passport config file.
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

//This func receive user profile from google and generate new token and send it to client by cookies.
function generateAccessToken(req, res) {
  //Generate token .
  const user = req.user;
  const token = issueJwt(req.user);
  const cookiePayload = {
    name: user.username,
    token: token.token.split(" ")[1], // This send only token without any words.
    id: user._id,
  };
  res.cookie("tempAuth", JSON.stringify(cookiePayload));
  res.redirect(process.env.BASE_CLIENT_URL);
}

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "login/failed",
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
