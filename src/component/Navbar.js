import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/getAuth";
import { useSelector } from "react-redux";
const FirstNavbar = () => {
  let path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  const navigate = useNavigate();
  const signOutFunc = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <p
            style={{
              textDecoration: "none",
              fontWeight: "600",
              color: "#AA5803",
            }}
          >
            BCS-IT Aufgabe
          </p>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
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
        {/* {currentUser && <Button onClick={signOutFunc}>Sign Out</Button>} */}
      </Container>
    </Navbar>
  );
};

export default FirstNavbar;
