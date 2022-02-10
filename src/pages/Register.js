import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as Yup from "yup";
import Resim from "./avatar.png";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../auth/getAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";

const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid Email"),
  password: Yup.string()
    .required("Password not entered")
    .min(6, "Password is too short - should be 6 chars minimum")
    .matches(/\d+/, "Password must have a number")
    .matches(/[a-z]+/, "Pasword must have a lowercase")
    .matches(/[A-Z]/, "Password must have a uppercase")
    .matches(/[!?.@#$%^&*()-+]/, "Password must have a special char"),
  password2: Yup.string()
    .min(6, "Password is too short - should be 6 chars minimum")
    .oneOf([Yup.ref("password"), null], "password didn't match"),
});
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState();
  const { signup } = useAuth();
  const initialValues = {
    email: "",
    password: "",
    password2: "",
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleMouseDownPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    resetForm();
    console.log(values.email);
  };
  return (
    <Container
      sx={{
        marginTop: "3rem",
        height: "calc(100vh -3rem)",
        marginBottom: "2rem",
        textAlign: "center",
        borderRadius: "1rem",
        padding: "2rem",
        bgcolor: "#f8f8f6",
        boxShadow: "3px 5px 5px 3px #555",
      }}
      maxWidth="xs"
    >
      <Avatar src={Resim} sx={{ margin: "1rem auto", bgcolor: "primary.main" }}>
        {/* <LockOutlined /> */}
      </Avatar>
      <Typography sx={{ margin: "1rem" }} variant="h4">
        Sign Up
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={signUpValidationSchema}
      >
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
              {/* <Grid item xs={12}>
                <TextField
                  name="username"
                  label="User Name"
                  variant="outlined"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.username && errors.username}
                  error={touched.username && Boolean(errors.username)}
                  fullWidth
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password && errors.password}
                  error={touched.password && Boolean(errors.password)}
                  fullWidth
                  InputProps={{
                    endAdornment: values.password && (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type={showPassword2 ? "text" : "password"}
                  name="password2"
                  label="Password Again"
                  variant="outlined"
                  value={values.password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password2 && errors.password2}
                  error={touched.password2 && Boolean(errors.password2)}
                  fullWidth
                  InputProps={{
                    endAdornment: values.password2 && (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword2}
                        >
                          {showPassword2 ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
