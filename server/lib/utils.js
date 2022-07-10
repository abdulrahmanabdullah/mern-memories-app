import crypto from "crypto";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PrivateKey = fs.readFileSync(pathToKey, "utf8");

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
export function validPassword(password, hash, salt) {
  try {
    let hashVrify = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return hash === hashVrify;
  } catch (error) {
    console.log(error);
  }
}

export function genPassword(password) {
  let salt = crypto.randomBytes(64).toString("hex");
  let genHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return {
    hash: genHash,
    salt,
  };
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
export function issueJwt(user) {
  const _id = user._id;
  const expiresIn = "1d";

  const payload = {
    sub: _id,
    lat: Date.now(),
  };

  //Sign Jwt
  const signJwt = jwt.sign(payload, PrivateKey, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signJwt,
    expires: expiresIn,
  };
}
