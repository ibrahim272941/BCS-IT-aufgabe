import { onValue, query, ref } from "firebase/database";
import { takeLatest, all, put, fork } from "redux-saga/effects";
import { database } from "../../auth/getAuth";

import { getInvoiceFail, getInvoiceSucces } from "./actions";
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
const invoiceSagas = [fork(onLoadInvoice)];

export default function* rootSaga() {
  yield all([...invoiceSagas]);
}
