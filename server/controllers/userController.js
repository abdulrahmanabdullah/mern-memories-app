import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config({ path: "../../.env" });

const oAuth2Client = new OAuth2Client(
  "189363193948-fhamkq68ablonm35c5n3ban36oetdm24.apps.googleusercontent.com",
  "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",
  "/" //redirect url
);
//Google login
export const googleAuthLogin = async (req, res) => {
  try {
    console.log(req.body.access_token.code);
    const tokens = await oAuth2Client.getToken(req.body.access_token.code);
    res.status(200).json(tokens);
  } catch (error) {
    console.log(error.message);
  }
};
const secret = "test";
//Register
export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // check if email alreay exist return message .
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
