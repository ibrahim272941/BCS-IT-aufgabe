import * as types from "./actionsTypes";

export const getInvoiceStart = (id) => ({
  type: types.GET_INVOICE_START,
  payload: { id },
});
export const getInvoiceSucces = (invoice) => ({
  type: types.GET_INVOICE_SUCCESS,
  payload: invoice,
});
export const getInvoiceFail = (error) => ({
  type: types.GET_INVOICE_FAIL,
  payload: error,
});
