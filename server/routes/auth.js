import express from "express";
import passport from "passport";
import Customer from "../models/user";
import { validPassword, genPassword, issueJwt } from "../lib/utils";

const router = express.Router();
// React route to /auth component, this component responsible for login and register with post route.

router.get(
  "/protect",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res
      .status(200)
      .json({ success: true, message: "Welcome you are trusted user." });
  }
);
//Passort local stratgey .
router.post("/nlogin", async (req, res, nex) => {
  try {
    const user = await Customer.findOne({ username: req.body.username });
    if (!user) return res.status(405).json({ message: "User not found!!" });
    const isValid = await validPassword(
      req.body.password,
      user.hash,
      user.salt
    );

    if (isValid) {
      const userJwt = issueJwt(user);
      return res.status(200).json({
        success: true,
        token: userJwt.token,
        result: user,
        expiresIn: userJwt.expires,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Something went wron" });
    }
  } catch (err) {
    return res.status(501).json({ success: false, message: err.message });
  }
});

//Register with JWT startegy
router.post("/reg", async (req, res, next) => {
  const saltHash = await genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newUser = new Customer({
    username: req.body.username,
    hash,
    salt,
  });
  try {
    newUser
      .save()
      .then((user) => res.status(200).json({ success: true, user }));
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});
export default router;
