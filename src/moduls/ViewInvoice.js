import { Copyright } from "@mui/icons-material";
import { onValue, query, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { database } from "../auth/getAuth";

const ViewInvoice = () => {
  const [show, setShow] = useState(true);
  const {
    displayName,
    reloadUserInfo: { localId },
  } = useSelector((state) => state.user.currentUser);
  const [data, setData] = useState({});
  const { id } = useParams();
  const handlePrint = () => {
    window.print();
    setShow(!show);
  };

  useEffect(() => {
    // dispatch(getInvoiceStart());
    // dispatch(getInvoiceSucces());
    const userRef = ref(database, `${localId}/${id}`);
    onValue(query(userRef), (snapshot) => {
      setData({ ...snapshot.val() });
    });
  }, []);
  console.log(data);
  return (
    <div>
      <main className="container-lg Invoice  mt-2 mb-2 bg-gray border border-dark">
        {/*header */}
        <header className="d-flex  justify-content-between mb-5">
          <div>
            <h2 className="fw-bold fs-1 mb-3">Invoice</h2>
          </div>

          <div>
            <div className="d-flex align-items-center justify-content-center flex-wrap">
              <p>
                <button className="btn btn-dark" onClick={handlePrint}>
                  Print
                </button>
              </p>
              <p>
                <button className="btn btn-success">Download</button>
              </p>
              <p>
                <button className="btn btn-primary">
                  <a
                    href={`mailto:${data.costumerEmail}?subject=my report&body=see attachment&attachment=C:
                      Users/ibrahim/Desktop/Aufgabe.pdf
                    `}
                  >
                    Send
                  </a>
                </button>
              </p>
            </div>
          </div>
        </header>
        {/*end of header */}

        {/*Details*/}

        <section className="d-flex flex-column align-items-end justify-content-end">
          <h2>BCS-IT</h2>
          <p>Adress</p>
        </section>
        {/*End Of Details*/}

        {/*Costumer Details*/}
        <section>
          <h2 className="mt-5 fs-3 fw-bold">{data.costumerName}</h2>
          <p>{data.costumerAddres}</p>
          <p>{data.costumerEmail}</p>
          <p>{data.costumerMobile}</p>
        </section>
        {/*Costumer Details end*/}

        {/*Dates*/}
        <article className="my-5 d-flex flex-column align-items-end justify-content-end">
          <div>
            <p>
              <span className="fw-bold"> Invoice Number : </span>
              {id.substring(1)}
            </p>
            <p>
              <span className="fw-bold">Invoice Date :</span>
              {new Date().toJSON().slice(0, 10)}
            </p>
          </div>
        </article>
        {/*End Of Dates*/}

        {/*Table*/}
        <table class="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{data.productName}</td>
              <td>{data.productQuantity}</td>
              <td>{data.totalAmount}€</td>
            </tr>
          </tbody>
        </table>
        {/*End of Table*/}
        {/*Notes*/}
        {/* <section>
          <p>Notes to Customer...</p>
        </section> */}
        {/*End of Notes*/}
        {/*Footer */}
        <div className="d-flex justify-content-end address">
          <div className="footer w-25  d-flex flex-column flex-end">
            <p>BCS - IT</p>
            <p>Solinger Str. 24 , 40764 Langenfeld</p>
            <p>bcs-it@gmail.com</p>
            <p>+49 0188-234343</p>
            <p></p>
          </div>
        </div>
        {/*End of Footer */}
      </main>
    </div>
  );
};

export default ViewInvoice;
