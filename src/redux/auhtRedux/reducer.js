import * as types from "./actionTypes";

const initialState = {
  loading: false,
  currentUser: null,
  isLogin: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_START:
    case types.LOGIN_START:
    case types.LOGOUT_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isLogin: false,
      };
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        isLogin: true,
      };
    case types.REGISTER_FAIL:
    case types.LOGIN_FAIL:
    case types.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isLogin: false,
      };
    case types.PERSIST_USER:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        isLogin: !!action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
