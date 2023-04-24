import axios from "axios";
import { message } from "../module/MessageToastyfy";

const TokenCyberSoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3NCIsIkhldEhhblN0cmluZyI6IjE2LzA5LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5NDgyMjQwMDAwMCIsIm5iZiI6MTY2ODI3MjQwMCwiZXhwIjoxNjk0OTcwMDAwfQ.3TXoqM7cOKUQgRGc0plbpUsV406snlZBBeHlA7RxJYk";

const baseURL = `https://movienew.cybersoft.edu.vn/api/`;

const data = localStorage.getItem("user");
let tokenAccess = data
  ? JSON.parse(localStorage.getItem("user")).accessToken
  : "";

console.log(tokenAccess);
const http = axios.create();

http.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      TokenCyberSoft,
      Authorization: `Bearer ${tokenAccess}`,
    },
    baseURL,
  };
});

http.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error?.response?.status === 403) {
      return message.error("Bạn không có quyền try cập");
    }

    if (error?.response?.status === 400) {
      return message.error(error?.data?.content.message);
    }

    if (error?.response?.status === 404) {
      return message.error("Tên đăng nhập hoặc mật khẩu không chính xác");
    }
  }
);

export default http;

export const httpErrorCode = {
  403: "",
};

export const messErr = {
  403: "Bạn không có quyền truy cập",
};
