import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:6969/api/v1"
});

export const setAuthToken = token => {
  API.defaults.headers.common["Authorization"] = token;
};
