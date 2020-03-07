import {
  GET_MY_TICKET,
  GET_DETAIL_TICKET,
  UPLOAD_PAYMENT,
  BUY_TICKET
} from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const getMyTicket = () => {
  const token = localStorage.getItem("token");
  return {
    type: GET_MY_TICKET,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/getmyticket");
      const { data } = res.data;
      return data;
    }
  };
};

export const getDetailTicket = () => {
  const token = localStorage.getItem("token");
  const idTiket = localStorage.getItem("tiket");
  return {
    type: GET_DETAIL_TICKET,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get(`/getdetailtiket/${idTiket}`);
      const { data } = res.data;
      return data;
    }
  };
};

export const uploadPayment = (image, id, body) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("image", image);
  return {
    type: UPLOAD_PAYMENT,
    payload: async () => {
      setAuthToken(token);
      await API.post(`/uploadfile/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      const res = await API.patch(`/user/transaction/${id}`, body);
      const { data } = res.data;
      return data;
    }
  };
};

export const buyTicket = dataSend => {
  const token = localStorage.getItem("token");

  return {
    type: BUY_TICKET,
    payload: async () => {
      setAuthToken(token);
      const res = await API.post(`/buyticket`, dataSend);
      const { data } = res.data;
      return data;
    }
  };
};
