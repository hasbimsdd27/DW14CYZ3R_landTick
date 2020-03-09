import {
  GET_STATIONS,
  ADD_STATION,
  DELETE_STATION,
  DETAIL_STATION,
  UPDATE_STATION
} from "../config/constants";

const initialState = {
  data: [],
  detail: [],
  loading: false,
  error: false
};

const stations = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_STATIONS}_PENDING`:
    case `${ADD_STATION}_PENDING`:
    case `${DELETE_STATION}_PENDING`:
    case `${DETAIL_STATION}_PENDING`:
    case `${UPDATE_STATION}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_STATIONS}_FULFILLED`:
    case `${ADD_STATION}_FULFILLED`:
    case `${DELETE_STATION}_FULFILLED`:
    case `${UPDATE_STATION}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_STATIONS}_REJECTED`:
    case `${ADD_STATION}_REJECTED`:
    case `${DELETE_STATION}_REJECTED`:
    case `${DETAIL_STATION}_REJECTED`:
    case `${UPDATE_STATION}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true
      };
    case `${DETAIL_STATION}_FULFILLED`:
      return {
        ...state,
        detail: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default stations;
