import request from "@/utils/request";

export function getResumeById(sid: string) {
  return request({
    url: "/api/auth/getResumeById",
    method: "get",
    params: { sid },
  });
}
