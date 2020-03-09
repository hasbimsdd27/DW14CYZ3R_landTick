import { INSERT_PASSANGER } from "../config/constants";

const initialState = {
  data: [],
  detail: [],
  loading: false,
  error: false
};

const PASSANGER = (state = initialState, action) => {
  switch (action.type) {
    case `${INSERT_PASSANGER}_PENDING`:
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
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

export default PASSANGER;
