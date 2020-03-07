import { GET_ALL_TRAIN, GET_SPECIFIC_TRAIN } from "../config/constants";

const initialState = {
  data: [],
  detail: [],
  loading: false,
  error: false
};

const train = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_TRAIN}_PENDING`:
    case `${GET_SPECIFIC_TRAIN}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_ALL_TRAIN}_FULFILLED`:
    case `${GET_SPECIFIC_TRAIN}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_ALL_TRAIN}_REJECTED`:
    case `${GET_SPECIFIC_TRAIN}_REJECTED`:
      return {
        ...state,
        data: false,
        error: true
      };
    default:
      return state;
  }
};

export default train;
