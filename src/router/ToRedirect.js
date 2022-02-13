import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Spinner from "../assets/spinner.gif";
import { Spinner } from "react-bootstrap";

const ToRedirect = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currenCount) => --currenCount);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div>
      <Spinner
        style={{ width: "10rem", height: "10rem", marginTop: "10rem" }}
        animation="border"
        variant="warning"
        size="lg"
      />
    </div>
  );
};

export default ToRedirect;
