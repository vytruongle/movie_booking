import http from "../constant/api";

export const manageUser = {
  registerUser: (payload) => http.post("/QuanLyNguoiDung/DangKy", payload),
  loginUser: (payload) => http.post("/QuanLyNguoiDung/DangNhap", payload),
  updateUser: (payload) =>
    http.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", payload),
  bookingHistory: (payload) =>
    http.post("/QuanLyNguoiDung/ThongTinTaiKhoan", payload),
};
