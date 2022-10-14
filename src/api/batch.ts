import request from "@/utils/request";
import type { Batch } from "@/type/batch";

export function createBatch(data: Batch) {
  return request({
    url: "/api/auth/createBatch",
    method: "post",
    data,
  });
}

export function getAllBatch() {
  return request({
    url: "/api/getAllBatch",
    method: "get",
  });
}
