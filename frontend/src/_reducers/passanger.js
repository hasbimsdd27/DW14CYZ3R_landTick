import { INSERT_PASSANGER, GET_ALL_PASSANGER } from "../config/constants";

const initialState = {
  data: [],
  detail: [],
  loading: false,
  error: false
};

const PASSANGER = (state = initialState, action) => {
  switch (action.type) {
    case `${INSERT_PASSANGER}_PENDING`:
    case `${GET_ALL_PASSANGER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${INSERT_PASSANGER}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${INSERT_PASSANGER}_REJECTED`:
    case `${GET_ALL_PASSANGER}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true
      };
    case `${GET_ALL_PASSANGER}_FULFILLED`:
      return {
        ...state,
        detail: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default PASSANGER;
