import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookeParser from "cookie-parser";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import session from "express-session";
import appRouter from "./routes/routers.js";
import authUser from "./routes/auth.js";
import "./config/database.js"; //Config database
import "./models/user";
import passport from "passport";
import passportConfig from "./config/passportConfig";

/**
 * --------------  GENREL SETUP----------------
 */

//Access variable that saved in the .env file.
dotenv.config();

//Create the Express Application.
const app = express();
passportConfig(passport);

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["memories"],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    methods: "GET,POST,PATCH,DELETE,PUT",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(cookeParser());
app.use(
  session({
    secret: "some",
  })
);
app.use(passport.initialize());
// app.use(passport.authenticate("session"));
//This will initialize the passport object on every request.
app.use(passport.session());
// Instead of using body-parser middleware, use the new Express implementation of the same thing
/**
 * -------------- ROUTES ----------------
 */
app.use("/", appRouter);

/**
 * -------------- SERVER ----------------
 */
const PORT = process.env.PORT || 5070;
app.listen(PORT, console.log(`server running on ${PORT}`));
