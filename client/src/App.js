import React from "react";
import { create } from "jss";
import { createTheme, ThemeProvider, Container } from "@mui/material";
import { StylesProvider, jssPreset } from "@mui/styles";
import rtl from "jss-rtl";
import { CssBaseline } from "@mui/material/";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar.js";
import ThemeContext from "./themeContext.js";
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const [mode, setMode] = React.useState("light");
  const [appDirection, setAppDirection] = React.useState("ltr");
  const themeContext = React.useMemo(
    () => ({
      toggleColorMode: (action) => {
        setMode(action);
      },
      toggleDirection: (action) => {
        setAppDirection(action);
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        direction: appDirection,
        typography: {
          fontFamily: [
            "Roboto",
            "Amiri",
            "raleway",
            "-apple-system",
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
          letterSpacing: "normal",
        },
        palette: {
          primary: { main: "#f4c236", light: "#3A5BA0" },
          background: {
            default: mode === "dark" ? "#121212" : "#ede9e4",
          },
          secondary: {
            main: "#d5cec3",
          },
          // Custom component colors
          appbarContentColors: {
            main: mode === "dark" ? "#fffff" : "#3E3223",
          },
          buttonGroup: { main: mode === "dark" ? "#f4c236" : "#000" },
          custom: {
            main: "#91826e",
            contrastText: "#fff",
          },
          contrastThreshold: 3,
          mode,
        },
      }),
    [mode, appDirection]
  );
  const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
  });
  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} closeOnClick />
      <ThemeContext.Provider value={themeContext}>
        <StylesProvider jss={jss}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Container maxWidth="xl">
                {/* <Navbar /> */}
                <Navbar props />
                <Routes>
                  <Route path="/" element={<Navigate replace to="/posts" />} />
                  <Route path="/posts" element={<Home />} />
                  <Route path="/posts/search" element={<Home />} />
                  <Route path="/post/:id" element={<PostDetails />} />
                  {!user?.result ? (
                    <Route path="/auth" element={<Auth />} />
                  ) : (
                    <Route
                      path="/auth"
                      element={<Navigate replace to="/posts" />}
                    />
                  )}
                </Routes>
              </Container>
            </ThemeProvider>
          </BrowserRouter>
        </StylesProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
