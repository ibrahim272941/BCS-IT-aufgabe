import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation, Private } from "react-router-dom";
const FirstNavbar = () => {
  const path = useLocation().pathname;
  console.log(path);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link
            style={{
              textDecoration: "none",
              fontWeight: "600",
              color: "#AA5803",
            }}
            to="/login"
          >
            BCS-IT Aufgabe
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {path === "/login" && " Don't have an account "}
            {path === "/register" && "Already have an account "}
            <Link
              style={{
                textDecoration: "none",
                fontWeight: "600",
                color: "#AA5803",
              }}
              to={`${path === "/login" ? "/register" : "/login"}`}
            >
              {path === "/register" && "Login"}
              {path === "/login" && "Register"}
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FirstNavbar;
