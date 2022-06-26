import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
//Context dark and light theme
// const ColorModeColorContext = React.createContext({
//   toggleColorMode: () => {},
// });

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
