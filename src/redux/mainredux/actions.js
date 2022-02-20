import * as types from "./actionsTypes";

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
  payload: {},
});
