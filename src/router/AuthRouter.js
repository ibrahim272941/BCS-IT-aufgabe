import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ToRedirect from "./ToRedirect";

const AuthRouter = () => {
  const { currentUser } = useSelector((state) => state.user);
  return !currentUser ? <Outlet /> : <ToRedirect nav={"/"} />;
};

export default AuthRouter;
