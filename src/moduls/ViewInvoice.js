// import { Copyright } from "@mui/icons-material";
import { onValue, query, ref } from "firebase/database";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { database } from "../auth/getAuth";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useBaseContext } from "../contexts/BaseContext";

// const ViewInvoice = () => {
//   const [show, setShow] = useState(true);
//   const {
//     displayName,
//     reloadUserInfo: { localId },
//   } = useSelector((state) => state.user.currentUser);
//   const [data, setData] = useState({});
//   const { id } = useParams();
//   const handlePrint = () => {
//     window.print();
//     setShow(!show);
//   };

//   useEffect(() => {
//     // dispatch(getInvoiceStart());
//     // dispatch(getInvoiceSucces());
//     const userRef = ref(database, `${localId}/${id}`);
//     onValue(query(userRef), (snapshot) => {
//       setData({ ...snapshot.val() });
//     });
//   }, []);
//   console.log(data);
//   return (
//     <div>
//       <main className="container-lg Invoice  mt-2 mb-2 bg-gray border border-dark">
//         {/*header */}
//         <header className="d-flex  justify-content-between mb-5">
//           <div>
//             <h2 className="fw-bold fs-1 mb-3">Invoice</h2>
//           </div>

//           <div>
//             <div className="d-flex align-items-center justify-content-center flex-wrap">
//               <p>
//                 <button className="btn btn-dark" onClick={handlePrint}>
//                   Print
//                 </button>
//               </p>
//               <p>
//                 <button className="btn btn-success">Download</button>
//               </p>
//               <p>
//                 <button className="btn btn-primary">
//                   <a
//                     href={`mailto:${data.costumerEmail}?subject=my report&body=see attachment&attachment=C:
//                       Users/ibrahim/Desktop/Aufgabe.pdf
//                     `}
//                   >
//                     Send
//                   </a>
//                 </button>
//               </p>
//             </div>
//           </div>
//         </header>
//         {/*end of header */}

//         {/*Details*/}

//         <section className="d-flex flex-column align-items-end justify-content-end">
//           <h2>BCS-IT</h2>
//           <p>Adress</p>
//         </section>
//         {/*End Of Details*/}

//         {/*Costumer Details*/}
//         <section>
//           <h2 className="mt-5 fs-3 fw-bold">{data.costumerName}</h2>
//           <p>{data.costumerAddres}</p>
//           <p>{data.costumerEmail}</p>
//           <p>{data.costumerMobile}</p>
//         </section>
//         {/*Costumer Details end*/}

//         {/*Dates*/}
//         <article className="my-5 d-flex flex-column align-items-end justify-content-end">
//           <div>
//             <p>
//               <span className="fw-bold"> Invoice Number : </span>
//               {id.substring(1)}
//             </p>
//             <p>
//               <span className="fw-bold">Invoice Date :</span>
//               {new Date().toJSON().slice(0, 10)}
//             </p>
//           </div>
//         </article>
//         {/*End Of Dates*/}

//         {/*Table*/}
//         <table class="table">
//           <thead>
//             <tr>
//               <th scope="col">No</th>
//               <th scope="col">Product</th>
//               <th scope="col">Quantity</th>
//               <th scope="col">Total Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th scope="row">1</th>
//               <td>{data.productName}</td>
//               <td>{data.productQuantity}</td>
//               <td>{data.totalAmount}€</td>
//             </tr>
//           </tbody>
//         </table>
//         {/*End of Table*/}
//         {/*Notes*/}
//         {/* <section>
//           <p>Notes to Customer...</p>
//         </section> */}
//         {/*End of Notes*/}
//         {/*Footer */}
//         <div className="d-flex justify-content-end address">
//           <div className="footer w-25  d-flex flex-column flex-end">
//             <p>BCS - IT</p>
//             <p>Solinger Str. 24 , 40764 Langenfeld</p>
//             <p>bcs-it@gmail.com</p>
//             <p>+49 0188-234343</p>
//             <p></p>
//           </div>
//         </div>
//         {/*End of Footer */}
//       </main>
//     </div>
//   );
// };

// export default ViewInvoice;

const TAX_RATE = 0.19;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

// function priceRow(qty, unit) {
//   return qty * unit;
// }

// function createRow(desc, qty, unit) {
//   const price = priceRow(qty, unit);
//   return { desc, qty, unit, price };
// }

export default function SpanningTable() {
  const baseContext = useBaseContext();
  const ids = useMemo(
    () => ({
      ids: baseContext.ids,
      setIds: baseContext.setIds,
    }),
    [baseContext.ids, baseContext.setIds]
  );
  const {
    displayName,
    reloadUserInfo: { localId },
  } = useSelector((state) => state.user.currentUser);
  const [data, setData] = useState({});

  useEffect(() => {
    let values = {};
    ids.ids.length > 1
      ? ids.ids.forEach((id, i) => {
          onValue(query(ref(database, `${localId}/${id}`)), (snapshot) => {
            values[i] = snapshot.val();
          });
        })
      : onValue(
          query(ref(database, `${localId}/${ids.ids[0]}`)),
          (snapshot) => {
            setData({ ...snapshot.val() });
          }
        );

    setData(values);
  }, []);
  function subtotal2(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }
  const subT = (data) => {
    return Object.values(data)
      .map((data) => data.productQuantity * data.productPrice)
      .reduce((sum, i) => sum + i, 0);
  };

  const invoiceTaxes = TAX_RATE * subT(data);
  const invoiceTotal = invoiceTaxes + subT(data);
  return (
    <TableContainer component={Paper}>
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
    </TableContainer>
  );
}
