import axios from "axios";
import { getLocalStorage } from "@/utils/auth";

const service = axios.create({
  baseURL: "http://47.115.228.82", // url = base url + request url
  timeout: 5000, // request timeout
});
service.interceptors.request.use(
  (config: any) => {
    const token_type = getLocalStorage("token_type");
    const access_token = getLocalStorage("access_token");
    if (access_token) {
      config.headers.Authorization = `${token_type} ${access_token}`;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);
export default service;
