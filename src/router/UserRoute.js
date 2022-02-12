import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ToRedirect from "./ToRedirect";

const UserRoute = ({ children, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <ToRedirect />;
};

export default UserRoute;
