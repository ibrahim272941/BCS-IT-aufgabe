import React, { useState, useEffect } from "react";
import { database } from "../auth/getAuth";
import { isEmpty } from "lodash";
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { Formik } from "formik";
import MainNavbar from "../component/MainNavbar";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const AddEditInvoice = () => {
  const {
    displayName,
    reloadUserInfo: { localId },
  } = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const initialValues = {
    costumerName: "",
    costumerEmail: "",
    costumerMobile: "",
    costumerAddres: "",
    productName: "",
    productPrice: "",
    productQuantity: "",
  };

  const handleSubmit = async (values, userId) => {
    const userRef = ref(database, `${localId}`, userId);
    const newUserRef = push(userRef);
    set(newUserRef, {
      costumerName: values.costumerName,
      costumerEmail: values.costumerEmail,
      costumerMobile: values.costumerMobile,
      costumerAddres: values.costumerAddres,
      productName: values.productName,
      productPrice: values.productPrice,
      productQuantity: values.productQuantity,
    });
    navigate("/invoicelist");
  };
  return (
    <>
      <MainNavbar />
      <div className="container mt-5">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({
            values,
            handleChange,
            handleSubmit,
            touched,
            errors,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    name="costumerName"
                    label="Costumer Name"
                    variant="outlined"
                    value={values.costumerName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="email"
                    name="costumerEmail"
                    label="Costumer Email"
                    variant="outlined"
                    value={values.costumerEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="tel"
                    name="costumerMobile"
                    label="Costumer Mobile"
                    variant="outlined"
                    value={values.costumerMobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // helperText={touched.costumerMobile && errors.costumerMobile}
                    // error={
                    //   touched.costumerMobile && Boolean(errors.costumerMobile)
                    // }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    name="costumerAddres"
                    label="Costumer Address"
                    variant="outlined"
                    value={values.costumerAddres}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    name="productName"
                    label="Product Name"
                    variant="outlined"
                    value={values.productName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    name="productPrice"
                    label="Product Price"
                    variant="outlined"
                    value={values.productPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    name="productQuantity"
                    label="Quantity"
                    variant="outlined"
                    value={values.productQuantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    fullWidth
                  >
                    Create Invoice
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddEditInvoice;
