import request from "@/utils/request";
import type { PostJob } from "@/type/position";

export function postJob(bodyData: PostJob) {
  return request({
    url: "/api/auth/postJob",
    method: "post",
    bodyData,
  });
}
export function changeJobStatus(pid: string) {
  return request({
    url: "/api/auth/changeJobStatus",
    method: "post",
    bodyData: { pid },
  });
}
export function updataJobInfo(bodyData: PostJob) {
  return request({
    url: "/api/auth/updataJobInfo",
    method: "post",
    bodyData,
  });
}

export function getJobs() {
  return request({
    url: "/api/getJobs",
    method: "get",
  });
}

export function getPosition(pid: string) {
  return request({
    url: "/api/getPosition",
    method: "get",
    params: {
      pid,
    },
  });
}

export function deleteJob(pid: string) {
  return request({
    url: "/api/auth/deleteJob",
    method: "post",
    bodyData: { pid },
  });
}
