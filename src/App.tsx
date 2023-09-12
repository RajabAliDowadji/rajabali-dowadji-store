import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage.web";
import RegisterPage from "./Pages/Register/RegisterPage.web";
import LandingPage from "./Pages/LandingPage/LandingPage.web";
import AdminPage from "./Pages/AdminPage/AdminPage.web";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-up" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/super-admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
