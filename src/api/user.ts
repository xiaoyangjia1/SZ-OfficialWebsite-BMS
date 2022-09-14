import request from "@/utils/request";
import type { LoginByEmail } from "@/type/user";

export function login(data: LoginByEmail) {
  return request({
    url: "/api/auth/login",
    method: "post",
    data,
  });
}
