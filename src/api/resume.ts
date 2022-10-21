import request from "@/utils/request";
export const getResume=(email: string)=> {
  return request({
    url: "/api/auth/getResume",
    method: "get",
    params: { email },
  });
}
