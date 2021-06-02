import axios from "axios";
import { BACKEND_URL, BACKEND_URL_IMG, REQUEST_TIMEOUT } from "./const";

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: false,
  });

  return api;
};

export const createImgAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL_IMG,
    timeout: REQUEST_TIMEOUT,
    withCredentials: false,
  });

  return api;
};
