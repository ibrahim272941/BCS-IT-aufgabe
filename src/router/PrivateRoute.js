import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

const PrivateRoute = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return currentUser ? <Outlet /> : <Login />;
};

export default PrivateRoute;
