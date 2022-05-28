import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/posts/postSlice";
import userReducer from "./features/user/userSlice";
export default configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
  // reducer: postReducer,
});
