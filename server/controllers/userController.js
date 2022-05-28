import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userModel from "../models/userModel";

const secret = "test";
// Sign up
export const signup = async (req, res) => {
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
