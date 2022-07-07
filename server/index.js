import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookeParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import appRouter from "./routes/routers.js";
import deserializeUser from "./middleware/deserializeUser.js";
import authUser from "./routes/auth.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./config/database.js"; //Config database
import "./models/user";
import Customer from "./models/user";
import passport from "passport";
import passportConfig from "./config/passportConfig";

/**
 * --------------  GENREL SETUP----------------
 */

//Access variable that saved in the .env file.
dotenv.config();

//Create the Express Application.
const app = express();

//This will initialize the passport object on every request.

passportConfig(passport);
app.use(passport.initialize());
/**
 * -------------- MONGOOSE CONNECTION----------------
 */
// const CONNECTION_URL = process.env.CONNECTION_URL_DEV;
// mongoose.connect("mongodb://localhost:27017/db", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const connection = mongoose.connection;

// connection.on("err", (err) => {
//   console.log(`mongoose throw this :: ${err}`);
// });
// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(cookeParser());

/**
 * -------------- ROUTES ----------------
 */
app.use("/", appRouter);
app.use("/", authUser);

/**
 * -------------- SERVER ----------------
 */
const PORT = process.env.PORT || 5070;
app.listen(PORT, console.log(`server running on ${PORT}`));
