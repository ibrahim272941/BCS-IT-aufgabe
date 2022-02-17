import React, { useState, useEffect } from "react";
import { database } from "../auth/getAuth";
import { isEmpty } from "lodash";
import { Button, Grid, TextField, Typography } from "@mui/material";

import MainNavbar from "../component/MainNavbar";
import { useNavigate, useParams } from "react-router-dom";

import { child, get, push, ref, set, update } from "firebase/database";
import { useSelector } from "react-redux";

const AddEditInvoice = () => {
  const VAT = 0.19;
  let values = {
    costumerName: "",
    costumerEmail: "",
    costumerMobile: "",
    costumerAddres: "",
    productName: "",
    productPrice: "",
    productQuantity: "",
    totalAmount: "",
  };
  const [data, setData] = useState({});
  const [initialValues, setValues] = useState(values);

  const {
    displayName,
    reloadUserInfo: { localId },
  } = useSelector((state) => state.user.currentUser);
  let {
    costumerName,
    costumerEmail,
    costumerMobile,
    costumerAddres,
    productName,
    productPrice,
    productQuantity,
    totalAmount,
  } = initialValues;
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `${localId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData({ ...snapshot.val() });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  useEffect(() => {
    if (isEmpty(id)) {
      setValues({ ...values });
    } else {
      setValues({ ...data[id] });
    }
  }, [id, data]);

  const handleSubmit = async (userId) => {
    if (isEmpty(id)) {
      const userRef = ref(database, `${localId}`, userId);
      const newUserRef = push(userRef);
      set(newUserRef, initialValues);
      navigate("/invoicelist");
    } else {
      const updates = {};
      updates[`${localId}/${id}`] = initialValues;
      update(ref(database), updates);
      navigate("/invoicelist");
    }
  };
  const handleChange = (e) => {
    e.preventDefault();

    let { name, value } = e.target;

    setValues({ ...initialValues, [name]: value });
  };

  return (
    <>
      <MainNavbar />
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="costumerName"
                label="Costumer Name"
                variant="standard"
                value={costumerName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                name="costumerEmail"
                label="Costumer Email"
                variant="standard"
                value={costumerEmail}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="tel"
                name="costumerMobile"
                label="Costumer Mobile"
                variant="standard"
                value={costumerMobile}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="costumerAddres"
                label="Costumer Address"
                variant="standard"
                value={costumerAddres}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="productName"
                label="Product Name"
                variant="standard"
                value={productName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                name="productPrice"
                label="Product Price"
                variant="standard"
                value={productPrice}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                name="productQuantity"
                label="Quantity"
                variant="standard"
                value={productQuantity}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              {}
              <TextField
                type="number"
                name="totalAmount"
                label="Total amount"
                variant="standard"
                value={parseFloat(
                  productQuantity *
                    (parseFloat(productPrice) + productPrice * VAT)
                ).toFixed(2)}
                onChange={handleChange}
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
      </div>
    </>
  );
};

export default AddEditInvoice;
