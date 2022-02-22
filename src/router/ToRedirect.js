import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Spinner from "../assets/spinner.gif";
import { Spinner } from "react-bootstrap";

const ToRedirect = ({ nav }) => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currenCount) => --currenCount);
    }, 1000);

    count === 0 && navigate(nav);
    return () => clearInterval(interval);
  }, [count, navigate, nav]);

  return (
    <div className="text-center">
      <Spinner
        style={{
          width: "10rem",
          height: "10rem",
          marginTop: "10rem",
          alignItems: "center",
        }}
        animation="border"
        variant="warning"
        size="lg"
      />
    </div>
  );
};

export default ToRedirect;
