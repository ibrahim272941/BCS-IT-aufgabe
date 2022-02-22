import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Register from "../pages/Register";
import Login from "../pages/Login";

import UserRoute from "./UserRoute";
import AddEditInvoice from "../moduls/AddEditInvoice";
import InvoiceList from "../moduls/InvoiceList";
import AuthRouter from "./AuthRouter";
import ViewInvoice from "../moduls/ViewInvoice";
import { PdfViewer } from "../component/PdfViewer";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<UserRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/invoice" element={<AddEditInvoice />} />
          <Route path="/update/:id" element={<AddEditInvoice />} />
          <Route path="invoicelist" element={<InvoiceList />} />
          <Route path="view/:id" element={<ViewInvoice />} />
          <Route path="/view/pdf" element={<PdfViewer />} />
        </Route>

        <Route element={<AuthRouter />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
