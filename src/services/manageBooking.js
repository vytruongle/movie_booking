import http from "../constant/api";

export const manageBooking = {
  //lấy lịch đặt vé
  bookingMovie: (query = "") =>
    http.get(`QuanLyDatVe/LayDanhSachPhongVe${query}`),
};
