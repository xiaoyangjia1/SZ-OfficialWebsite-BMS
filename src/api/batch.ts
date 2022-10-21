import request from "@/utils/request";
import type { Batch } from "@/type/batch";

export const createBatch = (bodyData: Batch) => {
  return request({
    url: "/api/auth/createBatch",
    method: "post",
    bodyData
  });
};

export const getAllBatch = () => {
  return request({
    url: "/api/getAllBatch",
    method: "get",
  });
};
