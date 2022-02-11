import React from "react";
import { Container } from "react-bootstrap";
import FirstNavbar from "../component/Navbar";
import Login from "./Login";
import Register from "./Register";

const AuthPage = () => {
  return (
    <Container
      style={{ border: "4px solid red" }}
      className="d-flex flex-column-fluid flex center mt-30 mt-lg-0"
    >
      <Login />
      <Register />
    </Container>
  );
};

export default AuthPage;
