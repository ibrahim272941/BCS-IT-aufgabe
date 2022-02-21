import { onValue, push, query, ref, remove, set } from "firebase/database";
import { takeLatest, all, put, fork } from "redux-saga/effects";
import { database } from "../../auth/getAuth";

import {
  getInvoiceFail,
  getInvoiceSucces,
  delInvoiceSucces,
  delInvoiceFail,
  addInvoiceFail,
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
export function* onAddInvoiceAsync({ payload }) {
  const { initialValues, localId } = payload;
  console.log(initialValues, localId);
  try {
    const userRef = ref(database, `${localId}`);
    const newUserRef = push(userRef);
    set(newUserRef, initialValues);
  } catch (error) {
    yield put(addInvoiceFail(error));
  }
}
export function* onAddInvoice() {
  yield takeLatest(types.ADD_INVOICE_START, onAddInvoiceAsync);
}

const invoiceSagas = [
  fork(onLoadInvoice),
  fork(onDeleteInvoice),
  fork(onAddInvoice),
];

export default function* rootSaga() {
  yield all([...invoiceSagas]);
}
