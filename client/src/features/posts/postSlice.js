import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

//update post action
export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  const id = post._id;
  const response = await api.updatePostAPI(id, post);
  return response.data;
});

//Delete post action
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  const response = await api.deletePostAPI(id);
  return response.data.id;
});

//like post action
export const likePost = createAsyncThunk(
  "posts/likepost",
  async (id, thunkAPI) => {
    try {
      const response = await api.likePostAPI(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle", // "loading" | "successed" | "failed"
    posts: [],
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "successed";
        //Merge array and return a new array.
        state.posts = state.posts.concat(action.payload);
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
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "falied delete post";
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state, action) => {
        state.status = "loading update post";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "successed";
        state.error = null;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "falied";
        state.error = action.payload;
      })
      .addCase(likePost.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "done";
        state.error = null;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "falied";
        state.error = action.payload;
      });
  },
});

// export reducer to implement it in store.js file .
export default postSlice.reducer;
//export all posts
export const allPostSelector = (state) => state.posts.posts;
// status
export const postStatusSelector = (state) => state.posts.status;
