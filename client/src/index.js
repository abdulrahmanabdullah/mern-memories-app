import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {},
});

root.render(
  <Provider store={store}>
    <>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </>
  </Provider>
);
