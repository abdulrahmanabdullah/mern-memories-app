import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

//Actions
export const signup = createAsyncThunk(
  "users/signup",
  async (data, thunkAPI) => {
    try {
      const response = await api.signUpAPI(data);
      // save user in localstorage .
      if (response.data) {
        localStorage.setItem("profile", JSON.stringify({ ...response?.data }));
      }
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("users/logout", async (thunkAPI) => {
  try {
    await localStorage.removeItem("profile");
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Get user profile from local storage. "This way we can avoid get and set user in useEffect"
// const userProfile = localStorage.getItem("profile");
// initial state ,
const initialState = {
  status: "idle",
  user: null,
  isSuccessed: false,
  message: "",
};

// reducers
export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.isSuccessed = false;
        state.message = "";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "compelete";
        state.isSuccessed = true;
        state.message = "Create Account 👍";
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccessed = false;
        state.message = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = "logout pending";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "Logout compeleted";
        state.user = null;
        state.message = action.payload;
      });
  },
});

//Export reducer
export default userSlice.reducer;
