import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";
import Cookies from "js-cookie";

// Get user profile from local storage. "This way we can avoid get and set user in useEffect"
const loadUser = JSON.parse(localStorage.getItem("profile")) || null;

//Sign up Actions
export const register = createAsyncThunk(
  "users/register",
  async (data, thunkAPI) => {
    try {
      const response = await api.registerAPI(data);
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
//login Actions
export const login = createAsyncThunk("users/login", async (data, thunkAPI) => {
  try {
    //Load user from localStorage .

    const response = await api.loginAPI(data);
    // save user in localstorage .
    if (response.data) {
      localStorage.setItem("profile", JSON.stringify({ ...response?.data }));
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("users/logout", async (thunkAPI) => {
  try {
    await localStorage.removeItem("profile");
    await api.logoutAPI();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// initial state ,
const initialState = {
  status: "idle",
  user: loadUser,
  isLogin: loadUser ? true : false,
  isLogout: !loadUser ? true : false,
  message: "",
};

// reducers
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchMe(state) {
      const auth = Cookies.get("auth");
      if (auth) {
        const convertData = JSON.parse(auth);
        localStorage.setItem("profile", JSON.stringify({ ...convertData }));
        Cookies.remove("auth");
        state.status = "compelete";
        state.user = { ...convertData };
        state.message = "successful login";
        state.isLogin = true;
        state.isLogout = false;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "compelete";
        state.message = "Create Account Successfully Please login 👍";
        // state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.isLogin = false;
        state.isLogout = false;
        state.message = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = "logout pending";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "logout.compeleted";
        state.user = null;
        state.message = action.payload;
        state.isLogin = false;
        state.isLogout = true;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading login";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "compelete";
        state.user = action.payload;
        state.message = "successful login";
        state.isLogin = true;
        state.isLogout = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.isLogin = false;
        state.isLogout = false;
        state.message = action.payload;
      });
  },
});

//Export reducer and actions
export const { fetchMe } = userSlice.actions;
export default userSlice.reducer;
