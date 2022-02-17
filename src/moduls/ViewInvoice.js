import React from "react";

const ViewInvoice = () => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div>
      <main className="container-sm Invoice p-2 m-5 bg-gray border border-dark">
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
                <button className="btn btn-primary">Send</button>
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
          <h2 className="mt-5 fs-3 fw-bold">Costumer Name</h2>
          <p>Costumer Adress</p>
          <p>Costumer Email</p>
          <p>Costumer Telefon Number</p>
        </section>
        {/*Costumer Details end*/}

        {/*Dates*/}
        <article className="my-5 d-flex flex-column align-items-end justify-content-end">
          <div>
            <p>
              <span className="fw-bold"> Invoice Number</span>
            </p>
            <p>
              <span className="fw-bold">Invoice Date</span>
            </p>
          </div>
        </article>
        {/*End Of Dates*/}

        {/*Table*/}
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
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
        <div className="d-flex flex-wrap align-items-center justify-content-center mt-5">
          <p>Company Name</p>
          <p>Company Adress</p>
          <p>Company Email</p>
          <p>Company Phone number</p>
          <p>Website</p>
        </div>
        {/*End of Footer */}
      </main>
    </div>
  );
};

export default ViewInvoice;
