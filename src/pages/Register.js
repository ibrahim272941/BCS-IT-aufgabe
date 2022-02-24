import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as Yup from "yup";
import Resim from "../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerFunc } from "../redux/auhtRedux/actions";
import FirstNavbar from "../component/Navbar";
import CopyRight from "../component/CopyRight";
import Welcome from "../component/Welcome";

const signUpValidationSchema = Yup.object().shape({
  username: Yup.string().required("User Name is required"),
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

  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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

  const handleSubmit = async (values) => {
    setLoading(true);
    dispatch(registerFunc(values.email, values.password, values.username));
    currentUser && navigate("/");
  };
  return (
    <div className="container-fluid cont h-100">
      <FirstNavbar />
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minWidth: "100%",

          minHeight: "90vh",
          bgcolor: "#393a3b",
        }}
      >
        <Welcome />

        <Container
          sx={{
            marginTop: "12rem",
            maxHeight: "48vh",
            marginBottom: "2rem",
            textAlign: "center",
            borderRadius: "1rem",
            padding: "2rem",

            // boxShadow: "3px 5px 5px 3px #555",
            bgcolor: "#393a3b",
          }}
          maxWidth="xs"
        >
          {/* <Avatar
          src={Resim}
          sx={{ margin: "1rem auto", bgcolor: "primary.main" }}
        >
         
        </Avatar> */}
          <Typography sx={{ margin: "1rem", color: "#F49B02" }} variant="h4">
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
                  <Grid item xs={12}>
                    <TextField
                      name="username"
                      label="User Name"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.username && errors.username}
                      error={touched.username && Boolean(errors.username)}
                      fullWidth
                      variant="standard"
                      color="warning"
                      focused
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.email && errors.email}
                      error={touched.email && Boolean(errors.email)}
                      fullWidth
                      variant="standard"
                      color="warning"
                      focused
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type={showPassword ? "text" : "password"}
                      name="password"
                      label="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.password && errors.password}
                      error={touched.password && Boolean(errors.password)}
                      fullWidth
                      variant="standard"
                      color="warning"
                      focused
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
                  {/* <Grid item xs={12}>
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
                </Grid> */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="warning"
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
      </Container>
      <CopyRight />
    </div>
  );
};

export default Register;
