import { GET_ALL_TRAIN, GET_SPECIFIC_TRAIN } from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const getTrains = () => {
  const token = localStorage.getItem("token");
  return {
    type: GET_ALL_TRAIN,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/trains");
      const { data } = res.data;
      return data;
    }
  };
};

export const getSpecificTrain = (origin, destination, date) => {
  return {
    type: GET_SPECIFIC_TRAIN,
    payload: async () => {
      const res = await API.get(`/train/${origin}/${destination}/${date}`);
      const { data } = res.data;
      return data;
    }
  };
};
