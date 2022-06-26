import React, { useEffect } from "react";
import { useTheme, createTheme, ThemeProvider, Container } from "@mui/material";
import { CssBaseline } from "@mui/material/";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import NavbarTliwan from "./components/Navbar/NavbarTliwa.jsx";
import Home from "./components/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar.js";
import ColorModeContext from "./themeContext.js";
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: (action) => {
        setMode(action);
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default: mode === "dark" ? "#121212" : "#fff",
          },
          mode,
        },
      }),
    [mode]
  );
  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} closeOnClick />
      <ColorModeContext.Provider value={colorMode}>
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
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
