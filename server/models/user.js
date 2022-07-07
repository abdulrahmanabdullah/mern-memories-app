import mongoose from "mongoose";

const user = mongoose.Schema({
  username: String,
  email: String,
  hash: String,
  salt: String,
});

export default mongoose.model("Customer", user);
