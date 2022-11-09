import request from "@/utils/request";

export function getUploadedFile(params: {
  batch: string;
  title: string;
  email: number;
}) {
  return request({
    url: "/api/getUploadedFile",
    method: "get",
    params,
  });
}
