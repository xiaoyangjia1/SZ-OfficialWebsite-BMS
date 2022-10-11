import request from "@/utils/request";

export function getDeliveredInfo() {
  return request({
    url: "/api/auth/getDeliveredInfo",
    method: "get",
  });
}
