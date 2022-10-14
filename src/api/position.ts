import request from "@/utils/request";
import type { PostJob } from "@/type/position";

export function postJob(data: PostJob) {
  return request({
    url: "/api/auth/postJob",
    method: "post",
    data,
  });
}
export function changeJobStatus(pid: string) {
  return request({
    url: "/api/auth/changeJobStatus",
    method: "post",
    data: { pid },
  });
}
export function updataJobInfo(data: PostJob) {
  return request({
    url: "/api/auth/updataJobInfo",
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

export function getPositionByID(pid: string) {
  return request({
    url: "/api/getPositionByID",
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
    data: { pid },
  });
}
