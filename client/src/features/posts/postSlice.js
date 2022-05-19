import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import * as api from "../../api";
// Here We can write actions and reducers for posts

// All actions and reducers for post will be here 👍, we don't need more files.

//fetch all post action
export const fetchPost = createAsyncThunk("posts/fetchPost", async () => {
  const response = await api.fetchPostAPI();
  return response.data;
});

//add new post action
export const addPost = createAsyncThunk("posts/addNewPost", async (post) => {
  const response = await api.addPostAPI(post);
  return response.data;
});

//Delete post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  const response = await api.deletePostAPI(id);
  return response.data.id;
});

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    posts: [],
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "successed";
        state.posts = [];
        //Merge array and return a new array.
        state.posts = state.posts.concat(action.payload);
        // state.posts = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPost.pending, (state, action) => {
        state.status = "upload post";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = "successed";
        state.posts.push(action.payload);
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading ...";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "successed";
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

// export reducer to implement it in store.js file .
export default postSlice.reducer;
//export all posts
export const allPostSelector = (state) => state.posts.posts;
// status
export const postStatusSelector = (state) => state.posts.status;
