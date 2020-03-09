import axios from "axios";
import { baseUrl } from "./constants";
export const API = axios.create({
  baseURL: `${baseUrl}api/v1`
});

export const setAuthToken = token => {
  API.defaults.headers.common["Authorization"] = token;
};
