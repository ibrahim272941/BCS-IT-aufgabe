import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../component/MainNavbar";

const MainPage = () => {
  return (
    <div>
      <MainNavbar />
      <h3>Main Page</h3>
    </div>
  );
};

export default MainPage;
