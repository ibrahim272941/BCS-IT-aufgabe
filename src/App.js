import "./App.css";
import AppRouter from "./router/AppRouter";

import { useDispatch } from "react-redux";
import { auth } from "./auth/getAuth";
import { persistUser } from "./redux/auhtRedux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(persistUser(authUser));
      } else {
        dispatch(persistUser(null));
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}
//x9DLBAQjl9hiRUTuFrrqINwKdFU2
export default App;
