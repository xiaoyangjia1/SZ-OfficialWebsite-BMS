import request from "@/utils/request";
import type { LoginByEmail } from "@/type/user";

export function login(bodyData: LoginByEmail) {
  return request({
    url: "/api/internalLogin",
    method: "post",
    bodyData,
  });
}
