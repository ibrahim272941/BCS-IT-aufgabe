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
        console.log(authUser);
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

/*
1-) Navbar Current User görünmüyor
2-)Sifre yanlis girse bile yonlendirme yapiyor
3-)

*/
