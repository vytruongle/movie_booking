import http from "../constant/api";

export const manageCinema = {
  //lấy thông tin lịch chiếu
  getDateInfo: (query = "") =>
    http.get(`QuanLyRap/LayThongTinLichChieuHeThongRap${query}`),

  //lấy thông tin lịch chiếu cho bộ phim cụ thể
  getDateMovieInfo: (query = "") =>
    http.get(`QuanLyRap/LayThongTinLichChieuPhim${query}`),
};
