import request from "@/utils/request";
import type { LoginByEmail } from "@/type/user";

export function login(bodyData: LoginByEmail) {
  return request({
    url: "/api/internalLogin",
    method: "post",
    bodyData,
  });
}
export function logout() {
  return request({
    url: "/api/auth/logout",
    method: "post",
  });
}
export function judgeLogin() {
  return request({
    url: "/api/auth/judgeLogin",
    method: "get",
  });
}