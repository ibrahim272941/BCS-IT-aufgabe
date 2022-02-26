import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { delInvoiceStart, getInvoiceStart } from "../redux/mainredux/actions";
import PersistentDrawerLeft from "../component/Modal";
import { Button, TextField } from "@mui/material";
import { successNote } from "../utils/customToastify";
import { useBaseContext } from "../contexts/BaseContext";
import { ToastContainer, toast } from "react-toastify";
import { fontSize } from "@mui/system";

const columns = [
  { id: "check", label: "", minWidth: 10, align: "left" },
  { id: "name", label: "Name", minWidth: 100, align: "left" },
  { id: "code", label: "Email", minWidth: 170, align: "left" },
  {
    id: "population",
    label: "Mobile",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Address",
    minWidth: 180,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Product",
    minWidth: 100,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "productPrice",
    label: "Price",
    minWidth: 100,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "productQuantity",
    label: "Quantity",
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
export default function EnhancedTable() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const baseContext = useBaseContext();
  const uiProps = useMemo(
    () => ({
      ids: baseContext.ids,
      setIds: baseContext.setIds,
    }),
    [baseContext.setIds, baseContext.ids]
  );

  const {
    reloadUserInfo: { localId },
  } = useSelector((state) => state.user.currentUser);
  const data = useSelector((state) => state.invoice.invoice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvoiceStart(localId));
    uiProps.setIds([]);
  }, []);

  const deleteInvoice = (id) => {
    if (window.confirm("Are you sure to delete the invoice")) {
      dispatch(delInvoiceStart(localId, id));
      successNote("Invoice is deleted");
      window.location.reload();
    }
  };
  const handleChange = (id, e) => {
    !uiProps.ids.includes(id) && uiProps.setIds([...uiProps.ids, id]);
  };

  const handleInvoice = () => {
    navigate("/view");
  };
  const handleChangeSearch = (e) => {
    let txt = e.target.value;
    setSearch(txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };
  const data2 = Object.keys(data).filter((id) => {
    return search !== "" ? data[id].costumerName.includes(search) : id;
  });

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <PersistentDrawerLeft />{" "}
      <Paper sx={{ width: "100%", mt: 7 }}>
        <ToastContainer />

        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(selected.length > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
        >
          {selected.length > 0 ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {selected.length} selected
            </Typography>
          ) : (
            <TextField
              name="search"
              label="Enter Costumer Name"
              onChange={(e) => handleChangeSearch(e)}
              color="warning"
              id="outlined-search"
              type="search"
              sx={{ margin: "2rem auto", width: "50%" }}
              align="center"
            />
          )}

          {selected.length > 0 && (
            <Button
              onClick={handleInvoice}
              sx={{
                margin: ".6rem",
                fontSize: "12px",
                width: "10rem",
                padding: 1,
              }}
              variant="contained"
              color="warning"
            >
              View Invoice
            </Button>
          )}
        </Toolbar>

        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ marginLeft: "3rem" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data ? (
                data2.map((id, i) => {
                  return (
                    <TableRow
                      key={i}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      onClick={(event) => handleClick(event, data[id])}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(e) => handleChange(id, e)}
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
                    </TableRow>
                  );
                })
              ) : (
                <TableCell>No Invoice to Show</TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data2.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
