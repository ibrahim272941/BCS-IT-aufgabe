import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEditInvoice from "../moduls/AddEditInvoice";
import MainPage from "../pages/MainPage";

const ModulsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/invoive" element={<AddEditInvoice />} />
    </Routes>
  );
};
export default ModulsRouter;
