import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkTheme: false,
  },
});

export default themeSlice.reducer;
