import { onValue, query, ref } from "firebase/database";
import { takeLatest, all, put, fork, call, delay } from "redux-saga/effects";
import { database } from "../../auth/getAuth";
import { getInvoiceFail, getInvoiceSucces } from "./actions";
import * as types from "./actionsTypes";
import { useFetch } from "./crudFunctions";
import axios from "axios";

export function* onLoadInvoiceAsync() {
  // const invoice = useFetch();

  try {
    const invoice = axios.get(
      `https://aufgabe-e6ea6-default-rtdb.europe-west1.firebasedatabase.app/dLiuQkYCo3MpxPohiCq0zvWphnU2`
    );
    // const { localId } = action.payload;
    // const userRef = ref(database, "dLiuQkYCo3MpxPohiCq0zvWphnU2");
    // const invoice = yield  onValue(query(userRef), (snapshot) => {
    //   snapshot.val();
    // });
    // put(getInvoiceSucces(invoice));
    if (invoice !== null) {
      yield put(getInvoiceSucces(invoice));
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
