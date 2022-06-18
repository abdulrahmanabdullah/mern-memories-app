import React, { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const cId =
    "189363193948-fhamkq68ablonm35c5n3ban36oetdm24.apps.googleusercontent.com";
  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} closeOnClick />
      <BrowserRouter>
        <GoogleOAuthProvider clientId={cId}>
          <Container maxWidth="lg">
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate replace to="/posts" />} />
              <Route path="/posts" element={<Home />} />
              <Route path="/posts/search" element={<Home />} />
              <Route path="/posts/:id" element={<PostDetails />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Container>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
