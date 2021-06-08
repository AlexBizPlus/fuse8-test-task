import axios from 'axios';
import { REQUEST_TIMEOUT } from './const';

// eslint-disable-next-line import/prefer-default-export
export const createAPI = (url: string) => {
  const api = axios.create({
    baseURL: url,
    timeout: REQUEST_TIMEOUT,
    withCredentials: false,
  });

  return api;
};
