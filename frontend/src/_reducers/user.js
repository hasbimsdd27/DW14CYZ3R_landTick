import { GET_USER } from "../config/constants";

const initialState = {
  data: [],
  loading: false,
  error: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        data: false,
        error: true,
        loading: false
      };

    default:
      return state;
  }
};

export default user;
