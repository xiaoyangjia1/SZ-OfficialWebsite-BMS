import request from "@/utils/request";
export interface Batch {
  name: string;
}
export const createBatch = (bodyData: Batch) => {
  return request({
    url: "/api/auth/createBatch",
    method: "post",
    bodyData
  });
};

export const deleteBatch = (bodyData: Batch) => {
  return request({
    url: "/api/auth/deleteBatch",
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
