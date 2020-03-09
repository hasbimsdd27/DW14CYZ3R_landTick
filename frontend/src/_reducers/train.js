import {
  GET_TRAINS,
  ADD_TRAIN,
  DELETE_TRAIN,
  DETAIL_TRAIN,
  UPDATE_TRAIN
} from "../config/constants";

const initialState = {
  data: [],
  detail: [],
  loading: false,
  error: false
};

const trains = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_TRAINS}_PENDING`:
    case `${ADD_TRAIN}_PENDING`:
    case `${DELETE_TRAIN}_PENDING`:
    case `${DETAIL_TRAIN}_PENDING`:
    case `${UPDATE_TRAIN}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_TRAINS}_FULFILLED`:
    case `${ADD_TRAIN}_FULFILLED`:
    case `${DELETE_TRAIN}_FULFILLED`:
    case `${UPDATE_TRAIN}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_TRAINS}_REJECTED`:
    case `${ADD_TRAIN}_REJECTED`:
    case `${DELETE_TRAIN}_REJECTED`:
    case `${DETAIL_TRAIN}_REJECTED`:
    case `${UPDATE_TRAIN}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true
      };
    case `${DETAIL_TRAIN}_FULFILLED`:
      return {
        ...state,
        detail: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default trains;
