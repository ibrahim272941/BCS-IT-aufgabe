import React from "react";

import { Navigate, Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {}, [currentUser]);
  console.log(currentUser);
  return currentUser ? <Outlet /> : <Link to="/login" />;
};

export default PrivateRoute;
