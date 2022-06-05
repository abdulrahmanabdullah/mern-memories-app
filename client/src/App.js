import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home";
import Auth from "./components/Auth/Auth";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
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
