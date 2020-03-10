import { INSERT_PASSANGER, GET_ALL_PASSANGER } from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const insertPassanger = dataSend => {
  const token = localStorage.getItem("token");
  return {
    type: INSERT_PASSANGER,
    payload: async () => {
      setAuthToken(token);
      const res = await API.post(`/passanger`, dataSend);
      const { data } = res.data;
      return data;
    }
  };
};

export const getAllPassanger = id_transaction => {
  const token = localStorage.getItem("token");
  return {
    type: GET_ALL_PASSANGER,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get(`/passanger/${id_transaction}`);
      const { data } = res.data;
      return data;
    }
  };
};
