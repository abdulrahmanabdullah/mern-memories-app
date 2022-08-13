import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/user";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PublicKey = fs.readFileSync(pathToKey, "utf8");

//Load env variable
dotenv.config();

//JWT Strategy
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PublicKey,
  algorithms: ["RS256"],
  passReqToCallback: true,
};
export default function (passport) {
  passport.use(
    // The JWT payload is passed into the verify callback
    new JwtStrategy(options, function (req, jwt_payload, done) {
      User.findOne(
        {
          _id: jwt_payload.sub,
        },
        function (err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            req.user = user;
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      );
    })
  );
}

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // done(null, profile);
      const user = await User.findOne({ email: profile.email });
      const id = profile.sub;
      const username = profile.displayName;
      const email = profile.email;
      //If user not on DB.
      if (!user) {
        const newUser = await User({
          id,
          username,
          email,
        });
        await newUser.save();
        console.log("u save this user=>", newUser);
        return done(null, newUser);
      } else {
        //User already exist.
        return done(null, user);
      }
    }
  )
);

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   console.log("Im called man", user);
//   // process.nextTick(function () {
//   //   return cb(null, user);
//   // });
//   User.findById({ _id: user._id }).then((item) => done(null, item));
// });
