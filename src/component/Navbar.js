import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

const FirstNavbar = () => {
  let path = useLocation().pathname;

  const dispatch = useDispatch();
  // console.log(currentUser);
  const navigate = useNavigate();

  return (
    <Navbar style={{ color: "#393A3B" }}>
      <Container>
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{ color: "#DFE0DF" }}>
            {/* {!currentUser ? (path = "/login") : (path = "")} */}
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
            {/* {currentUser && <h6>{currentUser.displayName}</h6>} */}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FirstNavbar;
