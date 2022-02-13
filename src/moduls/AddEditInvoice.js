import React, { useState, useEffect } from "react";
import { database } from "../crud/firebaseConfig";
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

const AddEditInvoice = () => {
  const text = [
    {
      costumerName: "Costumer Name",
    },
    { costumerEmail: "Costumer Email" },
    { costumerMobile: "Costumer Mobile" },
    { costumerAddres: "Costumer Address" },
    { productName: "Product Name" },
    { productPrice: "Product Price" },
    { productQuantity: "Quantity" },
  ];
  const initialValues = {
    costumerName: "",
    costumerEmail: "",
    costumerMobile: "",
    costumerAddres: "",
    productName: "",
    productPrice: "",
    productQuantity: "",
  };
  const [initial, setInitial] = useState(initialValues);
  const handleSubmit = () => {};
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
              {/* {text.map((item, i) => {
                console.log(item);
                return (
                  <Grid key={i} item xs={12}>
                    <TextField
                      name="username"
                      label={Object.values(item)}
                      variant="outlined"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.username && errors.username}
                      error={touched.username && Boolean(errors.username)}
                      fullWidth
                    />
                  </Grid>
                );
              })} */}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="costumerName"
                    label="Costumer Name"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.username && errors.username}
                    error={touched.username && Boolean(errors.username)}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="costumerEmail"
                    label="Costumer Email"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.username && errors.username}
                    error={touched.username && Boolean(errors.username)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="costumerMobile "
                    label="Costumer Mobile"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.username && errors.username}
                    error={touched.username && Boolean(errors.username)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="costumerAddres"
                    label="Costumer Address"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.username && errors.username}
                    error={touched.username && Boolean(errors.username)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="productName"
                    label="Product Name"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    name="productPrice: "
                    label="Product Price"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password && errors.password}
                    error={touched.password && Boolean(errors.password)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    name=" productQuantity "
                    label="Quantity"
                    variant="outlined"
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password2 && errors.password2}
                    error={touched.password2 && Boolean(errors.password2)}
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
