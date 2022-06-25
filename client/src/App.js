import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavbarTliwan from "./components/Navbar/NavbarTliwa.jsx";
import Home from "./components/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar.js";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} closeOnClick />
      <BrowserRouter>
        <Container maxWidth="xl">
          {/* <Navbar /> */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/post/:id" element={<PostDetails />} />
            {!user?.result ? (
              <Route path="/auth" element={<Auth />} />
            ) : (
              <Route path="/auth" element={<Navigate replace to="/posts" />} />
            )}
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App;
