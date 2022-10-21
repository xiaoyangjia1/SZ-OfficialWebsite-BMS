import request from "@/utils/request";
export const getAllCategory = () => {
  return request({
    url: "/api/getAllCategory",
    method: "get",
  });
};

