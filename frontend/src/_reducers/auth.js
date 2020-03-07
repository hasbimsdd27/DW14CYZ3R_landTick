import { POST_LOGIN, LOGOUT, REGISTER } from "../config/constants";

const initialState = {
  data: [],
  loading: false,
  error: false,
  isLogin: false
};

const stations = (state = initialState, action) => {
  switch (action.type) {
    case `${POST_LOGIN}_PENDING`:
    case `${LOGOUT}_PENDING`:
    case `${REGISTER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${POST_LOGIN}_FULFILLED`:
    case `${REGISTER}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        isLogin: true
      };
    case `${POST_LOGIN}_REJECTED`:
    case `${LOGOUT}_REJECTED`:
    case `${REGISTER}_REJECTED`:
      return {
        ...state,
        data: false,
        error: true,
        isLogin: false
      };
    case `${LOGOUT}_FULFILLED`:
      return {
        ...state,
        data: [],
        loading: false,
        isLogin: false,
        error: false
      };
    default:
      return state;
  }
};

export default stations;
