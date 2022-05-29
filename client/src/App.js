import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import Auth from "./components/Auth/Auth";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} closeOnClick />
      <BrowserRouter>
        <GoogleOAuthProvider clientId="189363193948-fn6mn8svmgjdvkm6e0igj8121b1ka3l6.apps.googleusercontent.com">
          <Container maxWidth="lg">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Container>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
