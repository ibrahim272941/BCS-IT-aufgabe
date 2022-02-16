import { combineReducers } from "redux";
import userReducer from "./reducer";
import invoiceReducer from "../mainredux/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  invoice: invoiceReducer,
});

export default rootReducer;
