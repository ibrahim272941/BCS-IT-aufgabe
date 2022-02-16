import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { database } from "../auth/getAuth";
import { useEffect } from "react";
import { child, get, onValue, query, ref, remove } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import MainNavbar from "../component/MainNavbar";

import { Link } from "react-router-dom";
import { getInvoiceStart, getInvoiceSucces } from "../redux/mainredux/actions";
import { onLoadInvoiceAsync } from "../redux/mainredux/sagas";

const columns = [
  { id: "name", label: "Costumer Name", minWidth: 100 },
  { id: "code", label: "Costumer Email", minWidth: 170 },
  {
    id: "population",
    label: "Costumer Mobile",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Costumer Address",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Product Name",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "productPrice",
    label: "Product Price",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "productQuantity",
    label: "Product Quantity",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "totalAmount",
    label: "Total Amount",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 170,
    align: "center",
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState({});

  const {
    displayName,
    reloadUserInfo: { localId },
  } = useSelector((state) => state.user.currentUser);
  const invoice = useSelector((state) => state.invoice);
  console.log(invoice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvoiceStart());
    dispatch(getInvoiceSucces());
    const userRef = ref(database, `${localId}`);
    onValue(query(userRef), (snapshot) => {
      setData({ ...snapshot.val() });
    });
  }, []);

  // useEffect(() => {
  //   const dbRef = ref(database);
  //   get(child(dbRef, `${localId}`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         setData({ ...snapshot.val() });
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const deleteInvoice = (id) => {
    if (window.confirm("Are you sure to delete the invoice")) {
      remove(ref(database, `${localId}/${id}`));
      window.location.reload();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="invoiceList">
      <MainNavbar />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data).map((id, i) => {
                return (
                  <TableRow key={i} hover role="checkbox" tabIndex={-1}>
                    <TableCell>{data[id].costumerName}</TableCell>
                    <TableCell>{data[id].costumerEmail}</TableCell>
                    <TableCell>{data[id].costumerMobile}</TableCell>
                    <TableCell>{data[id].costumerAddres}</TableCell>
                    <TableCell>{data[id].productName}</TableCell>
                    <TableCell>{data[id].productPrice}</TableCell>
                    <TableCell>{data[id].productQuantity}</TableCell>
                    <TableCell>{data[id].totalAmount}€</TableCell>
                    <Link to={`/update/${id}`}>
                      <a className="btn text-primary">
                        <i className="fas fa-pencil" />
                      </a>
                    </Link>

                    <a
                      className="btn text-danger"
                      onClick={() => deleteInvoice(id)}
                    >
                      <i className="fas fa-trash-alt" />
                    </a>

                    <Link to={`/update/${id}`}>
                      <a className="btn text-primary">
                        <i className="fas fa-eye" />
                      </a>
                    </Link>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={Object.keys(data).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
