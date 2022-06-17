import get from "lodash";
import jwt from "jsonwebtoken";

//
const deserializeUser = async (req, res, next) => {
  // get access token from cookies and headers.

  // get refresh tokens from cookies and headers .

  //decoded access token, and save it in locals variable.

  // check expired token, and refresh it if it expired .

  //throw error if something went wrong with error message.
  const accessToken =
    get(req, "cookies.accessToken") ||
    get(req, "headers.authoriztion", "").split(" ")[1];

  // if (!accessToken) {
  //   return next();
  // }
  console.log("next calling .... ");
  next();
  // const decoded = jwt.verify(accessToken || "", "test");
  // if (decoded) {
  //   res.locals.user = decoded;
  //   return next();
  // }
};
export default deserializeUser;
