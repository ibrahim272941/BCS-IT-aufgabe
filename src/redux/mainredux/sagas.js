import { onValue, query, ref, remove } from "firebase/database";
import { takeLatest, all, put, fork } from "redux-saga/effects";
import { database } from "../../auth/getAuth";

import {
  getInvoiceFail,
  getInvoiceSucces,
  delInvoiceSucces,
  delInvoiceFail,
} from "./actions";
import * as types from "./actionsTypes";

export function* onLoadInvoiceAsync(action) {
  const { localId } = action.payload;

  try {
    const userRef = ref(database, `${localId}`);
    const invoice2 = yield new Promise((resolve) =>
      onValue(query(userRef), resolve)
    );

    const invoice = yield onValue(query(userRef), (snapshot) => {
      snapshot.val();
    });

    if (invoice !== null) {
      yield put(getInvoiceSucces(invoice2.val()));
    } else {
      yield put(getInvoiceSucces({}));
    }
  } catch (error) {
    yield put(getInvoiceFail(error));
  }
}
export function* onLoadInvoice() {
  yield takeLatest(types.GET_INVOICE_START, onLoadInvoiceAsync);
}

export function* onDeleteInvoiceAsync({ payload }) {
  const { id, localId } = payload;
  console.log(id, localId);
  try {
    yield remove(ref(database, `${id}/${localId}`));
    yield put(delInvoiceSucces());
  } catch (error) {
    yield put(delInvoiceFail(error));
  }
}
export function* onDeleteInvoice() {
  yield takeLatest(types.DELETE_INVOICE_START, onDeleteInvoiceAsync);
}

const invoiceSagas = [fork(onLoadInvoice), fork(onDeleteInvoice)];

export default function* rootSaga() {
  yield all([...invoiceSagas]);
}
