import {
  GET_ALL_TRANSACTION,
  GET_DETAIL_TRANSACTION,
  PATCH_TRANSACTION
} from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const getAllTransaction = () => {
  const token = localStorage.getItem("token");
  return {
    type: GET_ALL_TRANSACTION,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/transactions");
      const { data } = res.data;
      return data;
    }
  };
};

export const getDetailTransaction = id => {
  const token = localStorage.getItem("token");
  return {
    type: GET_DETAIL_TRANSACTION,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get(`/transaction/${id}`);
      const { data } = res.data;
      return data;
    }
  };
};

export const patchTransaction = (body, id) => {
  const token = localStorage.getItem("token");
  return {
    type: PATCH_TRANSACTION,
    payload: async () => {
      setAuthToken(token);
      const res = await API.patch(`/transaction/${id}`, body);
      const { data } = res.data;
      return data;
    }
  };
};
