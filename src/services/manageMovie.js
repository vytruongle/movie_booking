import http from "../constant/api";

export const manageMovie = {
  //lấy danh sach phim
  getMovieList: (query = "") => http.get(`QuanLyPhim/LayDanhSachPhim${query}`),

  // lấy banner
  getBannerList: () => http.get("QuanLyPhim/LayDanhSachBanner"),

  // lấy thông tin phim
  getMovieInfo: (query = "") => http.get(`QuanLyPhim/LayThongTinPhim${query}`),
};
