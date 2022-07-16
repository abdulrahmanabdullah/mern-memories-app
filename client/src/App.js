import React from "react";
import { create } from "jss";
import {
  createTheme,
  ThemeProvider,
  Container,
  GlobalStyles,
} from "@mui/material";
import { StylesProvider, jssPreset } from "@mui/styles";
import rtl from "jss-rtl";
import { CssBaseline } from "@mui/material/";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar.js";
import ThemeContext from "./themeContext.js";
import { fetchUser } from "./features/user/userSlice";
const App = () => {
  const { user } = useSelector((state) => state?.users);
  const dispatch = useDispatch();
  const [mode, setMode] = React.useState("light");
  const [appDirection, setAppDirection] = React.useState("ltr");
  React.useEffect(() => {
    // const getUser = async () => {
    //   fetch("http://localhost:5000/", {
    //     credentials: "include",
    //   }).then((res) => res.json());
    // };
    if (!user) {
      dispatch(fetchUser());
    }
    // getUser();
  }, []);
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
            '"Roboto"',
            '"Amiri"',
            "raleway",
            "-apple-system",
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Cairo"',
          ].join(","),
          letterSpacing: "normal",
        },
        palette: {
          primary: { main: mode === "dark" ? "#0a0909" : "#767efc" },
          secondary: {
            main: "#d5cec3",
          },
          background: {
            paper: mode === "dark" ? "#0a0900" : "#fff",
          },

          // Custom component colors
          appbarContentColors: {
            main: mode === "dark" ? "#fffff" : "#3E3223",
          },
          buttonGroup: { main: mode === "dark" ? "#f4c236" : "#000" },
          buttonLogin: { main: "#fff" },
          likeColor: { main: mode === "dark" ? "#855e95" : "#767efc" },
          paginationColor: { main: mode === "dark" ? "#fff" : "#767efc" },
          custom: {
            main: "#9c6db0",
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
              <GlobalStyles
                styles={{
                  body: {
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(190deg,#233a4e, #9c6db0)fixed"
                        : "linear-gradient(#767efc, #fec9ca)fixed",
                  },
                }}
              />
              <Container maxWidth="xl">
                {/* <Navbar /> */}
                <Navbar props />
                <Routes>
                  <Route path="/" element={<Navigate replace to="/posts" />} />
                  <Route path="/posts" element={<Home />} />
                  <Route path="/posts/search" element={<Home />} />
                  <Route path="/post/:id" element={<PostDetails />} />
                  {/* <Route path="/auth" element={<Auth />} /> */}
                  {!user ? (
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
