import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import appRouter from "./routes/routers.js";

dotenv.config({ path: "../.env" });
// create app
const app = express();

//constent
const PORT = process.env.PORT || 5070;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//Router
app.use("/posts", appRouter);

//Connection
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.on("err", (err) => {
  console.log(`mongoose throw this :: ${err}`);
});

// Fire server 🔥
app.listen(PORT, console.log(`server running on ${PORT}`));
