import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

// get user profile from local storage .
const userProfile = localStorage.getItem("profile");
// initial state ,
const initialState = {
  user: userProfile ? userProfile : null,
  isSuccessed: false,
  message: "",
};

//Actions
export const signup = createAsyncThunk("user/signup", async (data) => {
  console.log(data);
});
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});

//Export reducer
export default userSlice.reducer;
