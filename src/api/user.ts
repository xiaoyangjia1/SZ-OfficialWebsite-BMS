import request from "@/utils/request";
import type { LoginByEmail } from "@/type/user";

export function login(data: LoginByEmail) {
  return request({
    url: "/api/internalLogin",
    method: "post",
    data,
  });
}
