import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";
import { API_BASE_URL } from "../constants/urls";

export const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);
