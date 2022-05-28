import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

//Actions
export const signup = createAsyncThunk(
  "users/signup",
  async (data, thunkAPI) => {
    try {
      const response = await api.signUpAPI(data);
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
// get user profile from local storage .
const userProfile = localStorage.getItem("profile");
// initial state ,
const initialState = {
  status: "idle",
  user: userProfile ? userProfile : null,
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
        state.message = "";
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccessed = false;
        state.message = action.payload;
      });
  },
});

//Export reducer
export default userSlice.reducer;
