import { GET_STATIONS } from "../config/constants";

const initialState = {
  data: [],
  loading: false,
  error: false
};

const stations = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_STATIONS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_STATIONS}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_STATIONS}_REJECTED`:
      return {
        ...state,
        data: false,
        error: true
      };

    default:
      return state;
  }
};

export default stations;
