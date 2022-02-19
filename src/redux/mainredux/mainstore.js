// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "../auhtRedux/rootReducer";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "./sagas";
// let store;
// const sagaMiddleWare = createSagaMiddleware();

// if (process.env.NODE_ENV === "development") {
//   store = createStore(
//     rootReducer,
//     compose(
//       applyMiddleware(sagaMiddleWare),
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   );
// } else {
//   store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
// }
// sagaMiddleWare.run(rootSaga);
// export default store;
