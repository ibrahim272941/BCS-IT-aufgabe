// import { Copyright } from "@mui/icons-material";
import { onValue, query, ref } from "firebase/database";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

import { database } from "../auth/getAuth";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useBaseContext } from "../contexts/BaseContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TAX_RATE = 0.19;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

export default function SpanningTable() {
  const [data, setData] = useState({});

  const navigate = useNavigate();
  const baseContext = useBaseContext();
  const ids = useMemo(
    () => ({
      ids: baseContext.ids,
      setIds: baseContext.setIds,
    }),
    [baseContext.ids, baseContext.setIds, data]
  );
  const {
    displayName,
    reloadUserInfo: { localId },
  } = useSelector((state) => state.user.currentUser);

  let values = {};
  useEffect(() => {
    ids.ids.length > 1
      ? ids.ids.forEach((id, i) => {
          onValue(query(ref(database, `${localId}/${id}`)), (snapshot) => {
            values[i] = snapshot.val();
          });
        })
      : onValue(
          query(ref(database, `${localId}/${ids.ids[0]}`)),
          (snapshot) => {
            values[0] = snapshot.val();
          }
        );

    setData(values);
    console.log(Object.values(data));
  }, []);

  console.log(Boolean(data[0]));
  console.log(Boolean(values));

  const subT = (data) => {
    return (
      data[0] &&
      Object.values(data)
        .map((data) => data.productQuantity * data.productPrice)
        .reduce((sum, i) => sum + i, 0)
    );
  };

  const invoiceTaxes = TAX_RATE * subT(data);
  const invoiceTotal = invoiceTaxes + subT(data);
  const handleClick = () => {
    navigate("/invoicelist");
  };
  return (
    <TableContainer component={Paper}>
      <Button
        sx={{ margin: ".6rem" }}
        variant="contained"
        onClick={handleClick}
      >
        Back to Invoice List
      </Button>
      {data[0] ? (
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(data).map((data, i) => (
              <TableRow key={i}>
                <TableCell>{data.productName}</TableCell>
                <TableCell align="right">{data.productQuantity}</TableCell>
                <TableCell align="right">{data.productPrice}</TableCell>
                <TableCell align="right">
                  {data.productPrice * data.productQuantity}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(subT(data))}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                0
              )} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <TableCell>No invoice to show</TableCell>
      )}
    </TableContainer>
  );
}
