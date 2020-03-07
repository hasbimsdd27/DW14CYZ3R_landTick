import {
  GET_ALL_TRANSACTION,
  GET_DETAIL_TRANSACTION,
  PATCH_TRANSACTION
} from "../config/constants";

const initialState = {
  data: [],
  detail: [],
  loading: false,
  error: false
};

const transaction = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_TRANSACTION}_PENDING`:
    case `${GET_DETAIL_TRANSACTION}_PENDING`:
    case `${PATCH_TRANSACTION}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_ALL_TRANSACTION}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_ALL_TRANSACTION}_REJECTED`:
    case `${GET_DETAIL_TRANSACTION}_REJECTED`:
    case `${PATCH_TRANSACTION}_REJECTED`:
      return {
        ...state,
        data: false,
        error: true
      };
    case `${GET_DETAIL_TRANSACTION}_FULFILLED`:
    case `${PATCH_TRANSACTION}_FULFILLED`:
      return {
        ...state,
        detail: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default transaction;
