import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import store from "./redux/auhtRedux/store";
import mainStore from "./redux/mainredux/mainstore";
import { Provider } from "react-redux";
import { BasePovider } from "./contexts/BaseContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BasePovider>
        <App />
      </BasePovider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
