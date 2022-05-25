import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="189363193948-1b0lp4dnmitqj3ra9lpukk8tb2qohj4t.apps.googleusercontent.com">
        <Container maxWidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
