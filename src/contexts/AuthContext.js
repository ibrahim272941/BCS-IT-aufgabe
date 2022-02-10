import React, { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../auth/getAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  //   useEffect(() => {
  //     const unsubsribe = auth.onAuthStateChanged((user) => {
  //       setCurrentUser(user);
  //     });
  //     return unsubsribe;
  //   }, []);

  const signup = (email, password, auth) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const data = {
    currentUser,
    signup,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
