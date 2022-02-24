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
import { loginFunc } from "../redux/auhtRedux/actions";
import FirstNavbar from "../component/Navbar";
import CopyRight from "../component/CopyRight";
import { border, color, width } from "@mui/system";
import Welcome from "../component/Welcome";

const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid Email"),
  password: Yup.string().required("Password not entered"),
});
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    dispatch(loginFunc(values.email, values.password));

    navigate("/");
    resetForm();
  };
  return (
    <div className="container-fluid cont h-100 ">
      <FirstNavbar />
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minWidth: "100%",

          minHeight: "100vh",
        }}
      >
        <Welcome />
        <Container
          sx={{
            // height: "calc(100vh -3rem)",
            marginTop: "14rem",

            marginBottom: "2rem",
            textAlign: "center",
            borderRadius: "1rem",
            padding: "2rem",
            bgcolor: "#393a3b",
            // boxShadow: "3px 5px 5px 3px #555",
            maxHeight: "40vh",
          }}
          maxWidth="xs"
          color="warning"
        >
          {/* <Avatar
          src={Resim}
          sx={{ margin: "1rem auto", bgcolor: "primary.main" }}
        >
        
        </Avatar> */}
          <Typography sx={{ margin: "1rem", color: "#F49B02" }} variant="h4">
            Login
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
              <form className="text-warning" onSubmit={handleSubmit}>
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

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="warning"
                      fullWidth
                      disabled={loading}
                    >
                      Login
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

export default Login;
