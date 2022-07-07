import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import Customer from "../models/user";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PublicKey = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PublicKey,
  algorithms: ["RS256"],
};
export default function (passport) {
  passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
      Customer.findOne(
        {
          _id: jwt_payload.sub,
        },
        function (err, user) {
          if (err) {
            console.log("inside err ");

            return done(err, false);
          }
          if (user) {
            console.log("inside user");

            return done(null, user);
          } else {
            console.log("inside else user");

            return done(null, false);
          }
        }
      );
    })
  );
  // The JWT payload is passed into the verify callback
}
