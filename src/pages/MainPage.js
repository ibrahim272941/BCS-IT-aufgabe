import React from "react";
import MainNavbar from "../component/MainNavbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddEditInvoice from "../moduls/AddEditInvoice";
import ModulsRouter from "../router/ModulsRouter";

const MainPage = () => {
  return (
    <div>
      <MainNavbar />
      <h3>Main Page</h3>
    </div>
  );
};

export default MainPage;
