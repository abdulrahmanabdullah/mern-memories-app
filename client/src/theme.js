import React, { useState } from "react";
import { createTheme } from "@mui/material";
const theme =
  ((appDirection, mode) =>
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
        googleBtn: {
          main: "#fff",
          contrastText: "#000",
        },
        contrastThreshold: 3,
        mode,
      },
    }),
  [mode, appDirection]);
