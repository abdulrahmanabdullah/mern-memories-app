import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";
// Here We can write actions and reducers for posts

// All actions and reducers for post will be here 👍, we don't need more files.

//fetch all post action
export const fetchPosts = createAsyncThunk(
  "posts/fetchPost",
  async (page, thunkAPI) => {
    try {
      const res = await api.fetchPostsAPI(page);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
//Fetch post by id
export const fetchPost = createAsyncThunk(
  "posts/fetchPosts",
  async (id, thunkAPI) => {
    try {
      const res = await api.fetchPostAPI(id);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//add new post action
export const addPost = createAsyncThunk(
  "posts/addNewPost",
  async (post, thunkAPI) => {
    try {
      const res = await api.addPostAPI(post);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//update post action
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post, thunkAPI) => {
    try {
      const id = post._id;
      const response = await api.updatePostAPI(id, post);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Delete post action
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    try {
      const response = await api.deletePostAPI(id);
      return response.data.id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

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
//Search post
export const postBySearch = createAsyncThunk(
  "posts/postBySearch",
  async (searchQuery, thunkAPI) => {
    try {
      const { data } = await api.fetchPostBySearchAPI(searchQuery);
      if (data.data.length === 0)
        return thunkAPI.rejectWithValue("Found 0 matches");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Comment
export const postComment = createAsyncThunk(
  "posts/postComment",
  //Async Thunk accept one praramter. And for that reasone I pass it as a object.
  async (post, thunkAPI) => {
    try {
      const { name, comment, id } = post;
      const { data } = await api.postCommentAPI(id, {
        value: name + ":" + comment,
      });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle", // "loading" | "successed" | "failed"
    posts: [],
    post: null,
    error: null,
    comments: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "successed";
        //Merge array and return a new array.
        state.posts = []; // This solve duplicated posts with search posts.
        state.posts = state.posts.concat(action.payload.data);
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "fetchPosts.failed";
        state.error = action.error.message;
      })
      .addCase(fetchPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "successed";
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "fetchPost.failed";
      })
      .addCase(addPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = "successed";
        state.posts.push(action.payload);
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading";
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
        state.status = "loading";
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
        // state.status = "pending";
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        // state.status = "successed";
        state.error = null;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "falied";
        state.error = action.payload;
      })
      .addCase(postBySearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postBySearch.fulfilled, (state, action) => {
        state.status = "successed";
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(postBySearch.rejected, (state, action) => {
        state.status = "searchPost.failed";
        state.message = action.payload;
      })
      .addCase(postComment.pending, (state, action) => {
        state.status = "commentPost.pending";
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.status = "commentPost.successed";
        // state.posts = [...state.posts];
        state.posts = state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        });
      })
      .addCase(postComment.rejected, (state, action) => {
        state.status = "commentPost.failed";
        state.error = action.payload;
      });
  },
});

// export reducer to implement it in store.js file .
export default postSlice.reducer;
