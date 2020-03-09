import {
  GET_ALL_ROUTES,
  GET_SPECIFIC_ROUTE,
  ADD_ROUTE,
  DELETE_ROUTE,
  UPDATE_ROUTE,
  DETAIL_ROUTE
} from "../config/constants";

const initialState = {
  data: [],
  detail: [],
  loading: false,
  error: false
};

const ROUTES = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_ROUTES}_PENDING`:
    case `${GET_SPECIFIC_ROUTE}_PENDING`:
    case `${ADD_ROUTE}_PENDING`:
    case `${DELETE_ROUTE}_PENDING`:
    case `${UPDATE_ROUTE}_PENDING`:
    case `${DETAIL_ROUTE}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_ALL_ROUTES}_FULFILLED`:
    case `${GET_SPECIFIC_ROUTE}_FULFILLED`:
    case `${ADD_ROUTE}_FULFILLED`:
    case `${DELETE_ROUTE}_FULFILLED`:
    case `${UPDATE_ROUTE}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_ALL_ROUTES}_REJECTED`:
    case `${GET_SPECIFIC_ROUTE}_REJECTED`:
    case `${ADD_ROUTE}_REJECTED`:
    case `${DELETE_ROUTE}_REJECTED`:
    case `${UPDATE_ROUTE}_REJECTED`:
    case `${DETAIL_ROUTE}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true
      };
    case `${DETAIL_ROUTE}_FULFILLED`:
      return {
        ...state,
        detail: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default ROUTES;
