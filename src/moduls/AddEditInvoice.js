import React, { useState, useEffect } from "react";
import { database } from "../auth/getAuth";
import { isEmpty } from "lodash";
import { Button, Grid, TextField } from "@mui/material";

import MainNavbar from "../component/MainNavbar";
import { useNavigate, useParams } from "react-router-dom";

import { child, get, push, ref, set, update } from "firebase/database";
import { useSelector } from "react-redux";

const AddEditInvoice = () => {
  const values = {
    costumerName: "",
    costumerEmail: "",
    costumerMobile: "",
    costumerAddres: "",
    productName: "",
    productPrice: "",
    productQuantity: "",
  };
  const [data, setData] = useState({});
  const [initialValues, setValues] = useState(values);
  const {
    displayName,
    reloadUserInfo: { localId },
  } = useSelector((state) => state.user.currentUser);
  const {
    costumerName,
    costumerEmail,
    costumerMobile,
    costumerAddres,
    productName,
    productPrice,
    productQuantity,
  } = initialValues;

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

  const handleBlur = () => {};
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
                variant="outlined"
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
                variant="outlined"
                value={costumerEmail}
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
                value={costumerMobile}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="costumerAddres"
                label="Costumer Address"
                variant="outlined"
                value={costumerAddres}
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
                value={productName}
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
                value={productPrice}
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
                value={productQuantity}
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
      </div>
    </>
  );
};

export default AddEditInvoice;
