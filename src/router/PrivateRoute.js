import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";

const PrivateRoute = () => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
