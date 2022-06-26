import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/posts/postSlice";
import userReducer from "./features/user/userSlice";
import themeSlice from "./features/themeSlice";
export default configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    theme: themeSlice,
  },
  // reducer: postReducer,
});
