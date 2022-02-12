import * as types from "./actionTypes";
import { auth } from "../auth/getAuth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

export const registerFunc = (email, password, displayName) => {
  return function (dispatch) {
    try {
      dispatch(registerStart);
      createUserWithEmailAndPassword(auth, email, password);

      updateProfile(auth, { displayName: displayName });
      dispatch(registerSuccess(auth));
    } catch (error) {
      dispatch(registerFail(error.message));
    }
  };
};
export const loginFunc = (email, password) => {
  return function (dispatch) {
    try {
      dispatch(loginStart());
      signInWithEmailAndPassword(auth, email, password);

      dispatch(loginSuccess(auth));
    } catch (error) {
      dispatch(loginFail(error.message));
    }
  };
};
