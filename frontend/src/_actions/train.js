import {
  GET_TRAINS,
  ADD_TRAIN,
  DELETE_TRAIN,
  DETAIL_TRAIN,
  UPDATE_TRAIN
} from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const getTrains = () => {
  return {
    type: GET_TRAINS,
    payload: async () => {
      const res = await API.get("/trains");

      const { data } = res.data;

      return data;
    }
  };
};

export const addTrain = dataSend => {
  const token = localStorage.getItem("token");
  return {
    type: ADD_TRAIN,
    payload: async () => {
      setAuthToken(token);
      const res = await API.post("/train", dataSend);
      const { data } = res.data;
      return data;
    }
  };
};

export const deleteTrain = id => {
  const token = localStorage.getItem("token");
  return {
    type: DELETE_TRAIN,
    payload: async () => {
      setAuthToken(token);
      const res = await API.delete(`/train/${id}`);
      const { data } = res.data;
      return data;
    }
  };
};

export const detailTrain = id => {
  const token = localStorage.getItem("token");
  return {
    type: DETAIL_TRAIN,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get(`/train/${id}`);
      const { data } = res.data;
      return data;
    }
  };
};

export const updateTrain = (dataSend, id) => {
  const token = localStorage.getItem("token");
  return {
    type: UPDATE_TRAIN,
    payload: async () => {
      setAuthToken(token);
      const res = await API.patch(`/train/${id}`, dataSend);
      const { data } = res.data;
      return data;
    }
  };
};
