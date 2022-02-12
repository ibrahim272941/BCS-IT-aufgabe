import { Link, Typography } from "@mui/material";
import React from "react";

function CopyRight() {
  return (
    <Typography
      style={{ color: "#fff" }}
      variant="body2"
      color="light"
      align="center"
    >
      {"Copyright © "}
      <Link href="https://material-ui.com/">Ibrahim Coban</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default CopyRight;
