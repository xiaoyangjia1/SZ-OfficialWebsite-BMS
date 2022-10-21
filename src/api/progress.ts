import request from "@/utils/request";

export function getDeliveredInfo() {
  return request({
    url: "/api/auth/getDeliveredInfo",
    method: "get",
  });
}
interface SubmitEpicycleResult {
  email: string;
  pid: string;
  epicycle: string;
  result: number;
}
export function submitEpicycleResult(bodyData: SubmitEpicycleResult) {
  return request({
    url: "/api/auth/submitEpicycleResult",
    method: "post",
    bodyData,
  });
}
