import React from "react";
import { logoutFunc } from "../redux/auhtRedux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MainNavbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const signOutFunc = () => {
    return currentUser && dispatch(logoutFunc());
  };
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg bg-dark d-flex justify-content-between">
        <div className="d-flex">
          <NavLink to="/" className="btn btn-secondary">
            Main Page
          </NavLink>
          <NavLink to="/invoice" className="btn btn-secondary">
            New invoice
          </NavLink>
          <NavLink to="/about" className="btn btn-secondary">
            About
          </NavLink>
        </div>
        <div className="d-flex p-1">
          <span className="m-1">
            {currentUser && (
              <h6 style={{ color: "#fff" }}>{currentUser.displayName}</h6>
            )}
          </span>
          <span>
            {currentUser && (
              <Button className="btn btn-warning" onClick={signOutFunc}>
                Sign Out
              </Button>
            )}
          </span>
        </div>
      </nav>
    </div>
  );
};

export default MainNavbar;
