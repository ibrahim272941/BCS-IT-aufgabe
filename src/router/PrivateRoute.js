import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
