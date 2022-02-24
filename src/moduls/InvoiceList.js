import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { delInvoiceStart, getInvoiceStart } from "../redux/mainredux/actions";
import PersistentDrawerLeft from "../component/Modal";
import { Button } from "@mui/material";
import { successNote } from "../utils/customToastify";
import { useBaseContext } from "../contexts/BaseContext";
import { ToastContainer, toast } from "react-toastify";

const columns = [
  { id: "name", label: "Costumer Name", minWidth: 100 },
  { id: "code", label: "Costumer Email", minWidth: 170 },
  {
    id: "population",
    label: "Costumer Mobile",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Costumer Address",
    minWidth: 180,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Product Name",
    minWidth: 100,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "productPrice",
    label: "Product Price",
    minWidth: 100,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "productQuantity",
    label: "Product Quantity",
    minWidth: 100,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "totalAmount",
    label: "Total Amount",
    minWidth: 100,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 120,
    align: "left",
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function StickyHeadTable() {
  const navigate = useNavigate();

  const [rowSel, setRowSel] = useState(false);
  const baseContext = useBaseContext();
  const uiProps = useMemo(
    () => ({
      ids: baseContext.ids,
      setIds: baseContext.setIds,
    }),
    [baseContext.setIds, baseContext.ids]
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    reloadUserInfo: { localId },
  } = useSelector((state) => state.user.currentUser);
  const data = useSelector((state) => state.invoice.invoice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvoiceStart(localId));
  }, []);

  const deleteInvoice = (id) => {
    if (window.confirm("Are you sure to delete the invoice")) {
      dispatch(delInvoiceStart(localId, id));
      successNote("Invoice is deleted");
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
  const handleChange = (id) => {
    !uiProps.ids.includes(id) && uiProps.setIds([...uiProps.ids, id]);
    setRowSel(!rowSel);

    // ? (rowEl.current.style.backgroundColor = "green") &&
    //   uiProps.setIds([...uiProps.ids, id])
    // : (rowEl.current.style.backgroundColor = "white") && uiProps.setIds([]);
  };
  const handleInvoice = () => {
    navigate("/view");
  };
  console.log(uiProps.ids);
  return (
    <div className="invoiceList">
      <PersistentDrawerLeft />
      <ToastContainer />
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          marginTop: "4rem",
          height: "100vh",
        }}
      >
        {rowSel && (
          <Button
            onClick={handleInvoice}
            sx={{ margin: ".6rem" }}
            variant="contained"
          >
            View Invoice
          </Button>
        )}
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
              {data ? (
                Object.keys(data).map((id, i) => {
                  return (
                    <>
                      <TableRow key={i} hover role="checkbox" tabIndex={-1}>
                        <TableCell>
                          {" "}
                          <Checkbox
                            onClick={() => handleChange(id)}
                            color="primary"
                            sx={{ width: "4px" }}
                          />
                        </TableCell>
                        <TableCell>{data[id].costumerName}</TableCell>
                        <TableCell>{data[id].costumerEmail}</TableCell>
                        <TableCell>{data[id].costumerMobile}</TableCell>
                        <TableCell>{data[id].costumerAddres}</TableCell>
                        <TableCell>{data[id].productName}</TableCell>
                        <TableCell>{data[id].productPrice}</TableCell>
                        <TableCell>{data[id].productQuantity}</TableCell>
                        <TableCell>{data[id].totalAmount}€</TableCell>
                        {rowSel && (
                          <TableCell>
                            <Link to={`/update/${id}`}>
                              <p className="btn text-primary">
                                <i className="fas fa-pencil" />
                              </p>
                            </Link>
                            <Link to="/invoicelist">
                              <p
                                className="btn text-danger"
                                onClick={() => deleteInvoice(id)}
                              >
                                <i className="fas fa-trash-alt" />
                              </p>
                            </Link>
                          </TableCell>
                        )}
                      </TableRow>
                    </>
                  );
                })
              ) : (
                <TableCell>No Invoice to Show</TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data ? Object.keys(data).length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
