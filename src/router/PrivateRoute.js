import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
