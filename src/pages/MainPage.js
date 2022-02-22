import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../component/MainNavbar";
import PersistentDrawerLeft from "../component/Modal";

const MainPage = () => {
  return (
    <div>
      {/* <MainNavbar /> */}
      <PersistentDrawerLeft />
    </div>
  );
};

export default MainPage;
