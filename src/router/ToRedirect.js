import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ToRedirect = () => {
  const [count, setCount] = useState(4);
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
      <p>redirect to in {count} seconds</p>
    </div>
  );
};

export default ToRedirect;
