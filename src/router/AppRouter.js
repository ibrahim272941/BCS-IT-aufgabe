import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import FirstNavbar from "../component/Navbar";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
import UserRoute from "./UserRoute";

const AppRouter = () => {
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);
  return (
    <Router>
      <FirstNavbar />
      <Routes>
        <Route element={<UserRoute />}>
          <Route path="/" element={<MainPage />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
