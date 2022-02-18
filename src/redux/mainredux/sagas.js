import { onValue, query, ref } from "firebase/database";

import { takeLatest, all, put, fork, call, delay } from "redux-saga/effects";
import { database } from "../../auth/getAuth";
import { getInvoiceFail, getInvoiceSucces } from "./actions";
import * as types from "./actionsTypes";

export function* onLoadInvoiceAsync(action) {
  let invoice;
  try {
    const { id } = action.payload;
    const userRef = ref(database, `${id}`);
    invoice = yield;
    onValue(query(userRef), (snapshot) => {
      snapshot.val();
    });

    if (invoice.val() !== null) {
      yield put(getInvoiceSucces(invoice.val()));
    } else {
      yield put(getInvoiceSucces({}));
    }
  } catch (error) {
    yield put(getInvoiceFail());
  }
}
export function* onLoadInvoice() {
  yield takeLatest(types.GET_INVOICE_START, onLoadInvoiceAsync);
}
const invoiceSagas = [fork(onLoadInvoice)];

export default function* rootSaga() {
  yield all([...invoiceSagas]);
}
