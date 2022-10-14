import request from "@/utils/request";
import type { PostJob } from "@/type/position";

export function postJob(data: PostJob) {
  return request({
    url: "/api/auth/postJob",
    method: "post",
    data,
  });
}

export function getJobs() {
  return request({
    url: "/api/getJobs",
    method: "get",
  });
}
