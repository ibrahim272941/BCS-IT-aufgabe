import * as types from "./actionTypes";
import { auth } from "../../auth/getAuth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
const registerStart = () => ({
  type: types.REGISTER_START,
});
const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});
const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});

const loginStart = () => ({
  type: types.LOGIN_START,
});
const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});
const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});
const logoutStart = () => ({
  type: types.LOGOUT_START,
});
const logoutSuccess = (user) => ({
  type: types.LOGOUT_SUCCESS,
  payload: user,
});
const logoutFail = (error) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

export const persistUser = (user) => ({
  type: types.PERSIST_USER,
  payload: user,
});

export const registerFunc = (email, password, displayName) => {
  return function (dispatch) {
    dispatch(registerStart());
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName });

        dispatch(registerSuccess(auth, user));
      })
      .catch((error) => dispatch(registerFail(error.message)));
  };
};
export const loginFunc = (email, password) => {
  return async function (dispatch) {
    dispatch(loginStart());
    await signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user));
      })
      .catch((error) => {
        loginFail(error.message);
        dispatch(alert(error.message));
      });
  };
};
export const logoutFunc = () => {
  return function (dispatch) {
    try {
      dispatch(logoutStart());
      signOut(auth);

      dispatch(logoutSuccess(auth));
    } catch (error) {
      dispatch(logoutFail(error.message));
    }
  };
};
