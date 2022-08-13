import User from "../models/user";
import { genPassword, validPassword, issueJwt } from "../lib/utils";

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
