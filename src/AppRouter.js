import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FirstNavbar from "./component/Navbar";

const AppRouter = () => {
  return (
    <Router>
      <FirstNavbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
