import axios from "axios";
import { getLocalStorage } from "@/utils/auth";

const service = axios.create({
  baseURL: "http://47.115.228.82:81", // url = base url + request url
  timeout: 5000, // request timeout
});
service.interceptors.request.use(
  (config: any) => {
    const access_token = getLocalStorage("token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);
interface Request {
  url: string;
  method: string;
  bodyData?: unknown;
  params?: unknown;
}
const request = async ({ url, method, bodyData, params }: Request) => {
  const { data: resData } = await service({
    url,
    method,
    data: bodyData,
    params,
  });
  console.log(resData)
  let data = null,
    error = null;
  if (resData.error_code === 0) {
    data = resData.data;
  } else {
    error = new Error(resData.message);
  }
  return { data, error };
};

export default request;
