import jwt from "jsonwebtoken";
import User from "../models/user";
import { genPassword, validPassword, issueJwt } from "../lib/utils";
import { getGoogleUser, getGoogleUserToken } from "../service/userService";
import mongoose from "mongoose";

const secret = "test";

const accessTokenCookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

const refreshTokenCookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

//Create new user -- register will be name for apis and functions
export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const saltHash = genPassword(password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newUser = new User({
    username: `${firstName} ${lastName}`,
    email,
    salt,
    hash,
  });
  try {
    //If email alreay exist return a message .
    const hadEmail = await User.findOne({ email });
    if (hadEmail) {
      return res.status(400).json({ message: "email already exist" });
    }
    await newUser.save();
    return res.status(200).json({ success: true, newUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check if user exist
    const user = await User.findOne({ email });

    //If user doesn't exist throw this error
    if (!user) return res.status(401).json({ message: "Email doesn't exist" });
    // Check if password correct
    const isValid = validPassword(password, user.hash, user.salt);
    //If true create jwt
    if (isValid) {
      const userJwt = issueJwt(user);
      return res.status(200).json({
        success: true,
        token: userJwt.token.split(" ")[1],
        id: user._id,
        name: user.username,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Send username to client
export const userInfo = async (req, res) => {
  try {
    const { id } = req.params;
    //Check if Id isValid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid Id " });
    }
    const user = await User.findById({ _id: id });
    //If found user
    res.status(200).json({ success: true, name: user.username });
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};

//google Oauth region 🎱
//This handler call from google console and receiving code from reqeust query, with
// this code we can call google apis to get id token and access token. With these values
// we call google apis to get user info then save user data into database.
export const googleOauthHandler = async (req, res) => {
  const code = req.query.code;
  try {
    // Get id and access token
    const { id_token, access_token } = await getGoogleUserToken(code);
    //Get user info
    const googleUser = await getGoogleUser(id_token, access_token);
    //Save user in database.
    // const user = await userModel.create({
    //   email:googleUser.email,
    //   name:googleUser.name,
    //   picture:googleUser.picture
    // })
    const accessToken = jwt.sign(
      {
        ...googleUser,
        id: googleUser.id,
      },
      secret,
      { expiresIn: "1h" }
    );
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    //redirect client to home page
    res.redirect("http://localhost:3000");
  } catch (err) {
    console.log(err.message);
    //Redirect error page.
    res.status(500).json("Error", err.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    console.log(res.locals);
    const token = req.headers.authorization.split(" ")[1];
    let decoded;
    if (token) {
      decoded = jwt.verify(token, "test");
      return res.status(200).json(decoded);
    }
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
