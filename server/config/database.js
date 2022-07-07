import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const devConnection = process.env.CONNECTION_URL_DEV;
const prodConnection = process.env.CONNECTION_URL_PRODUCT;

// Connect to the correct environment database
if (process.env.NODE_ENV === "production") {
  mongoose.connect(prodConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Database connected with production 👍");
  });
} else {
  mongoose.connect(devConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Database connected with dev mode");
  });
}
