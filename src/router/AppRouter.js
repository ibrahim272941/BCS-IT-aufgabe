import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import FirstNavbar from "../component/Navbar";

import { useSelector } from "react-redux";
import UserRoute from "./UserRoute";
import AddEditInvoice from "../moduls/AddEditInvoice";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<UserRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/invoice" element={<AddEditInvoice />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
