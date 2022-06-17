import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { getGoogleUser, getGoogleUserToken } from "../service/userService";

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
  try {
    //If email alreay exist return a message .
    const oldUser = await userModel.findOne({ email });
    if (oldUser)
      return res.status(400).json({ message: "email already exist" });
    // hashed password with 12 salt generation
    const hashedPassword = await bcrypt.hash(password, 12);
    // create new user .
    const result = await userModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    // create jwt
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    // send token and result to frontend
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check if user exist
    const existingUser = await userModel.findOne({ email });
    //If user doesn't exist throw this error
    if (!existingUser)
      return res.status().json({ message: "Email doesn't exist" });
    // Check if password correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid Credentials " });
    // token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error });
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
