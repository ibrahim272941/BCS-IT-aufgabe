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
  console.log(currentUser);
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg bg-dark d-flex justify-content-between">
        <div className="d-flex">
          <div style={{ marginLeft: "1rem" }}>
            <NavLink to="/" className="btn btn-secondary">
              Main Page
            </NavLink>
          </div>
          <div></div>
          <span>
            <NavLink to="/invoice" className="btn btn-secondary">
              New invoice
            </NavLink>
          </span>
          <div>
            <NavLink to="/invoicelist" className="btn btn-secondary">
              Invoice List
            </NavLink>
          </div>
        </div>
        <div className="d-flex p-1">
          <span className="m-1">
            {currentUser && (
              <h6 style={{ color: "#fff" }}>{currentUser.displayName}</h6>
            )}
          </span>
          <span>
            {currentUser.displayName ? (
              <Button className="btn btn-warning" onClick={signOutFunc}>
                Sign Out
              </Button>
            ) : (
              window.location.reload()
            )}
          </span>
        </div>
      </nav>
    </div>
  );
};

export default MainNavbar;
