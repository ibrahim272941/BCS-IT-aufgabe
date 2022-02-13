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
import { child, get, getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import MainNavbar from "../component/MainNavbar";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

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

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState({});
  const {
    displayName,
    reloadUserInfo: { localId },
  } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `${displayName}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData({ ...snapshot.val() });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(Object.keys(data).length);
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
                    <ModeEditOutlineSharpIcon style={{ marginRight: "1rem" }} />
                    <DeleteSharpIcon style={{ color: "red" }} />
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
