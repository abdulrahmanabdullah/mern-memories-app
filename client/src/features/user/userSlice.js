import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

// get user profile from local storage .
const userProfile = localStorage.getItem("profile");
// initial state ,
const initialState = {
  status: "idle",
  user: userProfile ? userProfile : null,
  isSuccessed: false,
  message: "",
};

//Actions
export const signup = createAsyncThunk(
  "user/signup",
  async (data, thunkAPI) => {
    try {
      const response = await api.signUpAPI(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // return error;
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducer(builder) {
    builder
      .addCase(signup.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSuccessed = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccessed = false;
      });
  },
});

//Export reducer
export default userSlice.reducer;
