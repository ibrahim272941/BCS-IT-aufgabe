import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ToRedirect from "./ToRedirect";

const UserRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <ToRedirect nav={"/login"} />;
};

export default UserRoute;
