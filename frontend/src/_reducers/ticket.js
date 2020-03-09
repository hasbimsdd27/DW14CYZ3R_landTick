import {
  GET_MY_TICKET,
  GET_DETAIL_TICKET,
  UPLOAD_PAYMENT,
  BUY_TICKET
} from "../config/constants";

const initialState = {
  data: [],
  detail: [],
  loading: false,
  error: false
};

const tickets = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_MY_TICKET}_PENDING`:
    case `${GET_DETAIL_TICKET}_PENDING`:
    case `${UPLOAD_PAYMENT}_PENDING`:
    case `${BUY_TICKET}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_MY_TICKET}_FULFILLED`:
    case `${BUY_TICKET}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_MY_TICKET}_REJECTED`:
    case `${GET_DETAIL_TICKET}_REJECTED`:
    case `${UPLOAD_PAYMENT}_REJECTED`:
    case `${BUY_TICKET}_REJECTED`:
      return {
        ...state,
        error: true,
        loading: false
      };
    case `${GET_DETAIL_TICKET}_FULFILLED`:
    case `${UPLOAD_PAYMENT}_FULFILLED`:
      return {
        ...state,
        detail: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default tickets;
