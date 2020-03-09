import {
  GET_STATIONS,
  ADD_STATION,
  DELETE_STATION,
  DETAIL_STATION,
  UPDATE_STATION
} from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const getStation = () => {
  return {
    type: GET_STATIONS,
    payload: async () => {
      const res = await API.get("/stations");

      const { data } = res.data;

      return data;
    }
  };
};

export const addStation = dataSend => {
  const token = localStorage.getItem("token");
  return {
    type: ADD_STATION,
    payload: async () => {
      setAuthToken(token);
      const res = await API.post("/station", dataSend);
      const { data } = res.data;
      return data;
    }
  };
};

export const deleteStation = id => {
  const token = localStorage.getItem("token");
  return {
    type: DELETE_STATION,
    payload: async () => {
      setAuthToken(token);
      const res = await API.delete(`/station/${id}`);
      const { data } = res.data;
      return data;
    }
  };
};

export const detailStation = id => {
  const token = localStorage.getItem("token");
  return {
    type: DETAIL_STATION,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get(`/station/${id}`);
      const { data } = res.data;
      return data;
    }
  };
};

export const updateStation = (dataSend, id) => {
  const token = localStorage.getItem("token");
  return {
    type: UPDATE_STATION,
    payload: async () => {
      setAuthToken(token);
      const res = await API.patch(`/station/${id}`, dataSend);
      const { data } = res.data;
      return data;
    }
  };
};
