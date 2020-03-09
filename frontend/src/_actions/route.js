import {
  GET_ALL_ROUTES,
  GET_SPECIFIC_ROUTE,
  UPDATE_ROUTE,
  ADD_ROUTE,
  DELETE_ROUTE,
  DETAIL_ROUTE
} from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const getAllRoutes = () => {
  const token = localStorage.getItem("token");
  return {
    type: GET_ALL_ROUTES,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/routes");
      const { data } = res.data;
      return data;
    }
  };
};

export const getSpecificRoutes = (origin, destination, date) => {
  return {
    type: GET_SPECIFIC_ROUTE,
    payload: async () => {
      const res = await API.get(`/route/${origin}/${destination}/${date}`);
      const { data } = res.data;
      return data;
    }
  };
};

export const addRoute = dataSend => {
  const token = localStorage.getItem("token");
  return {
    type: ADD_ROUTE,
    payload: async () => {
      setAuthToken(token);
      const res = await API.post("/route", dataSend);
      const { data } = res.data;
      return data;
    }
  };
};

export const deleteRoute = id => {
  const token = localStorage.getItem("token");
  return {
    type: DELETE_ROUTE,
    payload: async () => {
      setAuthToken(token);
      const res = await API.delete(`/route/${id}`);
      const { data } = res.data;
      return data;
    }
  };
};

export const updateRoute = (dataSend, id) => {
  const token = localStorage.getItem("token");
  return {
    type: UPDATE_ROUTE,
    payload: async () => {
      setAuthToken(token);
      const res = await API.patch(`/route/${id}`, dataSend);
      const { data } = res.data;
      return data;
    }
  };
};

export const detailRoute = id => {
  const token = localStorage.getItem("token");
  return {
    type: DETAIL_ROUTE,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get(`/route/detail/${id}`);
      const { data } = res.data;
      return data;
    }
  };
};
