import axios, { AxiosInstance } from "axios";
// import { cookies } from "next/headers";
import { API_BASE_URL } from "../constants/urls";

export const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {   
    if(error.code === 'ERR_NETWORK') {
      console.log('interceptors' , error);
      return false //  서버 연결끊겨서 생성된 에러 처리 
    } 
    if (error.response && error.response.status === 401) {
      // window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);
