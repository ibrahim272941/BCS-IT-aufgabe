import * as types from "./actionsTypes";
/* GET invoice  saved in database  */

export const getInvoiceStart = (localId) => ({
  type: types.GET_INVOICE_START,
  payload: { localId },
});
export const getInvoiceSucces = (invoice) => ({
  type: types.GET_INVOICE_SUCCESS,
  payload: invoice,
});
export const getInvoiceFail = (error) => ({
  type: types.GET_INVOICE_FAIL,
  payload: error,
});

/* DELETE Invoice  */
export const delInvoiceStart = (id, localId) => ({
  type: types.DELETE_INVOICE_START,
  payload: { id, localId },
});
export const delInvoiceSucces = () => ({
  type: types.DELETE_INVOICE_SUCCESS,
  payload: {},
});
export const delInvoiceFail = (error) => ({
  type: types.DELETE_INVOICE_FAIL,
  payload: error,
});

/* ADD Invice to Database*/
export const addInvoiceStart = (initialValues, localId) => ({
  type: types.ADD_INVOICE_START,
  payload: { initialValues, localId },
});
export const addInvoiceSucces = () => ({
  type: types.ADD_INVOICE_SUCCESS,
  payload: {},
});
export const addInvoiceFail = (error) => ({
  type: types.ADD_INVOICE_FAIL,
  payload: error,
});

/*EDIT Invoice in Database */
export const editInvoiceStart = (initialValues, localId, id) => ({
  type: types.EDIT_INVOICE_START,
  payload: { initialValues, localId, id },
});

export const editInvoiceSuccess = () => ({
  type: types.EDIT_INVOICE_SUCCESS,
  payload: {},
});
export const editInvoiceFail = (error) => ({
  type: types.EDIT_INVOICE_FAIL,
  payload: error,
});
