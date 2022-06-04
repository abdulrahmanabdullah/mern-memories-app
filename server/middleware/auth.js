import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    //get token from headers.
    const token = req.headers.authorization.split(" ")[1];
    // Is own token or google sdk token
    const isOwnToken = token.length < 500; // Google tokens more than 500.

    let decodeData;
    //verify token
    if (token && isOwnToken) {
      decodeData = jwt.verify(token, "test"); // test here is a secret word for own tokens
      req.userId = decodeData?.id;
    } else {
      decodeData = jwt.verify(token);
      req.userId = decodeData?.sub;
    }
    // call next func
    next();
  } catch (error) {
    console.log(error.message);
  }
};
export default auth;
